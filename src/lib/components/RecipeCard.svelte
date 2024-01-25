<script lang="ts">
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";
	import MoreIcon from "$lib/assets/icons/more.svg";

	import RoundButton from "$lib/components/RoundButton.svelte";
	import type { Recipe } from "$types/database.types";
	import { goto } from "$app/navigation";

	export let recipe: Recipe;
</script>

<a
	href={"/recipe/" + recipe.id}
	class="flex w-full flex-row items-center justify-between rounded-lg bg-gray-500 p-md drop-shadow-xl"
>
	<div class="flex flex-row items-center justify-start gap-md">
		<img src={recipe.images[0].image} class="aspect-square h-20" alt="" />
		<div class="flex flex-col gap-xs">
			<div class="text-lg font-semibold text-yellow">{recipe.name}</div>
			<div class="flex flex-row gap-sm">
				<div class="flex flex-row gap-xs">
					<img alt="Clock" class="size-5" src={ClockIcon} />
					<p>{recipe.preperation_time} Min.</p>
				</div>
				<div class="flex flex-row gap-xs">
					{#each Array(Math.floor(recipe.difficulty)) as _}
						<img alt="Difficulty" class="size-5" src={DifficultyIcon} />
					{/each}
					<p>{recipe.difficulty}</p>
				</div>
				<div class="flex flex-row gap-xs">
					{#each Array(Math.floor(recipe.cost)) as _}
						<img alt="Euro" class="size-5" src={EuroIcon} />
					{/each}
				</div>
			</div>
		</div>
	</div>
	<RoundButton src={MoreIcon} alt="More" action={() => goto("/")} size="sm" class="bg-gray-900 shadow-none" />
</a>
