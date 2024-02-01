<script lang="ts">
	import BottomNav from "$lib/components/BottomNav.svelte";
	import TopNav from "$lib/components/TopNav.svelte";
	import CardStack from "$lib/components/CardStack.svelte";
	import { recipe } from "$lib/functions/stores";
</script>

<svelte:head>
	<title>Dishcovery</title>
</svelte:head>

<main class="flex w-full flex-col gap-16 p-8">
	<TopNav />
	<CardStack />
	{#if $recipe}
		<BottomNav />
	{/if}
</main>
