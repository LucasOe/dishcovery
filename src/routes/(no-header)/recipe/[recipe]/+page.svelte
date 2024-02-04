<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
	import ChevronSvg from "$lib/components/ChevronSVG.svelte";
	import type { Recipe } from "$types/database.types.js";
	import { swipeDirection, user } from "$lib/functions/stores";
	import { Direction } from "$types/card.types";
	import DetailRow from "$lib/components/DetailRow.svelte";
	import TagRow from "$lib/components/TagRow.svelte";
	import { twMerge } from "tailwind-merge";
	import { fetchUserDataById } from "$lib/functions/database/user.js";
	import DefaultAvatar from "$lib/assets/user.png";
	import Rating from "$lib/components/Rating.svelte";
	import ButtonRating from "$lib/components/ButtonRating.svelte";
	import { fetchLikes, isLiked, upsertLike } from "$lib/functions/database/likes";
	import Heart from "$lib/assets/icons/heart.svg";
	import RedHeart from "$lib/assets/icons/red_heart.svg";
	import { onMount } from "svelte";
	import LazyLoadingImage from "$lib/components/LazyLoadingImage.svelte";

	export let data;

	let recipe = data.recipe;
	let isOpen = false;
	let completedSteps: boolean[] = recipe.steps.map(() => false);
	let liked = false;
	let likes = 0;
	let isOwnRecipe = false;
	let currentImage: number = 0;

	onMount(async () => {
		likes = await fetchLikes(recipe.id);
	});

	let checkIfLiked = async (userId: string) => {
		liked = await isLiked(recipe.id, userId);
	};

	$: {
		if ($user) {
			checkIfLiked($user.id);
			isOwnRecipe = recipe.user_id == $user.id;
		}
	}

	function getRecipeSteps(recipe: Recipe) {
		return recipe.steps.sort((a, b) => {
			return a.number - b.number;
		});
	}

	const handleLikeButtonClick = async () => {
		if (!$user) return;
		if (isOwnRecipe) return;

		await isLiked(recipe.id, $user.id).then((res) => {
			if (res) {
				unlikeRecipe();
			} else {
				likeRecipe();
			}
		});
	};

	const unlikeRecipe = () => {
		if (!$user) return;

		upsertLike({
			user_id: $user.id,
			recipe: recipe.id,
			liked: false,
		});

		liked = false;
		likes--;
	};

	const likeRecipe = () => {
		if (!$user) return;

		upsertLike({
			user_id: $user.id,
			recipe: recipe.id,
			liked: true,
		});

		liked = true;
		likes++;
	};

	$swipeDirection = Direction.None;
</script>

{#await fetchUserDataById(recipe.user_id) then profile}
	{#if profile}
		<FadeIn>
			{#if recipe.images.length > 0}
				<div class="relative">
					<div class="transition-image h-64 w-full object-cover">
						<LazyLoadingImage src={recipe.images[currentImage].image}/>
					</div>
					{#if recipe.images.length > 1}
						<div class="absolute top-0 left-0 flex flex-row size-full">
							<button
									type="button"
									on:click={() => {
									currentImage = (currentImage - 1 + recipe.images.length) % recipe.images.length;
								}}
									class="size-full bg-transparent relative"></button>
							<button
									type="button"
									on:click={() => {
									currentImage = (currentImage + 1) % recipe.images.length;
								}}
									class="size-full bg-transparent relative"></button>
						</div>
					{/if}
				</div>
			{/if}
			{#if recipe.images.length > 1}
				<div class="absolute left-[50%] top-0 z-50 flex translate-x-[-50%] cursor-default gap-sm p-3">
					{#each recipe.images as _, index}
						<button
								type="button"
								on:click={() => (currentImage = index)}
								class={twMerge(
								"focus h-2 rounded-full shadow-shadowGray transition-[width]",
								currentImage === index ? "w-16 bg-yellow" : "w-12 bg-white"
							)}></button>

					{/each}
				</div>
			{/if}

			<div class="space-y-md p-8 pt-6">
				<div class="flex items-center justify-between">
					<a
							href={`/profile/${profile.username}`}
							class="focus group flex items-center gap-sm rounded-sm p-1 duration-150"
					>
						<div class="aspect-square size-10 rounded-full border-2 border-yellow object-cover group-hover:border-gray-300 overflow-hidden relative">
							<LazyLoadingImage src={profile.avatar_url ? profile.avatar_url : DefaultAvatar} alt="Profilbild" />
						</div>
						<p class="text-md font-semibold group-hover:text-gray-300">{profile.username}</p>
					</a>
					<button
							class={twMerge(
							"focus flex items-center gap-2 rounded-sm bg-gray-500 px-3 py-1 font-semibold leading-normal",
							isOwnRecipe ? "opacity-50" : ""
						)}
							on:click={() => handleLikeButtonClick()}
					>
						<span class="w-2">{likes}</span>
						<img src={liked ? RedHeart : Heart} alt="Heart" />
					</button>
				</div>

				<div class="space-y-2">
					<h1 class="transition-name font-header text-xxl text-light" style:--recipe-name="name-{recipe.id}">
						{recipe.name}
					</h1>
					<div class="pb-[2px] pt-xs">
						<Rating {recipe} />
					</div>
					{#if recipe.categories.length > 0}
						<TagRow {recipe} isInDetail={true} />
					{/if}
					<DetailRow {recipe} />
				</div>

				<p>
					{recipe.description}
				</p>

				{#if recipe.ingredients.length > 0}
					<div class="overflow-hidden rounded-sm bg-gray-500">
						<button
								on:click={() => (isOpen = !isOpen)}
								class="focus flex h-10 w-full items-center justify-between rounded-sm rounded-b-sm p-2 pr-0 text-left font-semibold text-yellow hover:bg-gray-500-hover focus-visible:outline-offset-[-2px]"
						>
							<div class="text-md pl-2">Zutaten</div>
							<div class="w-10">
								<ChevronSvg isOpen={isOpen ? true : false} />
							</div>
						</button>
						<div class={twMerge("flex flex-col pt-1", !isOpen && "hidden")}>
							{#each recipe.ingredients as ingredient}
								<li class="flex flex-row gap-md px-4 py-3 even:bg-[rgba(40,40,40,1)]">
									<div class="w-16">
										{ingredient.amount}
									</div>
									<div class="font-semibold">
										{ingredient.name}
									</div>
								</li>
							{/each}
						</div>
					</div>
				{/if}
				<div class="flex flex-col gap-2 pt-3">
					{#each getRecipeSteps(recipe) as step, index}
						<button
								class="focus flex cursor-pointer items-start gap-2 rounded-sm p-1 transition-opacity duration-300"
								on:click={() => (completedSteps[index] = !completedSteps[index])}
						>
							<div>
								{#if completedSteps[index]}
									<div class="size-6 rounded-full border-2 border-yellow bg-yellow"></div>
								{:else}
									<div class="size-6 rounded-full border-2 border-gray-300 bg-gray-900"></div>
								{/if}
							</div>
							<div>
								<h2
										class={twMerge(
										"text-left font-semibold text-yellow",
										completedSteps[index] && "text-white line-through opacity-50"
									)}
								>
									Schritt {step.number}:
								</h2>
								<p class={twMerge("text-left", completedSteps[index] && "line-through opacity-50")}>
									{step.description}
								</p>
							</div>
						</button>
					{/each}
				</div>
				{#if $user && recipe.user_id !== $user.id}
					<div class="flex flex-col py-16">
						<p class="mb-2 text-center font-bold">Schon einmal gekocht? Bewerte das Rezept!</p>
						<ButtonRating {recipe} />
					</div>
				{/if}
			</div>
		</FadeIn>
	{/if}
{/await}
