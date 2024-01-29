<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
	import Chevron from "$lib/assets/icons/dropdown.svg";
	import type { Recipe } from "$types/database.types.js";
	import { swipeDirection } from "$lib/functions/stores";
	import { Direction } from "$types/card.types";
	import DetailRow from "$lib/components/DetailRow.svelte";
	import TagRow from "$lib/components/TagRow.svelte";
	import { twMerge } from "tailwind-merge";
	import { fetchUserDataById } from "$lib/functions/database/user.js";

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
			<img
				src={recipe.images[0].image}
				class="transition-image h-64 w-full object-cover"
				alt=""
				style:--recipe="image-{recipe.id}"
			/>
			<div class="p-8 pt-4">
				<a href={`/profile/${profile.username}`} class="flex items-center gap-sm">
					<img src={profile.avatar_url} alt="Profilbild" class="aspect-square size-10 rounded-full object-cover" />
					<p class="text-md font-semibold">{profile.username}</p>
				</a>
				<h1 class="transition-name mt-5 font-header text-xxl text-light" style:--recipe-name="name-{recipe.id}">
					{recipe.name}
				</h1>
				<div class="animate-fade space-y-3 py-5">
					<TagRow {recipe} />
					<DetailRow {recipe} />
					<div class="rounded-sm bg-gray-500 hover:bg-gray-500-hover">
						<button
							on:click={() => (isOpen = !isOpen)}
							class="flex h-10 w-full items-center justify-between p-2 text-left font-semibold text-yellow"
						>
							<div class="text-md">Zutaten</div>
							<img
								class={twMerge("transition-transform", isOpen && "rotate-180")}
								src={Chevron}
								alt="chevron"
								width="25"
								height="25"
							/>
						</button>
						<div class={twMerge("p-4 pt-0", !isOpen && "hidden")}>
							{#each recipe.ingredients as ingredient}
								<li class="flex flex-row gap-4">
									<div class="w-12">
										{ingredient.amount}
									</div>
									<div class="font-semibold">
										{ingredient.name}
									</div>
								</li>
							{/each}
						</div>
					</div>
					<div class="mt-5 flex flex-col gap-3">
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
				</div>
			</div>
		</FadeIn>
	{/if}
{/await}
