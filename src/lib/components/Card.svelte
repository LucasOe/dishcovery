<script lang="ts">
	import { twMerge } from "tailwind-merge";

	import type { Recipe } from "$types/database.types";
	import { Direction } from "$types/card.types";
	import Tag from "$lib/components/Tag.svelte";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";
	import Like from "$lib/assets/icons/addToList.svg";
	import Dislike from "$lib/assets/icons/reject.svg";
	import Open from "$lib/assets/icons/open.svg";
	import { selectedRecipe, swipeDirection } from "$lib/functions/stores";

	export let recipe: Recipe;

	export let isLast = false;
	export let isFirst = false;
	export let transformValue = "";
	export let isTouching = false;

	let swipeValue: Direction = Direction.None;

	swipeDirection.subscribe((value) => {
		swipeValue = value;
	});

	$: animClass = isLast && isTouching ? "transition-transform-instant" : "transition-transform-slow";
	$: swipeClass = (() => {
		switch (isLast ? swipeValue : Direction.None) {
			case Direction.None:
				return "border-gray-900";
			case Direction.Left:
				return "border-red shadow-shadowRed";
			case Direction.Right:
				return "border-yellow shadow-shadowYellow";
			default:
				return "border-light shadow-shadowLight";
		}
	})();
	$: shadowClass = isFirst ? "shadow-shadowGray" : "";
</script>

<div
	class={twMerge(
		"z-9 relative flex overflow-hidden rounded-xl border-2 bg-cover bg-center",
		shadowClass,
		animClass,
		swipeClass,
		$$props.class
	)}
	style={`background-image: url(${recipe.images[0].image}); transform: ${
		isLast ? transformValue : "translate(0px, 0px)"
	}`}
>
	<div class="z-10 flex flex-col gap-sm self-end p-lg">
		<div>
			<img
				class={`${
					isLast && swipeValue == Direction.Right ? "opacity-100" : "opacity-0"
				} absolute left-xxl top-xxl z-10 w-xxl duration-300`}
				src={Like}
				alt="Like Icon"
			/>
			<img
				class={`${
					isLast && swipeValue == Direction.Left ? "opacity-100" : "opacity-0"
				} absolute right-xxl top-xxl z-10 w-xxl duration-300`}
				src={Dislike}
				alt="Dislike Icon"
			/>
			<img
				class={`${
					isLast && swipeValue == Direction.Up ? "opacity-100" : "opacity-0"
				} absolute bottom-0 left-0 right-0 top-0 z-10 m-auto w-xxl brightness-200 duration-300`}
				src={Open}
				alt="Open Icon"
			/>
			<div
				class={`${
					isLast && (swipeValue == Direction.Up || swipeValue == Direction.Left || swipeValue == Direction.Right)
						? "size-full bg-gradient-to-t from-transparent from-10% to-gray-500 opacity-100"
						: "opacity-0"
				} z-1 absolute left-0 top-0 duration-300`}
			></div>
		</div>

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
	</div>
	<div class="absolute size-full bg-gradient-to-b from-transparent from-50% to-gray-900"></div>
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
