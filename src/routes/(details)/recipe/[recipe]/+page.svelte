<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";
	import Chevron from "$lib/assets/icons/dropdown.svg";
	import Spinner from "$lib/components/Spinner.svelte";
	import type { Recipe } from "$types/database.types.js";
	import { swipeDirection } from "$lib/functions/stores";
	import { Direction } from "$types/card.types";

	export let data;

	let recipe = data.recipe;
	let isLoading = false;

	//Accordion
	let isOpen = false;
	function toggleAccordion() {
		isOpen = !isOpen;
	}

	//Steps
	let completedSteps: boolean[] = [];

	$: if (recipe && recipe.steps) {
		completedSteps = recipe.steps.map(() => false);
	}

	function toggleStep(index: number) {
		completedSteps[index] = !completedSteps[index];
	}

	function getRecipeSteps(recipe: Recipe) {
		return recipe.steps.sort((a, b) => {
			return a.number - b.number;
		});
	}

	swipeDirection.set(Direction.None);
</script>

<FadeIn>
	{#if isLoading}
		<div class="absolute flex size-40 items-center justify-center rounded-full bg-yellow">
			<Spinner />
		</div>
	{/if}
	{#if recipe}
		<img src={recipe.images[0].image} class="transition-image h-64 w-full object-cover" alt="" style:--recipe="image-{recipe.id}"/>
		<div class="p-8 pt-4">
			<h1 class="mt-5 font-header text-xxl text-light">{recipe.name}</h1>
			<div class="mt-2 flex gap-sm">
				{#each recipe.categories as category}
					<Tag text={category.name} color="yellow" class="select-none" />
				{/each}
				{#each recipe.types as type}
					<Tag text={type.name} color="yellow" class="select-none" />
				{/each}
			</div>
			<div class="pointer-events-none mt-3 flex gap-md">
				<div class="flex select-none gap-xs">
					<img alt="Clock" class="size-5" src={ClockIcon} />
					<p>{recipe.preperation_time} Min.</p>
				</div>
				<div class="flex select-none gap-xs">
					<img alt="Difficulty" class="size-5" src={DifficultyIcon} />
					<p>{["Einfach", "Mittel", "Schwer"][recipe.difficulty]}</p>
				</div>
				<div class="flex select-none gap-xs">
					{#each { length: recipe.cost } as _}
						<img alt="Euro" class="size-5" src={EuroIcon} />
					{/each}
				</div>
			</div>
			<div class="mt-5 rounded-sm bg-gray-500">
				<button on:click={toggleAccordion} class="flex w-full justify-between p-3 text-left font-semibold text-yellow">
					<div>Zutaten</div>
					<img class={`chevron ${isOpen ? "open" : ""}`} src={Chevron} alt="chevron" width="20" height="20" />
				</button>
				<div class={`accordion-content ${isOpen ? "open" : ""}`}>
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
					<button class="step flex items-start gap-2" on:click={() => toggleStep(index)}>
						<div>
							{#if completedSteps[index]}
								<div class="size-6 rounded-full border-2 border-yellow bg-yellow"></div>
							{:else}
								<div class="size-6 rounded-full border-2 border-gray-300 bg-gray-900"></div>
							{/if}
						</div>
						<div>
							<h2
								class={completedSteps[index]
									? "completed text-left font-semibold"
									: "text-left font-semibold text-yellow"}
							>
								Schritt {step.number}:
							</h2>
							<p class={completedSteps[index] ? "completed text-left" : " text-left"}>{step.description}</p>
						</div>
					</button>
				{/each}
			</div>
		</div>
	{:else}
		<p>Es tut uns Leid, es ist etwas schief gelaufen.</p>
	{/if}
</FadeIn>

<style>
	.transition-image {
		view-transition-name: var(--recipe);
	}
	.accordion-content {
		overflow: hidden;
		max-height: 0;
		transition: max-height 0.2s ease-out;
		padding: 0 0.75rem;
	}
	.accordion-content.open {
		max-height: 999rem;
		padding: 0 0.75rem 0.5rem;
	}
	.chevron {
		transition: transform 0.2s ease;
		transform: rotate(0deg);
	}
	.chevron.open {
		transform: rotate(180deg);
	}

	.step {
		cursor: pointer;
		opacity: 1;
		transition: opacity 0.3s ease;
	}

	.step .completed {
		opacity: 0.5;
		text-decoration: line-through;
	}
</style>
