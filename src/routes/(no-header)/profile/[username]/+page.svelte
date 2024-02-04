<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
	import { supabase } from "$lib/functions/database/createClient";
	import { goto } from "$app/navigation";
	import Spinner from "$lib/components/Spinner.svelte";
	import NoRecipes from "$lib/assets/icons/no_recipes.svg";
	import DefaultAvatar from "$lib/assets/user.png";
	import { fetchUserRecipes, insertAvatarImage, upsertAvatarImage } from "$lib/functions/database/user";
	import RecipeCard from "$lib/components/RecipeCard.svelte";
	import { deleteRecipe } from "$lib/functions/database/recipes";
	import { user } from "$lib/functions/stores.js";
	import { onMount } from "svelte";
	import type { Recipe } from "$types/database.types.js";
	import LazyLoadingImage from "$lib/components/LazyLoadingImage.svelte";

	export let data;

	let profile = data.user;
	let image;
	let fileInput: HTMLInputElement;
	let userRecipes: Promise<Recipe[]>;

	onMount(() => {
		userRecipes = fetchUserRecipes(profile.id);
	});

	async function onDeleteUserRecipe(recipe: Recipe) {
		if (!$user) return;
		await deleteRecipe(recipe.id);
		userRecipes = fetchUserRecipes($user.id);
	}

	async function logout() {
		const { error } = await supabase.auth.signOut();
		if (error) console.log("Error logging out:", error.message);
		else goto("/");
	}

	async function onFileSelected(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!$user) return;
		if (!e.currentTarget.files) return;
		image = e.currentTarget.files[0];

		const path = await upsertAvatarImage($user.id, image);
		await insertAvatarImage($user.id, path);
		$user.avatar_url = path;
		profile = $user;
	}
</script>

<FadeIn>
	<div class="text-column relative flex flex-col items-center justify-center p-12">
		<div class="relative flex size-44">
			{#if $user?.id === profile.id}
				<input class="hidden" type="file" accept=".jpg, .jpeg, .png" on:change={onFileSelected} bind:this={fileInput} />
				<label for="fileInput">
					<button
						class="z-[2] focus absolute bottom-0 right-0 cursor-pointer rounded-full bg-gray-500 p-4 hover:bg-gray-500-hover"
						on:click={() => fileInput.click()}
					>
						<svg class="" width="20" height="auto" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M1 6.13333V16C1 17.1046 1.89543 18 3 18H19C20.1046 18 21 17.1046 21 16V6.13333C21 5.02876 20.1046 4.13333 19 4.13333H17.0961C16.4133 4.13333 15.7776 3.78497 15.4103 3.2094L14.5897 1.92393C14.2224 1.34836 13.5867 1 12.9039 1H9.0961C8.41328 1 7.77764 1.34836 7.41026 1.92393L6.58974 3.2094C6.22236 3.78497 5.58672 4.13333 4.9039 4.13333H3C1.89543 4.13333 1 5.02876 1 6.13333Z"
								stroke="#f8f8f8"
								stroke-width="2"
							/>
							<path
								d="M15 10.5C15 12.3365 13.3109 14 11 14C8.68915 14 7 12.3365 7 10.5C7 8.6635 8.68915 7 11 7C13.3109 7 15 8.6635 15 10.5Z"
								stroke="#f8f8f8"
								stroke-width="2"
							/>
						</svg>
					</button>
				</label>
			{/if}
			<div class="aspect-square size-44 rounded-full border-2 border-yellow object-cover overflow-hidden relative">
				<LazyLoadingImage src={profile.avatar_url ? profile.avatar_url : DefaultAvatar} alt="User" />
			</div>
		</div>
		<div class="mt-lg flex w-full flex-col items-center">
			<h1 class="block h-xl w-full text-center font-header text-xxl text-light">
				{profile.username}
			</h1>
		</div>
		{#if $user?.id === profile.id}
			<div class="flex items-center justify-center gap-5">
				<button
					on:click={() => logout()}
					class="focus border-xs mt-sm flex rounded-sm px-2 font-bold text-gray-300 underline hover:no-underline"
				>
					Ausloggen
				</button>
			</div>
		{/if}
		{#await userRecipes}
			<Spinner />
		{:then recipes}
			<h2 class="mb-md mt-lg text-lg font-bold">Uploads</h2>
			<div class="flex w-full flex-col space-y-md">
				{#each recipes as recipe}
					<RecipeCard
						{recipe}
						message="Möchtest du dein eigenes Rezept wirklich löschen? Diese Aktion kann nicht wiederrufen werden."
						onConfirm={() => onDeleteUserRecipe(recipe)}
						showButton={$user?.id === profile.id}
					/>
				{/each}
			</div>
			{#if recipes.length === 0}
				<div class="flex flex-col items-center gap-sm pt-sm">
					<img src={NoRecipes} alt="Noch keine Rezepte hochgeladen" width="40" />
					<p class="text-gray-300">Noch keine Rezepte hochgeladen</p>
				</div>
			{/if}
		{/await}
	</div>
</FadeIn>
