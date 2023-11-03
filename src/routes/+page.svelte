<script lang="ts">
	import { fetchRecipes } from "$lib/functions/db";

	import BottomNav from "$lib/components/BottomNav.svelte";
	import Card from "$lib/components/Card.svelte";
	import TopNav from "$lib/components/TopNav.svelte";
</script>

<main class="flex w-full flex-col gap-16">
	{#await fetchRecipes()}
		<p>Loading...</p>
	{:then recipes}
		<TopNav />
		<Card recipe={recipes[0]} class="flex-auto" />
		<BottomNav />
	{:catch error}
		<p>Something went wrong: {error}</p>
	{/await}
</main>
