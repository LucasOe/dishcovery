<script lang="ts">
	import Tag from "$lib/components/Tag.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import { supabase } from "$lib/functions/database/createClient";
	import { goto } from "$app/navigation";
	import Spinner from "$lib/components/Spinner.svelte";
	import { currentUser } from "$lib/functions/stores";
	import {
		deleteAvatarImage,
		fetchUserRecipes,
		insertAvatarImage,
		uploadAvatarImage,
	} from "$lib/functions/database/user";
	import type { User } from "$types/database.types";
	import RecipeCard from "$lib/components/RecipeCard.svelte";
	import { deleteRecipe } from "$lib/functions/database/recipes";

	let image;
	let fileInput: HTMLInputElement;
	let user: User | null;

	currentUser.subscribe((value) => {
		user = value;
	});

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		currentUser.set(null);
		if (error) console.log("Error logging out:", error.message);
		else goto("/");
	};

	async function onFileSelected(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!user) return;
		if (!e.currentTarget.files) return;
		image = e.currentTarget.files[0];

		//Replace old image with new image
		await deleteAvatarImage(user.id);
		const path = await uploadAvatarImage(image);
		await insertAvatarImage(user.id, path);
		user.avatar_url = path;
	}

	async function onDelete(id: number) {
		await deleteRecipe(id);
		goto("/"); // TODO: Avoid reloading entire page when deleting
	}
</script>

<FadeIn>
	<div class="text-column flex flex-col items-center justify-center pt-12">
		{#if user}
			<div class="relative flex size-44">
				<input class="hidden" type="file" accept=".jpg, .jpeg, .png" on:change={onFileSelected} bind:this={fileInput} />
				<button
					class="absolute inline size-full rounded-full opacity-50 duration-300 hover:bg-gray-900"
					on:click={() => fileInput.click()}
				>
				</button>
				<img class="w-44 rounded-full" alt="User" src={user.avatar_url} width="176" height="176" />
			</div>
			<div class="mt-lg flex w-full flex-col items-center">
				<h1 class="block h-xl w-full text-center font-header text-xxl text-light">
					{user.username}
				</h1>
				<p class="hidden">25, Hamburg (DE)</p>
			</div>
			<div class="flex items-center justify-center gap-5">
				<button on:click={() => logout()} class="mt-lg flex font-bold text-gray-300">Ausloggen</button>
			</div>
			<div class="m-lg flex gap-md">
				<Tag text="Vegan" />
				<Tag text="Vegetarisch" />
				<Tag text="Thailändisch" />
				<Tag text="Chinesisch" />
				<Tag text="Schnell" />
			</div>

			{#await fetchUserRecipes(user.id)}
				<Spinner />
			{:then recipes}
				<div class="flex flex-col space-y-sm">
					{#each recipes as recipe}
						<RecipeCard {recipe} action={() => onDelete(recipe.id)} />
					{/each}
				</div>
			{/await}
		{:else}
			<Spinner />
		{/if}
	</div>
</FadeIn>
