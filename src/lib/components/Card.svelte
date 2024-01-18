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

	export let recipe: Recipe;
	export let isLast = false;
	export let isFirst = false;
	export let isTouching = false;
	export let transformValue = "translate(0px, 0px)";
	export let swipeVisual: Direction = Direction.None;

	// prettier-ignore
	const swipeClass: Record<Direction, string> = {
		[Direction.None]:  "",
		[Direction.Left]:  "border-red shadow-shadowRed",
		[Direction.Right]: "border-yellow shadow-shadowYellow",
		[Direction.Up]:    "border-light shadow-shadowLight w-[110%]",
		[Direction.Down]:  "",
	};
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
		<h1 class="font-header text-xxl text-light transition-name" style:--recipe-name="name-{recipe.id}">{recipe.name}</h1>

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

	<img
		src={recipe.images[0].image}
		class="transition-image absolute top-0 z-[-1] h-full max-w-[200%] object-cover"
		alt=""
		style:--recipe="image-{recipe.id}"
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
		></div>
	</div>
</div>

<style>
	
	.transition-transform-slow {
		transition:
			translate 300ms,
			transform 500ms,
			width 300ms,
			border 500ms;
	}
	.transition-transform-instant {
		transition:
			translate 300ms,
			transform 0s,
			width 500ms,
			border 500ms;
	}
</style>
