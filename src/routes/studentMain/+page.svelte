
<script lang="ts">
	import SnackBar from "$lib/components/SnackBar.svelte";
	import SnackBarList from "$lib/components/SnackBarList.svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	import {
    Navbar,
    NavBrand,
    NavLi,
    NavUl,
    NavHamburger,
  } from "flowbite-svelte";

</script>
<div class="bg-bg1 bg-cover bg-center bg-no-repeat h-screen">
  <!-- <nav class="bg-blue-500 p-4">
	<div class="container mx-auto flex justify-between items-center">
	  <div class="text-white text-2xl font-semibold">
		主页
	  </div>
	  <ul class="flex space-x-4">
		<li><button  class="text-white " on:click={() => goto("")}>我的课程</button ></li>
		<li><button  class="text-white " on:click={() => goto("/studentSelectCourse")}>选课</button ></li>
		<li><button  class="text-white " on:click={() => goto("")}>互评作业</button ></li>
	  </ul>
	</div>
  </nav> -->
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
		>我的课程</NavLi
	  >
	  <NavLi href="/studentSelectCourse"
		>选课</NavLi
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

	<div class = "flex justify-center items-center text-4xl font-bold h-4/5">
	  旅行者,你将去往何方?
	</div>

</div>