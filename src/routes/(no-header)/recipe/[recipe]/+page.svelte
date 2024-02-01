<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
	import Chevron from "$lib/assets/icons/dropdown.svg";
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

	export let data;

	let recipe = data.recipe;
	let isOpen = false;
	let completedSteps: boolean[] = recipe.steps.map(() => false);

	function getRecipeSteps(recipe: Recipe) {
		return recipe.steps.sort((a, b) => {
			return a.number - b.number;
		});
	}

	$swipeDirection = Direction.None;
</script>

{#await fetchUserDataById(recipe.user_id) then profile}
	{#if profile}
		<FadeIn>
			{#if recipe.images.length > 0}
				<img
					src={recipe.images[0].image}
					class="transition-image h-64 w-full object-cover"
					alt=""
					style:--recipe="image-{recipe.id}"
				/>
			{/if}
			<div class="p-8 pt-4">
				<a href={`/profile/${profile.username}`} class="group flex items-center gap-sm duration-150">
					<img
						src={profile.avatar_url ? profile.avatar_url : DefaultAvatar}
						alt="Profilbild"
						class="aspect-square size-10 rounded-full border-2 border-yellow object-cover group-hover:border-gray-300"
					/>
					<p class="text-md font-semibold group-hover:text-gray-300">{profile.username}</p>
				</a>
				<h1 class="transition-name mt-5 font-header text-xxl text-light" style:--recipe-name="name-{recipe.id}">
					{recipe.name}
				</h1>
				<Rating {recipe} />
				<div class="animate-fade space-y-6">
					<TagRow {recipe} isInDetail={true} />
					<DetailRow {recipe} />
					<div class="overflow-hidden rounded-sm bg-gray-500">
						<button
							on:click={() => (isOpen = !isOpen)}
							class="flex h-10 w-full items-center justify-between rounded-b-sm p-2 text-left font-semibold text-yellow hover:bg-gray-500-hover"
						>
							<div class="text-md pl-2">Zutaten</div>
							<img
								class={twMerge("transition-transform", isOpen && "rotate-180")}
								src={Chevron}
								alt="chevron"
								width="25"
								height="25"
							/>
						</button>
						<div class={twMerge("flex flex-col gap-xs pt-1", !isOpen && "hidden")}>
							{#each recipe.ingredients as ingredient}
								<li class="flex flex-row gap-md px-4 py-2 even:bg-[rgba(40,40,40,1)]">
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
					<div class="mt-12 flex flex-col gap-3">
						{#each getRecipeSteps(recipe) as step, index}
							<button
								class="flex cursor-pointer items-start gap-2 transition-opacity duration-300"
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
						<div class="my-36 flex flex-col">
							<p class="mb-3 text-center font-bold">Schon einmal gekocht? Bewerte das Rezept!</p>
							<ButtonRating {recipe} />
						</div>
					{/if}
				</div>
			</div>
		</FadeIn>
	{/if}
{/await}
