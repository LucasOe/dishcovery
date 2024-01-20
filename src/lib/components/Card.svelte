<script lang="ts">
	import { twMerge } from "tailwind-merge";

	import type { Recipe } from "$types/database.types";
	import { Direction } from "$types/card.types";
	import Like from "$lib/assets/icons/addToList.svg";
	import Dislike from "$lib/assets/icons/reject.svg";
	import Open from "$lib/assets/icons/open.svg";
	import DetailRow from "./DetailRow.svelte";
	import TagRow from "./TagRow.svelte";
	import { fetchRatingsByRecipe } from "$lib/functions/database/ratings";
	import { onMount } from "svelte";
	import Star from "$lib/assets/icons/star.svg";
	import StarHalf from "$lib/assets/icons/star_half.svg";
	import StarEmpty from "$lib/assets/icons/star_empty.svg";

	export let recipe: Recipe;
	let rating = 0;
	export let isLast = false;
	export let isFirst = false;
	export let isTouching = false;
	export let transformValue = "translate(0px, 0px)";
	export let swipeVisual: Direction = Direction.None;

	const imageTransition = isLast ? `image-${recipe.id}` : "";
	const headlineTransition = isLast ? `name-${recipe.id}` : "";

	// prettier-ignore
	const swipeClass: Record<Direction, string> = {
    [Direction.None]: "",
    [Direction.Left]: "border-red shadow-shadowRed",
    [Direction.Right]: "border-yellow shadow-shadowYellow",
    [Direction.Up]: "border-light shadow-shadowLight w-[110%]",
    [Direction.Down]: ""
  };

	onMount(async () => {
		rating = await fetchRatingsByRecipe(recipe.id);
	});
</script>

<div
	class={twMerge(
		"absolute flex size-full w-[100%] justify-center overflow-hidden rounded-xl border-2 border-gray-900 bg-cover bg-no-repeat will-change-transform before:absolute before:size-full before:bg-gradient-to-b before:from-transparent before:from-50% before:to-gray-900 ",
		isLast && isTouching ? "transition-transform-instant" : "transition-transform-slow",
		isLast ? swipeClass[swipeVisual] : "",
		isFirst ? "shadow-shadowGray" : ""
	)}
	style={`
		transform: ${isLast ? transformValue : "translate(0px, 0px)"};
	`}
>
	<div class=" z-10 flex w-full flex-col gap-sm self-end p-lg">
		<div class="flex gap-1">
			{#each Array(Math.floor(rating)) as _}
				<img src={Star} alt="Rating Icon" />
			{/each}
			{#if rating % 1 !== 0}
				<img src={StarHalf} alt="Half Star Icon" />
			{/if}
			{#each Array(5 - Math.round(rating)) as _}
				<img src={StarEmpty} alt="Empty Star Icon" />
			{/each}
		</div>
		<h1 class="transition-name font-header text-xxl text-light" style:--recipe-name={headlineTransition}>
			{recipe.name}
		</h1>

		<TagRow {recipe} />
		<DetailRow {recipe} />
	</div>

	<img
		src={recipe.images[0].image}
		class="transition-image absolute top-0 z-[-1] h-full max-w-[200%] object-cover"
		alt=""
		style:--recipe={imageTransition}
	/>

	<div>
		<img
			class={`
				absolute left-xxl top-xxl z-10 size-xxl duration-300
				${isLast && swipeVisual === Direction.Right ? "opacity-100" : "opacity-0"}
			`}
			src={Like}
			alt="Like Icon"
		/>
		<img
			class={`
				absolute right-xxl top-xxl z-10 size-xxl duration-300
				${isLast && swipeVisual === Direction.Left ? "opacity-100" : "opacity-0"}
			`}
			src={Dislike}
			alt="Dislike Icon"
		/>
		<img
			class={`
				absolute bottom-0 left-0 right-0 top-0 z-10 m-auto size-xxl brightness-200 duration-300
				${isLast && swipeVisual === Direction.Up ? "opacity-100" : "opacity-0"}
			`}
			src={Open}
			alt="Open Icon"
		/>
		<div
			class={`
				absolute left-0 top-0 size-full bg-gradient-to-t from-transparent from-10% to-gray-500 duration-300
				${
					isLast && (swipeVisual === Direction.Up || swipeVisual === Direction.Left || swipeVisual == Direction.Right)
						? "opacity-100"
						: "opacity-0"
				}
			`}
		/>
	</div>
</div>

<style>
	.transition-transform-slow {
		transition:
			translate 300ms,
			transform 800ms,
			width 800ms,
			border 800ms;
	}

	.transition-transform-instant {
		transition:
			translate 500ms,
			transform 0s,
			width 800ms,
			border 800ms;
	}
</style>
