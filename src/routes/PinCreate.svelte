<script>
    import { onMount } from "svelte";
    import { push } from "svelte-spa-router";
    import { PIN } from "src/url";
    import { is_login, get_token } from "src/user";
    import { set_pin_token, get_pin_token } from "src/pin";

    const TOKEN = get_token();

    let pin = "";
    let pin_this = undefined;
    let pin_button = undefined;
    let is_loading = true;

    if (!is_login()) {
        push("/");
    } else {
        is_loading = false;

        onMount(() => {
            if (get_pin_token() != null) {
                if (!confirm("이미 설정된 PIN이 있습니다. 해당 PIN을 덮어쓸까요?")) {
                    push("/todo");
                }
            }

            pin_this.focus();
        });
    }
</script>

<div class="container">
    <h1>PIN 설정</h1>
    {#if is_loading}
        <div class="spinner"></div>
    {:else}
        <br />
        <p>PIN 입력뒤 생성하기 버튼을 눌러주세요.</p>

        <div class="field">
            <input
                id="pin"
                type="password"
                inputmode="numeric"
                minlength="6"
                placeholder="6자리 이상으로 입력해주세요."
                bind:value="{pin}"
                bind:this="{pin_this}"
                on:keydown="{(e) => {
                    if (e.key == 'Enter') {
                        pin_this.blur();
                        pin_button.click();
                    }
                }}" />
        </div>

        <button
            class="button max"
            type="submit"
            bind:this="{pin_button}"
            on:click="{() => {
                is_loading = true;

                fetch(PIN, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth': TOKEN,
                    },
                    body: JSON.stringify({
                        code: pin.toString(),
                    }),
                })
                    .then((resp) => resp.json())
                    .then((json) => {
                        alert(json.message);

                        if (json.status) {
                            set_pin_token(json.token);
                            push('/todo');
                        }

                        is_loading = false;

                        if (json.logout_required) {
                            push('/logout');
                        }
                    })
                    .catch(() => {
                        alert('알 수 없는 오류가 발생했습니다.');
                        is_loading = false;
                    });
            }}">생성하기</button>
    {/if}
</div>
