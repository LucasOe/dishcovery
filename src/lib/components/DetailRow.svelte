<script lang="ts">
	import type { Recipe } from "$types/database.types";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";
	import { twMerge } from "tailwind-merge";
	import { onMount } from "svelte";
	import Star from "$lib/assets/icons/star.svg";
	import { fetchAverageRating } from "$lib/functions/database/ratings";

	export let recipe: Recipe;

	export let showLikes = false;

	let rating = 0;

	onMount(async () => {
		if (showLikes) rating = Math.round((await fetchAverageRating(recipe.id)) * 2) / 2;
	});
</script>

<div class={twMerge("pointer-events-none grid grid-cols-[auto,1fr] items-center gap-sm", $$props.class)}>
	<div class="flex h-full items-center gap-xs">
		<div class="flex h-full items-center gap-xs">
			<img alt="Clock" class="size-5" src={ClockIcon} />
			<p class="text-sm font-semibold">{recipe.preperation_time} Min.</p>
		</div>
		<div class="flex h-full items-center gap-xs">
			<img alt="Difficulty" class="size-5" src={DifficultyIcon} />
			<p class="text-sm font-semibold">{["Einfach", "Mittel", "Schwer"][recipe.difficulty - 1]}</p>
		</div>
		<div class="flex h-full items-center gap-xs">
			{#each { length: recipe.cost } as _}
				<img alt="Euro" class="size-5" src={EuroIcon} />
			{/each}
		</div>
	</div>

	{#if showLikes}
		<button class={"focus flex items-center gap-2 justify-self-end rounded-sm px-3 py-1 font-semibold leading-normal"}>
			<span class="w-4 text-right">{rating}</span>
			<img src={Star} alt="Heart" />
		</button>
	{/if}
</div>
