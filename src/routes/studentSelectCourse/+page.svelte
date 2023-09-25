<script lang="ts">
	import SnackBar from "$lib/components/SnackBar.svelte";
	import SnackBarList from "$lib/components/SnackBarList.svelte";
	import { afterNavigate, goto } from "$app/navigation";

	import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  
    import { onMount } from "svelte";

  onMount(() => {
    // username = localStorage.getString("username")
  })
</script>

<div class="bg-bg1 bg-cover bg-center bg-no-repeat h-screen">
  <!-- <nav class="p-4">
	<div class="container mx-auto flex justify-between items-center">
	  <div class="text-white text-2xl font-semibold">
		选课
	  </div>
	  <ul class="flex space-x-4">
		<li><button  class="text-white" on:click={() => goto("/studentMain")}>主页</button ></li>
		<li><button  class="text-white" on:click={() => goto("")}>我的课程</button ></li>
		<li><button  class="text-white" on:click={() => goto("")}>互评作业</button ></li>
	  </ul>
	</div>
  </nav> -->

  <div>
	<Table>
	  <TableHead>
		<TableHeadCell>CourseName</TableHeadCell>
		<TableHeadCell>Credit</TableHeadCell>
		<TableHeadCell>Teacher</TableHeadCell>
	  </TableHead>
	  <TableBody>
		  <TableBodyRow>
			<TableBodyCell>{"afa"}</TableBodyCell>
			<TableBodyCell>{"gth"}</TableBodyCell>
			<TableBodyCell>{"jhgm"}</TableBodyCell>
		  </TableBodyRow>
	  </TableBody>
	</Table>
  </div>

</div>