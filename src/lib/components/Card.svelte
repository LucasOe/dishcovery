<script lang="ts">
	import { twMerge } from "tailwind-merge";

	import type { Recipe } from "$types/database.types";
	import { Direction } from "$types/card.types";
	import DetailRow from "./DetailRow.svelte";
	import TagRow from "./TagRow.svelte";
	import Rating from "$lib/components/Rating.svelte";
	import IconOverlay from "./IconOverlay.svelte";
	import LazyLoadingImage from "$lib/components/LazyLoadingImage.svelte";

	export let recipe: Recipe;
	export let isTouching = false;
	export let transformValue = "translate(0px, 0px)";
	export let swipeIndicator: Direction = Direction.None;

	let currentImage: number = 0;

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
		"absolute flex size-full flex-col justify-center overflow-hidden rounded-xl border-2 border-gray-900 duration-500 will-change-transform before:absolute before:size-full before:bg-gradient-to-b before:from-transparent before:from-30% before:to-gray-900 before:to-80% first:shadow-shadowGray",
		isTouching ? "transition-[border,width]" : "transition-[transform,border,width]",
		swipeClass[swipeIndicator]
	)}
	style={`
		transform: ${transformValue};
	`}
>
	{#if recipe.images.length > 0}
		<div class="relative size-full">
			{#if recipe.images.length > 1 && !isTouching}
				<div class="absolute left-0 top-0 flex size-full flex-row">
					<button
						type="button"
						on:click={() => {
							currentImage = (currentImage - 1 + recipe.images.length) % recipe.images.length;
						}}
						class="relative size-full bg-transparent"
					></button>
					<button
						type="button"
						on:click={() => {
							currentImage = (currentImage + 1) % recipe.images.length;
						}}
						class="relative size-full bg-transparent"
					></button>
				</div>
			{/if}
		</div>
	{/if}

	{#each recipe.images as src, index}
		<div
			class={twMerge(
				"absolute top-0 z-[-50] h-4/5 w-full object-cover duration-150",
				index === currentImage ? "opacity-100" : "opacity-0"
			)}
		>
			<LazyLoadingImage src={src.image} />
		</div>
	{/each}

	{#if recipe.images.length > 1}
		<div class="absolute left-[50%] top-0 z-50 flex translate-x-[-50%] cursor-default gap-sm p-4">
			{#each recipe.images as _, index}
				<button
					type="button"
					on:click={() => (currentImage = index)}
					class={twMerge(
						"focus h-2 rounded-full drop-shadow-lg transition-[width]",
						currentImage === index ? "w-16 bg-yellow" : "w-12 bg-white"
					)}
				></button>
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
		<DetailRow {recipe} showHearts={true} />
	</div>

	<IconOverlay {swipeIndicator} />
</div>
