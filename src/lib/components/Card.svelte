<script lang="ts">
	import { twMerge } from "tailwind-merge";

	import type { Recipe } from "../../database.types";
	import TestImg from "$lib/assets/img/test-img.jpg";
	import Tag from "$lib/components/Tag.svelte";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";
	import H1 from "$lib/components/H1.svelte";
	import {direction} from "$lib/functions/helper";

	export let recipe: Recipe;
	export let transformValue = "";
	export let touchStarted = false;
	$: animClass = !touchStarted ? 'transition-transform-slow' : 'transition-transform-instant'
	export let swipeDirection = direction.none;
	$: swipeClass = swipeDirection === direction.none ? 'bg-gray-900 border-gray-900 shadow-shadowGray' : swipeDirection === direction.right ? 'border-yellow bg-yellow shadow-shadowYellow' : ' border-red bg-red shadow-shadowRed'

</script>


<style>
	.transition-transform-slow {
		transition: all 300ms, transform 250ms;
	}
	.transition-transform-instant {
		transition: all 300ms, transform 0s;
	}
</style>

<div
	class={twMerge("relative flex overflow-hidden rounded-xl bg-cover bg-center border-2 z-10 " + animClass + " " + swipeClass, $$props.class)}
	style={`background-image: url(${TestImg}); transform: ${transformValue}`}
>
	<div class="z-10 flex flex-col gap-sm self-end p-lg">
		<H1>{recipe.name}</H1>

		<div class="flex gap-sm">
			{#each recipe.categories as category}
				<Tag text={category.name} color="yellow" class="select-none"/>
			{/each}
			{#each recipe.types as type}
				<Tag text={type.name} color="yellow" class="select-none"/>
			{/each}
		</div>

		<div class="flex gap-md pointer-events-none">
			<div class="flex gap-xs select-none">
				<img alt="Clock" class="h-5 w-5" src={ClockIcon} />
				<p>{recipe.preperation_time} Min.</p>
			</div>
			<div class="flex gap-xs select-none">
				<img alt="Difficulty" class="h-5 w-5" src={DifficultyIcon} />
				<p>{["Einfach", "Mittel", "Schwer"][recipe.difficulty]}</p>
			</div>
			<div class="flex gap-xs select-none">
				{#each { length: recipe.cost } as _}
					<img alt="Euro" class="h-5 w-5" src={EuroIcon} />
				{/each}
			</div>
		</div>
	</div>
	<div class="absolute h-full w-full bg-gradient-to-b from-transparent from-50% to-gray-900"></div>
</div>
