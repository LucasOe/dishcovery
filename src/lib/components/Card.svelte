<script lang="ts">
	import type { Tables } from "../../database.types";
	import TestImg from "$lib/assets/img/test-img.jpg";
	import Tag from "$lib/components/Tag.svelte";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";

	export let recipe: Tables<"recipes">;
</script>

<div
	class="relative flex w-full grow items-end overflow-hidden rounded-xl bg-gray-900 bg-cover bg-center shadow-shadow"
	style={`background-image: url(${TestImg})`}
>
	<div id="card-stack" class="z-10">
		<div class="z-10 flex flex-col gap-sm p-lg">
			<h1 class="font-header text-fs-header text-light">{recipe.name}</h1>

			<div class="flex flex-row gap-sm">
				<Tag text="schnell" />
				<Tag text="toll" />
				<Tag text="lecker" />
			</div>

			<div class="flex flex-row gap-md">
				<div class="flex flex-row gap-xs">
					<img alt="Clock" class="h-5 w-5" src={ClockIcon} />
					<p>{recipe.duration} Min.</p>
				</div>
				<div class="flex flex-row gap-xs">
					<img alt="Difficulty" class="h-5 w-5" src={DifficultyIcon} />
					<p>{recipe.difficulty}</p>
				</div>
				<div class="flex flex-row gap-xs">
					{#each { length: recipe.price?.length || 0 } as _}
						<img alt="Euro" class="h-5 w-5" src={EuroIcon} />
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- linear gradient fade for info content -->
	<div class="absolute h-full w-full bg-gradient-to-b from-transparent from-50% to-gray-900" />
</div>
