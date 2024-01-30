<script lang="ts">
	import type { Recipe } from "$types/database.types";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";
	import { twMerge } from "tailwind-merge";

	export let recipe: Recipe;
</script>

<div class={twMerge("pointer-events-none flex h-8 select-none items-center gap-sm", $$props.class)}>
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
