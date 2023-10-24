<script lang="ts">
	import type { Tables } from "$lib/../database.types";
	import BottomNav from "$lib/components/BottomNav.svelte";
	import Card from "$lib/components/Card.svelte";
	import TopNav from "$lib/components/TopNav.svelte";

	import { supabase } from "$lib/functions/createClient";
	import { onMount } from "svelte";

	let recipes: Tables<"recipes">[] = [];

	onMount(() => {
		fetchRecipes();
	});

	const fetchRecipes = async () => {
		let { data } = await supabase.from("recipes").select();
		if (data) recipes = data;
	};
</script>

<main class="flex h-full w-full flex-col justify-center gap-16">
	<TopNav />
	{#if recipes[0] != null}
		<Card recipe={recipes[0]} />
	{/if}
	<BottomNav />
</main>
