<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
	import Tag from "$lib/components/Tag.svelte";
	import { fetchRecipes } from "$lib/functions/db";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";
	import Chevron from "$lib/assets/icons/dropdown.svg";

	//Accrdion
	let isOpen = false;
	function toggleAccordion() {
		isOpen = !isOpen;
	}
</script>

<FadeIn>
	{#await fetchRecipes()}
		<p class="relative flex w-full items-center justify-center">Loading...</p>
	{:then recipes}
		<img src={recipes[0].image} class="aspect-square h-64 w-full object-cover" alt="" />
		<div class="mt-5">
			<h1 class="mt-5 font-header text-xxl text-light">{recipes[0].name}</h1>
			<div class="mt-2 flex gap-sm">
				{#each recipes[0].categories as category}
					<Tag text={category.name} color="yellow" class="select-none" />
				{/each}
				{#each recipes[0].types as type}
					<Tag text={type.name} color="yellow" class="select-none" />
				{/each}
			</div>
			<div class="pointer-events-none mt-3 flex gap-md">
				<div class="flex select-none gap-xs">
					<img alt="Clock" class="h-5 w-5" src={ClockIcon} />
					<p>{recipes[0].preperation_time} Min.</p>
				</div>
				<div class="flex select-none gap-xs">
					<img alt="Difficulty" class="h-5 w-5" src={DifficultyIcon} />
					<p>{["Einfach", "Mittel", "Schwer"][recipes[0].difficulty]}</p>
				</div>
				<div class="flex select-none gap-xs">
					{#each { length: recipes[0].cost } as _}
						<img alt="Euro" class="h-5 w-5" src={EuroIcon} />
					{/each}
				</div>
			</div>
			<div class="mt-5 rounded-sm bg-gray-500">
				<button on:click={toggleAccordion} class="flex w-full justify-between p-3 text-left font-semibold text-yellow">
					<div>Zutaten</div>
					<img class={`chevron ${isOpen ? "open" : ""}`} src={Chevron} alt="chevron" width="20" height="20" />
				</button>
				<div class={`accordion-content ${isOpen ? "open" : ""}`}>
					{#each recipes[0].ingredients as ingredient}
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
				{#each recipes[0].steps as step}
					<div>
						<h2 class="font-semibold">Schritt {step.number}:</h2>
						<p>{step.description}</p>
					</div>
				{/each}
			</div>
		</div>
	{:catch error}
		<p>Something went wrong: {error}</p>
	{/await}
</FadeIn>

<style>
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
</style>
