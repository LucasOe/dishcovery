<script>
	import H1 from '../../components/H1.svelte';
	import CloseIcon from '../../assets/icons/cancel.svg';
	import ClockIcon from '../assets/icons/clock.svg';
	import DifficultyIcon from '../assets/icons/difficulty.svg';
	import EuroIcon from '../assets/icons/euro.svg';

	let recipeTime = 5;
	let difficulty = 'einfach';
</script>

<svelte:head>
	<title>Kochbuch</title>
	<meta name="description" content="Kochbuch" />
</svelte:head>

<div class="space-y-4">
	<div class="flex justify-between">
		<H1 text="Kochbuch" />
		<a href={'/'}><img alt="Close" class="w-10 h-10 drop-shadow-md" src={CloseIcon} /></a>
	</div>

	<!-- Search bar and filter -->

	<!-- Filter Tabs -->

	<!-- if statement falls was in der db is -->
	<div class="w-full bg-gray-500 p-md rounded-lg flex flex-row items-center justify-between">
		<img src={CloseIcon} class="aspect-square h-20" alt="" />
		<div class="flex flex-col gap-sm">
			<div class="font-semibold">Rezeptname</div>
			<!-- infos (time, difficulty, price), needs to be dynamic as well lul -->
			<div class="flex flex-row gap-md">
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
</div>
