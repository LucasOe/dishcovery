<script lang="ts">
	import { supabase } from '$lib/functions/createClient';
	import { onMount } from 'svelte';

	type Recipe = {
		created_at: string;
		description: string | null;
		id: number;
		name: string | null;
	};
	let recipes: Recipe[] = [];

	onMount(() => {
		fetchRecipes();
	});

	const fetchRecipes = async () => {
		let { data } = await supabase.from('recipes').select();
		if (data) recipes = data;
	};
</script>

<ul>
	{#each recipes as recipe}
		<p>{recipe.name}</p>
	{/each}
</ul>
