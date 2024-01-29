<script lang="ts">
	import type { Recipe } from "$types/database.types";
	import { fetchRecipesInCookBook, removeRecipeFromCookBook, deleteRecipe } from "$lib/functions/database/recipes";
	import { fetchUserRecipes } from "$lib/functions/database/user";
	import { user } from "$lib/functions/stores";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import RecipeCard from "$lib/components/RecipeCard.svelte";
	import { goto } from "$app/navigation";

	let allRecipes: Recipe[] = [];
	let userRecipes: Recipe[] = [];
	let showCookBook = true;

	// Reactive statements to fetch recipes when user changes
	$: {
		if ($user) {
			fetchAllRecipes();
			fetchUserSpecificRecipes();
		}
	}

	async function fetchAllRecipes() {
		if ($user) {
			const cookBookRecipes = await fetchRecipesInCookBook($user.id);
			const otherUserRecipes = await fetchUserRecipes($user.id);
			allRecipes = [...cookBookRecipes, ...otherUserRecipes];
		}
	}

	async function onDeleteFromCookBook(id: number) {
		if ($user) {
			await removeRecipeFromCookBook($user.id, id);
			fetchAllRecipes(); // Update all recipes after deletion
		}
	}

	async function fetchUserSpecificRecipes() {
		if ($user) {
			userRecipes = await fetchUserRecipes($user.id);
			console.log("User Recipes:", userRecipes);
		}
	}

	async function onDelete(id: number) {
		await deleteRecipe(id);
		fetchUserSpecificRecipes();
	}

	// Wrapper function that calls both onDelete and onDeleteFromCookBook
	function onDeleteWrapper(id: number) {
		onDelete(id);
		onDeleteFromCookBook(id);
	}

	function toggleRecipes() {
		showCookBook = !showCookBook;
	}
</script>

<FadeIn>
	<div class="space-y-8">
		<div class="mb-4">
			<button on:click={toggleRecipes} class="mt-lg flex font-bold text-gray-300">
				{#if showCookBook}
					Deine Rezepte anzeigen
				{:else}
					Alle Rezepte anzeigen
				{/if}
			</button>
		</div>

		{#if showCookBook}
			{#if allRecipes.length > 0}
				<div class="space-y-sm">
					<h2 class="text-2xl font-bold">Alle Rezepte</h2>
					{#key allRecipes}
						{#each allRecipes as recipe}
							<RecipeCard {recipe} action={() => onDeleteWrapper(recipe.id)} />
						{/each}
					{/key}
				</div>
			{:else}
				<p>Keine Rezepte gefunden.</p>
			{/if}
		{:else if userRecipes.length > 0}
			<div>
				<h2 class="text-2xl font-bold">Deine Rezepte</h2>
				{#key userRecipes}
					{#each userRecipes as recipe}
						<div class="pb-md">
							<RecipeCard {recipe} action={() => onDeleteWrapper(recipe.id)} />
						</div>
					{/each}
				{/key}
			</div>
		{:else}
			<p>Keine eigenen Rezepte gefunden.</p>
		{/if}
	</div>
</FadeIn>
