<script lang="ts">
    import {
        Button,
        Label,
        Input,
        ButtonGroup,
    } from "flowbite-svelte";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";

    let messages: { type: string; msg: string }[] = [];
    function createSnackBar(type: "success" | "failed" | "info", msg: string) {
        messages.push({ type, msg });
        messages = messages;
    }

    let loginBtnWidth = tweened(60, {
        duration: 400,
        easing: cubicOut,
    });
    let loginTab = true;
    $: $loginBtnWidth = loginTab ? 60 : 40;

    let username = "";
    let password = "";
    let confirmPassword = "";

    import { login, register } from "$lib/api/user";
    import { goto } from "$app/navigation";
    // import { user } from '../../lib/store';

    function onLoggedIn(data: any) {
        console.log("[onLoggedIn]: ", data);
        // user.set(data.user);
        localStorage.setItem('homework-platform-jwt', data.token);
        localStorage.setItem('homework-platform-id', data.user.id);
        goto("/");
    }
    // function onLogin() {
    //     if (username == "") {
    //         createSnackBar("failed", "用户名不能为空");
    //         return;
    //     }
    //     login(username, password)
    //         .then((res) => {
    //             console.log("[login/then]: " + res);
    //             res = res.data;
    //             onLoggedIn(res.data);
    //         })
    //         .catch((err) => {
    //             console.log("[login/catch]: " + err);
    //             createSnackBar("failed", "登陆失败 " + err);
    //         });
    //     console.log(username, password);
    // }

    function onLogin(){
            goto("../studentMain");
    }
    function onRegister() {
        if (username == "") {
            createSnackBar("failed", "用户名不能为空");
            return;
        }
        if (password != confirmPassword) {
            createSnackBar("failed", "密码不一致");
            return;
        }
        register(username, password)
            .then((res) => {
                console.log("[register/then]: " + res);
                createSnackBar("success", "注册成功");
            })
            .catch((err) => {
                console.log("[register/catch]: " + err);
                createSnackBar("failed", "注册失败");
                if (err.code && err.message) {
                    // errMessage = err.code + ': ' + err.message;
                } else {
                    err = err.response.data;
                    // errMessage = err.error;
                }
            });
        // console.log(username, password);
    }
</script>

<div
    class="
  w-screen
  h-screen
  flex flex-col
  justify-center
  items-center
  bg-white
  bg-opacity-20
"
>
    <div
        class="flex flex-col gap-3 p-8 items-center
        min-w-[400px]
    w-max
    h-fit
    top-1/2
    rounded-xl
    bg-white bg-opacity-90
    z-3
    shadow-xl
  "
    >
        <!-- 登录 -->
        <span class="mb-3 text-2xl">
            {#if loginTab}登录{:else}注册账号{/if}
        </span>
        <div class="w-full flex flex-col items-strech gap-4">
            <Label for="username">用户名</Label>
            <Input
                id="username"
                variant="outlined"
                bind:value={username}
                label="用户名"
            />
            <Label for="password">密码</Label>
            <Input
                id="password"
                variant="outlined"
                bind:value={password}
                label="密码"
                type="password"
            />
            {#if !loginTab}
                <Label for="repeat-password">密码</Label>
                <Input
                    id="repeat-password"
                    variant="outlined"
                    bind:value={confirmPassword}
                    label="确认密码"
                    type="password"
                />
            {/if}
        </div>
        <ButtonGroup
            style="width: 100%; display: flex; justify-content: stretch;"
        >
            <Button
                variant="raised"
                style="width: {$loginBtnWidth}%;"
                ripple={loginTab}
                color={loginTab ? "primary" : "alternative"}
                on:click={() => {
                    if (loginTab) {
                        onLogin();
                    } else {
                        loginTab = true;
                    }
                }}
            >
                {#if !loginTab}
                    <div class="i-ri:arrow-left-line" />
                    已有账号？
                {:else}
                    登录
                {/if}
            </Button>
            <Button
                variant="outlined"
                style="width: {100 - $loginBtnWidth}%;"
                ripple={!loginTab}
                color={!loginTab ? "primary" : "alternative"}
                on:click={() => {
                    if (!loginTab) {
                        onRegister();
                    } else {
                        loginTab = false;
                    }
                }}
            >
                {#if !loginTab}
                    注册
                {:else}
                    没有账号？
                    <div class="i-ri:arrow-right-line" />
                {/if}
            </Button>
        </ButtonGroup>
    </div>
</div>
