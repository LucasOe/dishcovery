<script lang="ts">
	import { twMerge } from "tailwind-merge";

	import type { Recipe } from "$types/database.types";
	import { Direction } from "$types/card.types";
	import Like from "$lib/assets/icons/addToList.svg";
	import Dislike from "$lib/assets/icons/reject.svg";
	import Open from "$lib/assets/icons/open.svg";
	import DetailRow from "./DetailRow.svelte";
	import TagRow from "./TagRow.svelte";
	import Rating from "$lib/components/Rating.svelte";

	export let recipe: Recipe;
	let rating = 0;
	export let isBottom = false;
	export let isTouching = false;
	export let transformValue = "translate(0px, 0px)";
	export let swipeVisual: Direction = Direction.None;

	const imageTransition = `image-${recipe.id}`;
	const headlineTransition = `name-${recipe.id}`;

	// prettier-ignore
	const swipeClass: Record<Direction, string> = {
    [Direction.None]: "",
    [Direction.Left]: "border-red shadow-shadowRed",
    [Direction.Right]: "border-yellow shadow-shadowYellow",
    [Direction.Up]: "border-light shadow-shadowLight w-[110%]",
    [Direction.Down]: ""
  };
</script>

<div
	class={twMerge(
		"absolute flex size-full w-[100%] justify-center overflow-hidden rounded-xl border-2 border-gray-900 bg-cover bg-no-repeat will-change-transform before:absolute before:size-full before:bg-gradient-to-b before:from-transparent before:from-30% before:to-gray-900 before:to-80% ",
		isTouching ? "transition-transform-instant" : "transition-transform-slow",
		swipeClass[swipeVisual],
		isBottom ? "shadow-shadowGray" : ""
	)}
	style={`
		transform: ${transformValue};
	`}
>
	<div class=" z-10 flex w-full flex-col gap-sm self-end p-lg">
		<Rating {recipe} />
		<h1 class="transition-name font-header text-xxl text-light" style:--recipe-name={headlineTransition}>
			{recipe.name}
		</h1>

		<TagRow {recipe} />
		<DetailRow {recipe} />
	</div>

	<img
		src={recipe.images[0].image}
		class="transition-image absolute top-0 z-[-1] h-4/5 max-w-[200%]"
		alt=""
		style:--recipe={imageTransition}
	/>

	<div>
		<img
			class={`
				absolute left-xxl top-xxl z-10 size-xxl duration-300
				${swipeVisual === Direction.Right ? "opacity-100" : "opacity-0"}
			`}
			src={Like}
			alt="Like Icon"
		/>
		<img
			class={`
				absolute right-xxl top-xxl z-10 size-xxl duration-300
				${swipeVisual === Direction.Left ? "opacity-100" : "opacity-0"}
			`}
			src={Dislike}
			alt="Dislike Icon"
		/>
		<img
			class={`
				absolute bottom-0 left-0 right-0 top-0 z-10 m-auto size-xxl brightness-200 duration-300
				${swipeVisual === Direction.Up ? "opacity-100" : "opacity-0"}
			`}
			src={Open}
			alt="Open Icon"
		/>
		<div
			class={`
				absolute left-0 top-0 size-full bg-gradient-to-t from-transparent from-10% to-gray-500 duration-300
				${
					swipeVisual === Direction.Up || swipeVisual === Direction.Left || swipeVisual == Direction.Right
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
