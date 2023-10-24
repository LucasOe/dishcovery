<script>
	import ClockIcon from '$lib/assets/icons/clock.svg';
	import DifficultyIcon from '$lib/assets/icons/difficulty.svg';
	import EuroIcon from '$lib/assets/icons/euro.svg';
	import MoreIcon from '$lib/assets/icons/more.svg';

	import PageTopBar from '$lib/components/PageTopBar.svelte';
	import RoundBtn from '$lib/components/RoundBtn.svelte';

	let recipeTime = 5;
	let difficulty = 'einfach';
</script>

<svelte:head>
	<title>Kochbuch</title>
	<meta name="description" content="Kochbuch" />
</svelte:head>

<div class="space-y-4">
	<PageTopBar header="Kochbuch" />

	<!-- Search bar and filter -->

	<!-- Filter Tabs -->

	<!-- if statement falls was in der db is, probs some kinda map function -->
	<a
		href={'/'}
		class="w-full bg-gray-500 p-md rounded-lg flex flex-row items-center justify-between drop-shadow-xl"
	>
		<!-- Left side -->
		<div class="flex flex-row items-center justify-start gap-md">
			<img src={EuroIcon} class="aspect-square h-20" alt="" />
			<div class="flex flex-col gap-xs">
				<div class="font-semibold text-yellow text-lg">Rezeptname</div>
				<!-- infos (time, difficulty, price), needs to be dynamic as well lul -->
				<div class="flex flex-row gap-sm">
					<div class="flex flex-row gap-xs">
						<img alt="Clock" class="w-5 h-5" src={ClockIcon} />
						<p>{recipeTime} Min.</p>
					</div>
					<div class="flex flex-row gap-xs">
						<img alt="Difficulty" class="w-5 h-5" src={DifficultyIcon} />
						<p>{difficulty}</p>
					</div>
					<div class="flex flex-row gap-xs">
						<img alt="Euro" class="w-5 h-5" src={EuroIcon} />
						<img alt="Euro" class="w-5 h-5" src={EuroIcon} />
					</div>
				</div>
			</div>
		</div>

		<!-- Right side side -->
		<RoundBtn
			src={MoreIcon}
			alt="More"
			link={''}
			padding={0.5}
			icWidth={2}
			additionalClasses="bg-gray-900 shadow-none"
		/>
	</a>
</div>
