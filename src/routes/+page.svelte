<script lang="ts">
	import type { Recipe } from "$lib/../database.types";
	import BottomNav from "$lib/components/BottomNav.svelte";
	import Card from "$lib/components/Card.svelte";
	import TopNav from "$lib/components/TopNav.svelte";

	import { supabase } from "$lib/functions/createClient";

	const fetchRecipes = async () => {
		let { data, error } = await supabase.from("recipes").select(`*, categories(*), types(*)`);
		if (data) return data;
		else throw error;
	};
</script>

<main class="flex w-full flex-col gap-16">
	<TopNav />
	{#await fetchRecipes()}
		<p>Loading...</p>
	{:then recipes}
		<Card recipe={recipes[0]} class="flex-auto" />
	{:catch error}
		<p>Something went wrong: {error}</p>
	{/await}
	<BottomNav />
</main>
