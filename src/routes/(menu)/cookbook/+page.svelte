<script lang="ts">
	import { deleteRecipe, fetchRecipesInCookBook, removeRecipeFromCookBook } from "$lib/functions/database/recipes";
	import { user } from "$lib/functions/stores";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import RecipeCard from "$lib/components/RecipeCard.svelte";
	import { fetchUserRecipes } from "$lib/functions/database/user";
	import { onMount } from "svelte";
	import type { Recipe } from "$types/database.types";
	import { twMerge } from "tailwind-merge";

	let selectedMenu: "all" | "uploads" | "likes" = "all";
	let allRecipes: Promise<Recipe[]>;

	onMount(() => {
		if (!$user) return;
		const userId: string = $user.id;
		allRecipes = fetchUserRecipes($user.id).then((userRecipes) => {
			return fetchRecipesInCookBook($user.id).then((likedRecipes) => {
				// Mische und entferne doppelte Rezepte
				return [...userRecipes, ...likedRecipes].filter(
					(recipe, index, self) => index === self.findIndex((r) => r.id === recipe.id)
				);
			});
		});
	});

	async function onDeleteUserRecipe(recipe: Recipe) {
		if (!$user) return;
		await deleteRecipe(recipe.id);
		allRecipes = allRecipes.then((recipes) => recipes.filter((r) => r.id !== recipe.id));
	}

	async function onDeleteLikedRecipe(recipe: Recipe) {
		if (!$user) return;
		await removeRecipeFromCookBook($user.id, recipe.id);
		allRecipes = allRecipes.then((recipes) => recipes.filter((r) => r.id !== recipe.id));
	}
</script>

<FadeIn>
	<div class="space-y-8">
		<div class="flex gap-8">
			<button
				on:click={() => (selectedMenu = "all")}
				disabled={selectedMenu == "all"}
				class={twMerge("mt-lg flex text-lg font-bold text-gray-300", selectedMenu == "all" && "text-white")}
			>
				Alle
			</button>
			<button
				on:click={() => (selectedMenu = "uploads")}
				disabled={selectedMenu == "uploads"}
				class={twMerge("mt-lg flex text-lg font-bold text-gray-300", selectedMenu == "uploads" && "text-white")}
			>
				Uploads
			</button>
			<button
				on:click={() => (selectedMenu = "likes")}
				disabled={selectedMenu == "likes"}
				class={twMerge("mt-lg flex text-lg font-bold text-gray-300", selectedMenu == "likes" && "text-white")}
			>
				Likes
			</button>
		</div>

		<div class="space-y-sm">
			{#if selectedMenu == "all"}
				{#await allRecipes then recipes}
					{#each recipes as recipe}
						<RecipeCard
							{recipe}
							message="Möchtest du dieses Rezept wirklich löschen?"
							onConfirm={() => onDeleteUserRecipe(recipe)}
						/>
					{/each}
				{/await}
			{/if}
			{#if selectedMenu == "uploads"}
				{#await fetchUserRecipes($user.id) then recipes}
					{#each recipes as recipe}
						<RecipeCard
							{recipe}
							message="Möchtest du dein eigenes Rezept wirklich löschen? Diese Aktion kann nicht wiederrufen werden."
							onConfirm={() => onDeleteUserRecipe(recipe)}
						/>
					{/each}
				{/await}
			{/if}
			{#if selectedMenu == "likes"}
				{#await fetchRecipesInCookBook($user.id) then recipes}
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
</FadeIn>