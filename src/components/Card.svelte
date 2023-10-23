<script>
	import TestImg from '../assets/img/test-img.jpg';
	import Tag from './Tag.svelte';
	import ClockIcon from '../assets/icons/clock.svg';
	import DifficultyIcon from '../assets/icons/difficulty.svg';
	import EuroIcon from '../assets/icons/euro.svg';
	import H1 from './H1.svelte';

	let recipeTime = 5;
	let difficulty = 'einfach';
</script>

<div
	class="relative w-full bg-gray-900 rounded-xl shadow-shadow overflow-hidden items-end flex grow bg-cover bg-center"
	style={`background-image: url(${TestImg})`}
>
	<div id="card-stack">
		<!-- Card Infos -->
		<div class="flex flex-col z-10 p-lg gap-sm">
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

	<!-- linear gradient fade for info content -->
	<div class="bg-gradient-to-b from-transparent from-50% to-gray-900 absolute w-full h-full" />
</div>
