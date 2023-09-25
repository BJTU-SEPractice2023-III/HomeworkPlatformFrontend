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
  })
</script>

<div class="bg-bg1 bg-cover bg-center bg-no-repeat h-screen">
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