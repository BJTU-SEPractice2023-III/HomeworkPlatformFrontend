<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import {
        CheckCircleSolid,
        ExclamationCircleSolid,
        CloseCircleSolid,
    } from "flowbite-svelte-icons";
    import { Toast } from "flowbite-svelte";

    export let type: "success" | "failed" | "info" = "info";
    export let msg = "test";

    const dispatch = createEventDispatcher();

    let open: boolean = true
    $: if (open) dispatch('dismiss');

    let color: "green" | "red" | "orange";
    $: color =
        type == "success" ? "green" : type == "failed" ? "red" : "orange";
</script>

<Toast {color} bind:open>
    <svelte:fragment slot="icon">
        {#if color == "green"}
            <CheckCircleSolid class="w-5 h-5" />
        {:else if color == "red"}
            <CloseCircleSolid class="w-5 h-5" />
        {:else}
            <ExclamationCircleSolid class="w-5 h-5" />
        {/if}
        <span class="sr-only">Check icon</span>
    </svelte:fragment>
    {msg}
</Toast>
