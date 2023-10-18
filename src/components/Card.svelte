<script>
	import TestImg from '../assets/img/test-img.jpg';
	import Tag from './Tag.svelte';
	import ClockIcon from '../assets/icons/clock.svg';
	import DifficultyIcon from '../assets/icons/difficulty.svg';
	import EuroIcon from '../assets/icons/euro.svg';
	import H1 from './H1.svelte';
	import Swing, { Direction } from 'swing';

	const TestImgSrc = TestImg;

	let recipeTime = 5;
	let difficulty = 'einfach';

	// Prepare the cards in the stack for iteration.
	const cards = [].slice.call(document.getElementById('card-stack').childNodes);

	// An instance of the Stack is used to attach event listeners.
	const stack = Swing.Stack();

	cards.forEach((targetElement) => {
		// Add card element to the Stack.
		stack.createCard(targetElement);
	});

	// Add event listener for when a card is thrown out of the stack.
	stack.on('throwout', (event) => {
		// e.target Reference to the element that has been thrown out of the stack.
		// e.throwDirection Direction in which the element has been thrown (Direction.LEFT, Direction.RIGHT).

		console.log('Card has been thrown out of the stack.');
		console.log('Throw direction: ' + (event.throwDirection == Direction.LEFT ? 'left' : 'right'));
	});

	// Add event listener for when a card is thrown in the stack, including the spring back into place effect.
	stack.on('throwin', () => {
		console.log('Card has snapped back to the stack.');
	});
</script>

<div
	class="card relative w-full bg-gray-900 rounded-xl shadow-shadow overflow-hidden flex items-end"
	style="background-image: url({TestImgSrc}); background-size: cover; background-position: center; background-repeat: no-repeat, repeat;"
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
	<div class="fade absolute w-full h-full top-0 left-0 z-0" />
</div>

<style>
	/* heights are weird, i wanna fill to content but it wont let me, pls help */
	.card {
		min-height: 550px;
	}

	.fade {
		background: linear-gradient(
			180deg,
			rgba(66, 66, 66, 0) 50%,
			rgba(43, 42, 42, 0.88) 65%,
			rgba(43, 42, 42, 0.95) 75%,
			#212121 85%,
			#212121 100%
		);
	}
</style>
