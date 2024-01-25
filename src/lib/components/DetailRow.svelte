<script lang="ts">
	import type { Recipe } from "$types/database.types";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";
	import { twMerge } from "tailwind-merge";

	export let recipe: Recipe;
</script>

<div class={twMerge("pointer-events-none flex gap-md", $$props.class)}>
	<div class="flex select-none items-center gap-xs">
		<img alt="Clock" class="size-5" src={ClockIcon} />
		<p>{recipe.preperation_time} Min.</p>
	</div>
	<div class="flex select-none items-center gap-xs">
		<img alt="Difficulty" class="size-5" src={DifficultyIcon} />
		<p>{["Einfach", "Mittel", "Schwer"][recipe.difficulty]}</p>
	</div>
	<div class="flex select-none items-center gap-xs">
		{#each { length: recipe.cost } as _}
			<img alt="Euro" class="size-5" src={EuroIcon} />
		{/each}
	</div>
</div>
