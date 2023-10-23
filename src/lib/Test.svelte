<script lang="ts">
	import { supabase } from './createClient';
	import { onMount } from 'svelte';

	let recipes: any[] = [];

	onMount(() => {
		fetchRecipes();
	});

	const fetchRecipes = async () => {
		let { data, error } = await supabase.from('recipes').select();
		console.log('Test: ', data);
		if (data) recipes = data;
	};
</script>

<ul>
	{#each recipes as recipe}
		<p>{recipe.name}</p>
	{/each}
</ul>
