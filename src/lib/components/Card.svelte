<script lang="ts">
	import { twMerge } from "tailwind-merge";

	import type { Recipe } from "$types/database.types";
	import { Direction } from "$types/card.types";
	import DetailRow from "./DetailRow.svelte";
	import TagRow from "./TagRow.svelte";
	import Rating from "$lib/components/Rating.svelte";
	import IconOverlay from "./IconOverlay.svelte";

	export let recipe: Recipe;
	export let isTouching = false;
	export let transformValue = "translate(0px, 0px)";
	export let swipeIndicator: Direction = Direction.None;

	let currentImage: number = 0;

	const imageTransition = `image-${recipe.id}`;
	const headlineTransition = `name-${recipe.id}`;

	const swipeClass: Record<Direction, string> = {
		[Direction.None]: "",
		[Direction.Left]: "border-red shadow-shadowRed",
		[Direction.Right]: "border-yellow shadow-shadowYellow",
		[Direction.Up]: "border-light shadow-shadowLight w-[110%]",
		[Direction.Down]: "",
	};
</script>

<div
	class={twMerge(
		"absolute flex size-full justify-center overflow-hidden rounded-xl border-2 border-gray-900 duration-500 will-change-transform before:absolute before:size-full before:bg-gradient-to-b before:from-transparent before:from-30% before:to-gray-900 before:to-80% first:shadow-shadowGray",
		isTouching ? "transition-[border,width]" : "transition-[transform,border,width]",
		swipeClass[swipeIndicator]
	)}
	style={`
		transform: ${transformValue};
	`}
>
	{#if recipe.images.length > 0}
		<img
			src={recipe.images[currentImage].image}
			class="transition-image absolute top-0 -z-50 h-4/5 w-full bg-gray-500 object-cover"
			alt=""
			style:--recipe={imageTransition}
		/>
	{/if}

	{#if recipe.images.length > 1}
		<div class="absolute z-50 flex cursor-default gap-sm p-4">
			{#each recipe.images as _, index}
				<button
					type="button"
					on:click={() => (currentImage = index)}
					class={twMerge(
						"focus h-4 rounded-full drop-shadow-lg transition-[width]",
						currentImage == index ? "w-16 bg-yellow" : "w-12 bg-white"
					)}
				/>
			{/each}
		</div>
	{/if}

	<div class="z-10 flex w-full flex-col gap-sm self-end p-lg">
		<Rating {recipe} />
		<h1 class="transition-name font-header text-xxl text-light" style:--recipe-name={headlineTransition}>
			{recipe.name}
		</h1>

		{#if recipe.categories.length > 0}
			<TagRow {recipe} isInDetail={false} />
		{/if}
		<DetailRow {recipe} />
	</div>

	<IconOverlay {swipeIndicator} />
</div>
