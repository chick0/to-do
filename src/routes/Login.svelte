<script>
    import { push } from "svelte-spa-router";
    import User from "src/lib/form/User.svelte";
    import { is_loading } from "src/store";
    import { LOGIN } from "src/url";
    import { get_pin_token } from "src/pin";
    import { is_login, set_token } from "src/user";

    function login(event) {
        $is_loading = true;

        fetch(LOGIN, {
            method: "POST",
            body: JSON.stringify({
                email: event.detail.email,
                password: event.detail.password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                if (json.status) {
                    set_token(json.token);

                    let push_to = "/todo";

                    if (window.innerWidth <= 700) {
                        if (confirm("PIN 로그인을 설정하시겠습니까?")) {
                            push_to = "/pin/create";
                        }
                    }

                    push(push_to);
                } else {
                    alert(json.message);
                    $is_loading = false;

                    if (json.email_verify_required) {
                        if (confirm("이메일 인증을 다시 시도하시겠습니까?")) {
                            push("/retry");
                        }
                    }
                }
            })
            .catch(() => {
                alert("알 수 없는 오류가 발생했습니다.");
                $is_loading = false;
            });
    }

    if (is_login()) {
        push("/todo");
    } else {
        if (get_pin_token() == null) {
            is_loading.set(false);
        } else {
            if (!location.hash.endsWith("?force")) {
                push("/pin");
            } else {
                is_loading.set(false);
            }
        }
    }
</script>

<div class="container">
    <h1>로그인</h1>

    {#if $is_loading === false}
        <div class="buttons">
            <a class="button" href="#/reset">비밀번호 재설정</a>
        </div>
    {/if}

    <User on:action="{login}" submit_text="로그인" />
</div>
