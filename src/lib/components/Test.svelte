<script lang="ts">
	import { supabase } from "$lib/functions/createClient";
	import type { Tables } from "$lib/../database.types";

	import { onMount } from "svelte";

	let recipes: Tables<"recipes">[];

	onMount(() => {
		fetchRecipes();
	});

	const fetchRecipes = async () => {
		let { data } = await supabase.from("recipes").select();
		if (data) recipes = data;
	};
</script>

<ul>
	{#each recipes as recipe}
		<p>{recipe.name}</p>
	{/each}
</ul>
