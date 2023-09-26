<script>
  import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
  } from "flowbite-svelte";
  import { goto } from "$app/navigation";
</script>
<div class="bg-bg1 bg-cover bg-center bg-no-repeat h-screen">
<div class="h-full w-full flex flex-col">
  <Navbar class="shadow-md border">
    <NavBrand href="/">
      <span class="self-center whitespace-nowrap text-xl font-semibold">
        作业互评系统
      </span>
    </NavBrand>
    <NavHamburger />
    <NavUl>
      <NavLi href="/studentMain">主页</NavLi>
      <NavLi href="/studentSelectCourse">选课</NavLi>
      <NavLi href="/">创建课程</NavLi>
      <NavLi href="/">互评作业</NavLi>
      <NavLi
        class="hover:cursor-pointer"
        on:click={() => {
          //   localStorage.removeItem("");
          //   localStorage.removeItem("");
          goto("/");
        }}>退出</NavLi
      >
    </NavUl>
  </Navbar>
  <main class="w-full flex-1">
    <slot />
  </main>
</div>
</div>
<style>
</style>
