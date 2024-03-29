<script lang="ts">
	import type { Recipe } from "$types/database.types";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";
	import { twMerge } from "tailwind-merge";
	import { onMount } from "svelte";
	import Star from "$lib/assets/icons/star.svg";
	import RedHeart from "$lib/assets/icons/red_heart.svg";
	import { fetchAverageRating } from "$lib/functions/database/ratings";
	import { fetchLikes } from "$lib/functions/database/likes";

	export let recipe: Recipe;
	export let showRatings = false;
	export let showHearts = false;

	let rating = 0;
	let likes = 0;

	onMount(async () => {
		likes = await fetchLikes(recipe.id);
		if (showRatings) rating = Math.round((await fetchAverageRating(recipe.id)) * 2) / 2;
	});
</script>

<div
	class={twMerge(
		"pointer-events-none mt-1 flex flex-col justify-start gap-0 xs:mt-0 xs:grid xs:grid-cols-[auto,1fr] xs:items-center xs:gap-sm",
		$$props.class
	)}
>
	<div class="flex h-full items-center gap-xs">
		<div class="flex h-full items-center gap-xs pr-3">
			<img alt="Clock" class="size-5" src={ClockIcon} />
			<p class="whitespace-nowrap text-sm font-semibold">{recipe.preperation_time} Min.</p>
		</div>
		<div class="flex h-full items-center gap-xs pr-3">
			<img alt="Difficulty" class="size-5" src={DifficultyIcon} />
			<p class="whitespace-nowrap text-sm font-semibold">{["Einfach", "Mittel", "Schwer"][recipe.difficulty - 1]}</p>
		</div>
		<div class="flex h-full items-center gap-xs">
			{#each { length: recipe.cost } as _}
				<img alt="Euro" class="size-5" src={EuroIcon} />
			{/each}
		</div>
	</div>
	<div class="mt-0 flex gap-1 justify-self-end xs:mt-0 xs:gap-0">
		{#if showHearts}
			<button
				class={"focus flex items-center gap-1 justify-self-end rounded-sm px-0 py-1 font-semibold leading-normal xs:px-2"}
			>
				<span class="w-4">{likes}</span>
				<img src={RedHeart} alt="Heart" />
			</button>
		{/if}
		{#if showRatings && rating > 0}
			<button class={"focus flex items-center gap-1 rounded-sm px-0 py-1 font-semibold leading-normal xs:px-2"}>
				<span class="w-4 text-right">{rating}</span>
				<img src={Star} alt="Heart" />
			</button>
		{/if}
	</div>
</div>
