<script lang="ts">
	import BottomNav from "$lib/components/BottomNav.svelte";
	import TopNav from "$lib/components/TopNav.svelte";
	import CardStack from "$lib/components/CardStack.svelte";
</script>

<svelte:head>
	<title>Dishcovery</title>
</svelte:head>

<main class="flex w-full touch-none flex-col gap-16 p-8">
	<TopNav />
	<CardStack />
	<BottomNav />
</main>
