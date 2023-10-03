<script lang="ts">
    import SnackBar from "./SnackBar.svelte";

	export let messages: { type: "success" | "failed" | "info"; msg: string }[];
</script>

<div class="absolute top-4 right-4 flex flex-col gap-2">
	{#each messages as message}
		<SnackBar
			type={message.type}
			msg={message.msg}
			on:dismiss={() => {
				messages = messages.filter((el) => el != message);
			}}
		/>
	{/each}
</div>