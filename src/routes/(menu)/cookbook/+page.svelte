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
			{#if selectedMenu == "all" || selectedMenu == "uploads"}
				{#await userRecipes then recipes}
					{#each recipes as recipe}
						<RecipeCard
							{recipe}
							message="Möchtest du dein eigenes Rezept wirklich löschen? Diese Aktion kann nicht wiederrufen werden."
							onConfirm={() => onDeleteUserRecipe(recipe)}
						/>
					{/each}
				{/await}
			{/if}
			{#if selectedMenu == "all" || selectedMenu == "likes"}
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
</FadeIn>
