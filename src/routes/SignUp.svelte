<script>
    import { push } from "svelte-spa-router";
    import User from "src/lib/form/User.svelte";
    import { is_loading } from "src/store";
    import { SIGN_UP } from "src/url.js";
    import { is_login } from "src/user.js";

    function sign_up(event) {
        $is_loading = true;

        fetch(SIGN_UP, {
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
                alert(json.message);

                if (json.status) {
                    step = 2;
                    token = json.payload.token;
                } else {
                    $is_loading = false;
                }
            })
            .catch(() => {
                alert("알 수 없는 오류가 발생했습니다.");
                $is_loading = false;
            });
    }

    let step = 1;
    let token = "";

    if (is_login()) {
        push("/todo");
    } else {
        $is_loading = false;
    }
</script>

<div class="container">
    <h1>회원가입</h1>

    {#if step == 1}
        <User on:action="{sign_up}" submit_text="회원가입" />
    {/if}
</div>
