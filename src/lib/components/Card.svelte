<script lang="ts">
	import TestImg from "$lib/assets/img/test-img.jpg";
	import Tag from "$lib/components/Tag.svelte";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";
	import H1 from "$lib/components/H1.svelte";

	let recipeTime: number = 5;
	let difficulty: string = "einfach";
</script>

<div
	class="relative flex w-full grow items-end overflow-hidden rounded-xl bg-gray-900 bg-cover bg-center shadow-shadow"
	style={`background-image: url(${TestImg})`}
>
	<div id="card-stack" class="z-10">
		<!-- Card Infos -->
		<div class="z-10 flex flex-col gap-sm p-lg">
			<!-- stars -->

			<!-- header -->
			<H1 text="Recipe Name" />

			<!-- tags, this is shitty, should be dynamic somehow with the super duper base -->
			<div class="flex flex-row gap-sm">
				<Tag>schnell</Tag>
				<Tag>toll</Tag>
				<Tag>lecker</Tag>
			</div>

			<!-- infos (time, difficulty, price), needs to be dynamic as well lul -->
			<div class="flex flex-row gap-md">
				<div class="flex flex-row gap-xs">
					<img alt="Clock" class="h-5 w-5" src={ClockIcon} />
					<p>{recipeTime} Min.</p>
				</div>
				<div class="flex flex-row gap-xs">
					<img alt="Difficulty" class="h-5 w-5" src={DifficultyIcon} />
					<p>{difficulty}</p>
				</div>
				<div class="flex flex-row gap-xs">
					<img alt="Euro" class="h-5 w-5" src={EuroIcon} />
					<img alt="Euro" class="h-5 w-5" src={EuroIcon} />
				</div>
			</div>
		</div>
	</div>

	<!-- linear gradient fade for info content -->
	<div class="absolute h-full w-full bg-gradient-to-b from-transparent from-50% to-gray-900" />
</div>
