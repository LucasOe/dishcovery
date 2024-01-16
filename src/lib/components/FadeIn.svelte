<script>
	import { fly } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import { onMount } from "svelte";

	let ready = false;
	onMount(() => (ready = true));
</script>

{#if ready}
	<div transition:fly={{ duration: 300, y: 500, opacity: 0.5, easing: quintOut }}>
		<slot />
	</div>
{/if}
