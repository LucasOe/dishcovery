<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
	import { supabase } from "$lib/functions/database/createClient";
	import { goto } from "$app/navigation";
	import Spinner from "$lib/components/Spinner.svelte";
	import NoRecipes from "$lib/assets/icons/no_recipes.svg";
	import DefaultAvatar from "$lib/assets/user.png";
	import Edit from "$lib/assets/icons/edit.svg";
	import { fetchUserRecipes, insertAvatarImage, upsertAvatarImage } from "$lib/functions/database/user";
	import RecipeCard from "$lib/components/RecipeCard.svelte";
	import { deleteRecipe } from "$lib/functions/database/recipes";
	import { user } from "$lib/functions/stores.js";
	import { onMount } from "svelte";
	import type { Recipe } from "$types/database.types.js";
  
	export let data;
  
	let profile = data.user;
	let image;
	let fileInput: HTMLInputElement;
	let userRecipes: Promise<Recipe[]>;
	let showChangeImageButton = false;
  
	onMount(() => {
	  userRecipes = fetchUserRecipes(profile.id);
	});
  
	function toggleChangeImageButton() {
	  showChangeImageButton = !showChangeImageButton;
	}
  
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
	<div class="text-column flex flex-col items-center justify-center p-12 relative">
	  <div class="relative flex size-44">
		{#if $user?.id === profile.id}
		  <input
			class="hidden"
			type="file"
			accept=".jpg, .jpeg, .png"
			on:change={onFileSelected}
			bind:this={fileInput}
		  />
		  <label for="fileInput">
			<button
			  class="absolute bottom-0 right-0 bg-yellow rounded-full p-2 cursor-pointer"
			  on:click={() => fileInput.click()}
			>
			<img src={Edit} alt="Profilbild bearbeiten Icon" />
			</button>
		  </label>
		{/if}
		<img
		  class="aspect-square size-44 rounded-full border-2 border-yellow object-cover"
		  alt="User"
		  src={profile.avatar_url ? profile.avatar_url : DefaultAvatar}
		/>
	  </div>
	  <div class="mt-lg flex w-full flex-col items-center">
		<h1 class="block h-xl w-full text-center font-header text-xxl text-light">
		  {profile.username}
		</h1>
	  </div>
	  {#if $user?.id === profile.id}
		<div class="flex items-center justify-center gap-5">
		  <button on:click={() => logout()} class="mt-sm flex font-bold text-gray-300 underline hover:no-underline">
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

  