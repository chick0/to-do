<script>
    import { push } from "svelte-spa-router";
    import { LOGOUT } from "src/url";
    import { get_token } from "src/user";
    import { get_pin_token, set_pin_token } from "src/pin";

    const TOKEN = get_token();
    const pin_token = get_pin_token();

    if (TOKEN != null) {
        fetch(LOGOUT, {
            method: "DELETE",
            headers: {
                "x-auth": TOKEN,
            },
        })
            .then(() => {
                /*
                 * 로그아웃 과정에서는 API 서버의 응답이 중요하지 않음
                 * - 1. 요청이 성공한 경우, 로그아웃
                 * - 2. 요청이 실패한 경우, 만료된 세션
                 */
                sessionStorage.clear();
                localStorage.clear();

                if (pin_token != null) {
                    set_pin_token(pin_token);
                }

                push("/");
            })
            .catch(() => {
                alert("알 수 없는 오류가 발생했습니다.");
            });
    } else {
        push("/");
    }
</script>

<div class="container">
    <h1>로그아웃</h1>
    <p>저장된 인증 정보를 삭제하고 있습니다...</p>

    <div class="spinner"></div>
</div>
