<script lang="ts">
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import EuroIcon from "$lib/assets/icons/euro.svg";
	import MoreIcon from "$lib/assets/icons/more.svg";

	import RoundButton from "$lib/components/RoundButton.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";

	let recipeTime: number = 5;
	let difficulty: string = "einfach";
</script>

<FadeIn>
<div class="space-y-4">
	<a href={"/"} class="flex w-full flex-row items-center justify-between rounded-lg bg-gray-500 p-md drop-shadow-xl">
		<!-- Left side -->
		<div class="flex flex-row items-center justify-start gap-md">
			<img src={EuroIcon} class="aspect-square h-20" alt="" />
			<div class="flex flex-col gap-xs">
				<div class="text-lg font-semibold text-yellow">Rezeptname</div>
				<div class="flex flex-row gap-sm">
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

		<RoundButton src={MoreIcon} alt="More" link={"/"} size="sm" class="bg-gray-900 shadow-none" />
	</a>
</div>
</FadeIn>
