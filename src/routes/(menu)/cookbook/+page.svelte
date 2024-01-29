<script lang="ts">
	import { deleteRecipe, fetchRecipesInCookBook, removeRecipeFromCookBook } from "$lib/functions/database/recipes";
	import { user } from "$lib/functions/stores";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import RecipeCard from "$lib/components/RecipeCard.svelte";
	import { fetchUserRecipes } from "$lib/functions/database/user";
	import { onMount } from "svelte";
	import type { Recipe } from "$types/database.types";

	let showCookBook = true;
	let userRecipes: Promise<Recipe[]>;
	let likedRecipes: Promise<Recipe[]>;

	onMount(() => {
		if (!$user) return;
		userRecipes = fetchUserRecipes($user.id);
		likedRecipes = fetchRecipesInCookBook($user.id);
	});

	async function onDeleteUserRecipe(recipe: Recipe) {
		if (!$user) return;
		await deleteRecipe(recipe.id);
		userRecipes = fetchUserRecipes($user.id);
	}

	async function onDeleteLikedRecipe(recipe: Recipe) {
		if (!$user) return;
		await removeRecipeFromCookBook($user.id, recipe.id);
		likedRecipes = fetchRecipesInCookBook($user.id);
	}
</script>

<FadeIn>
	{#if $user}
		<div class="space-y-8">
			<div class="mb-4">
				<button on:click={() => (showCookBook = !showCookBook)} class="mt-lg flex font-bold text-gray-300">
					{#if showCookBook}
						Deine Rezepte anzeigen
					{:else}
						Alle Rezepte anzeigen
					{/if}
				</button>
			</div>

			<div class="space-y-sm">
				<h2 class="text-2xl font-bold">
					{#if showCookBook}
						Deine Rezepte
					{:else}
						Alle Rezepte
					{/if}
				</h2>
				{#await userRecipes then recipes}
					{#each recipes as recipe}
						<RecipeCard
							{recipe}
							message="Möchtest du dein eigenes Rezept wirklich löschen? Diese Aktion kann nicht wiederrufen werden."
							onConfirm={() => onDeleteUserRecipe(recipe)}
						/>
					{/each}
				{/await}
				{#if showCookBook}
					{#await likedRecipes then recipes}
						{#each recipes as recipe}
							<RecipeCard
								{recipe}
								message="Möchtest du dieses Rezept aus deinen Favoriten wirklich löschen?"
								onConfirm={() => onDeleteLikedRecipe(recipe)}
							/>
						{/each}
					{/await}
				{/if}
			</div>
		</div>
	{/if}
</FadeIn>
