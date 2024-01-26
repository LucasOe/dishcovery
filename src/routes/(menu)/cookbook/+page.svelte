<script lang="ts">
	import type { Recipe } from "$types/database.types";
	import { fetchRecipesInCookBook } from "$lib/functions/database/recipes";
	import { fetchUserRecipes } from "$lib/functions/database/user";
	import { user } from "$lib/functions/stores";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import RecipeCard from "$lib/components/RecipeCard.svelte";

	let cookBookRecipes: Recipe[] = [];
	let userRecipes: Recipe[] = [];
	let showCookBook = true;

	// Reactive statements to fetch recipes when user changes
	$: {
		if ($user) {
			fetchCookBookRecipes();
			fetchUserSpecificRecipes();
		}
	}

	async function fetchCookBookRecipes() {
		if ($user) cookBookRecipes = await fetchRecipesInCookBook($user.id);
	}

	async function fetchUserSpecificRecipes() {
		if ($user) userRecipes = await fetchUserRecipes($user.id);
	}

	function toggleRecipes() {
		showCookBook = !showCookBook;
	}
</script>

<FadeIn>
	<div class="space-y-8">
		<div class="mb-4">
			<button on:click={toggleRecipes} class="text-blue-500 underline">
				{#if showCookBook}
					Deine Rezepte anzeigen
				{:else}
					Rezepte im Kochbuch anzeigen
				{/if}
			</button>
		</div>

		{#if showCookBook}
			{#if cookBookRecipes.length > 0}
				<div class="space-y-sm">
					<h2 class="text-2xl font-bold">Rezepte im Kochbuch</h2>
					{#key cookBookRecipes}
						{#each cookBookRecipes as recipe}
							<RecipeCard {recipe} action={() => console.log("TODO")} />
						{/each}
					{/key}
				</div>
			{:else}
				<p>Keine Rezepte im Kochbuch gefunden.</p>
			{/if}
		{:else if userRecipes.length > 0}
			<div>
				<h2 class="mb-2 text-2xl font-bold">Deine Rezepte</h2>
				{#key userRecipes}
					{#each userRecipes as recipe}
						<RecipeCard {recipe} action={() => console.log("TODO")} />
					{/each}
				{/key}
			</div>
		{:else}
			<p>Keine eigenen Rezepte gefunden.</p>
		{/if}
	</div>
</FadeIn>
