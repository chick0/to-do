<script>
    import { createEventDispatcher } from "svelte";
    import { is_loading } from "src/store";
    export let submit_text;

    let email = "";
    let password = "";

    /** @type {HTMLInputElement} */
    let password_field;

    /** @type {HTMLButtonElement} */
    let submit;

    const dispatch = createEventDispatcher();

    function action() {
        dispatch("action", {
            email: email,
            password: password,
        });
    }
</script>

{#if $is_loading}
    <div class="spinner"></div>
{:else}
    <div class="field">
        <label for="email">이메일</label>
        <input
            type="email"
            id="email"
            placeholder="Email"
            required
            bind:value="{email}"
            on:keydown="{(e) => {
                if (e.key == 'Enter') {
                    password_field.focus();
                }
            }}" />
    </div>

    <div class="field">
        <label for="password">비밀번호</label>
        <input
            type="password"
            id="password"
            placeholder="Password"
            required
            minlength="8"
            bind:this="{password_field}"
            bind:value="{password}"
            on:keydown="{(e) => {
                if (e.key == 'Enter') {
                    password_field.blur();
                    submit.click();
                }
            }}" />
    </div>

    <button class="button max" type="submit" bind:this="{submit}" on:click="{() => action()}">{submit_text}</button>
{/if}
