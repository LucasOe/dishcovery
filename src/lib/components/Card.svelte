<script lang="ts">
	import { twMerge } from "tailwind-merge";

	import type { Recipe } from "../../database.types";
	import TestImg from "$lib/assets/img/test-img.jpg";
	import Tag from "$lib/components/Tag.svelte";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";

	export let recipe: Recipe;
</script>

<div
	class={twMerge("relative flex overflow-hidden rounded-xl bg-cover bg-center", $$props.class)}
	style={`background-image: url(${TestImg})`}
>
	<div class="z-10 flex flex-col gap-sm self-end p-lg">
		<h1 class="font-header text-xxl text-light">{recipe.name}</h1>

		<div class="flex gap-sm">
			{#each recipe.categories as category}
				<Tag text={category.name} color="yellow" />
			{/each}
			{#each recipe.types as type}
				<Tag text={type.name} color="yellow" />
			{/each}
		</div>

		<div class="flex gap-md">
			<div class="flex gap-xs">
				<img alt="Clock" class="h-5 w-5" src={ClockIcon} />
				<p>{recipe.preperation_time} Min.</p>
			</div>
			<div class="flex gap-xs">
				<img alt="Difficulty" class="h-5 w-5" src={DifficultyIcon} />
				<p>{["Einfach", "Mittel", "Schwer"][recipe.difficulty]}</p>
			</div>
			<div class="flex gap-xs">
				{#each { length: recipe.cost } as _}
					<img alt="Euro" class="h-5 w-5" src={EuroIcon} />
				{/each}
			</div>
		</div>
	</div>
</div>
