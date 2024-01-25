<script lang="ts">
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";
	import MoreIcon from "$lib/assets/icons/more.svg";

	import RoundButton from "$lib/components/RoundButton.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import { fetchRecipesInCookBook } from "$lib/functions/database/recipes";
	import type { Recipe, User } from "$types/database.types";
	import { currentUser } from "$lib/functions/stores";
	import { goto } from "$app/navigation";
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
					<RecipeCard {recipe} />
				{/each}
			{/key}
		{/if}
	</div>
</FadeIn>
