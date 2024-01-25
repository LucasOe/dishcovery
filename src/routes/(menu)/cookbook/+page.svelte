<script lang="ts">
	import type { Recipe, User } from "$types/database.types";
	import { fetchRecipesInCookBook } from "$lib/functions/database/recipes";
	import { currentUser } from "$lib/functions/stores";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import RecipeCard from "$lib/components/RecipeCard.svelte";

	let user: User | null;

	currentUser.subscribe((value) => {
		user = value;
	});

	let recipes: Recipe[] = [];

	// Reactive statement to fetch recipes when user changes
	$: {
		user && fetchRecipes();
	}

	async function fetchRecipes() {
		if (user) recipes = await fetchRecipesInCookBook(user.id);
	}
</script>

<FadeIn>
	<div class="space-y-4">
		{#if recipes.length > 0}
			{#key recipes}
				{#each recipes as recipe}
					<RecipeCard {recipe} action={() => {}} />
				{/each}
			{/key}
		{/if}
	</div>
</FadeIn>
