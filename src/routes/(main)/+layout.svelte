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
  
  <Navbar>
      <NavBrand href="/">
        <span
          class="self-center whitespace-nowrap text-xl font-semibold"
        >
          作业互评系统
        </span>
      </NavBrand>
      <NavHamburger />
      <NavUl>
          <NavLi href="/studentMain"
          >主页</NavLi
        >
        <NavLi href="/"
          >我教的课程</NavLi
        >
        <NavLi href="/learningCourse"
          >我学习的课程</NavLi
        >
        <NavLi href="/studentSelectCourse"
          >选课</NavLi
        >
        <NavLi href="/"
          >创建课程</NavLi
        >
        <NavLi href="/"
          >互评作业</NavLi
        >
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
  <div class="app">
    <main>
      <slot />
    </main>
  </div>
  
  <style>
  </style>
  