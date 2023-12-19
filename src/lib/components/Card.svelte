<script lang="ts">
	import { twMerge } from "tailwind-merge";

	import type { Recipe } from "$types/database.types";
	import { Direction } from "$types/card.types";
	import TestImg from "$lib/assets/img/test-img.jpg";
	import Tag from "$lib/components/Tag.svelte";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";

	export let recipe: Recipe;
	export let transformValue = "";
	export let isTouching = false;
	export let swipeDirection: Direction = Direction.None;

	$: animClass = isTouching ? "transition-transform-instant" : "transition-transform-slow";
	$: swipeClass = (() => {
		switch (swipeDirection) {
			case Direction.None:
				return "border-gray-900 shadow-shadowGray";
			case Direction.Left:
				return "border-red shadow-shadowRed";
			case Direction.Right:
				return "border-yellow shadow-shadowYellow";
			default:
				return "border-light shadow-shadowLight";
		}
	})();
</script>

<div
	class={twMerge(
		"relative z-10 flex overflow-hidden rounded-xl border-2 bg-cover bg-center",
		animClass,
		swipeClass,
		$$props.class
	)}
	style={`background-image: url(${TestImg}); transform: ${transformValue}`}
>
	<div class="z-10 flex flex-col gap-sm self-end p-lg">
		<h1 class="font-header text-xxl text-light">{recipe.name}</h1>

		<div class="flex gap-sm">
			{#each recipe.categories as category}
				<Tag text={category.name} color="yellow" class="select-none" />
			{/each}
			{#each recipe.types as type}
				<Tag text={type.name} color="yellow" class="select-none" />
			{/each}
		</div>

		<div class="pointer-events-none flex gap-md">
			<div class="flex select-none gap-xs">
				<img alt="Clock" class="h-5 w-5" src={ClockIcon} />
				<p>{recipe.preperation_time} Min.</p>
			</div>
			<div class="flex select-none gap-xs">
				<img alt="Difficulty" class="h-5 w-5" src={DifficultyIcon} />
				<p>{["Einfach", "Mittel", "Schwer"][recipe.difficulty]}</p>
			</div>
			<div class="flex select-none gap-xs">
				{#each { length: recipe.cost } as _}
					<img alt="Euro" class="h-5 w-5" src={EuroIcon} />
				{/each}
			</div>
		</div>
	</div>
	<div class="absolute h-full w-full bg-gradient-to-b from-transparent from-50% to-gray-900"></div>
</div>

<style>
	.transition-transform-slow {
		transition:
			all 300ms,
			transform 500ms;
	}
	.transition-transform-instant {
		transition:
			all 300ms,
			transform 0s;
	}
</style>
