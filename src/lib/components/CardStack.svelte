<script lang="ts">
	import { pan } from "svelte-gestures";
	import { onMount } from "svelte";

	import { Direction } from "$types/card.types";
	import Card from "$lib/components/Card.svelte";
	import { fetchRecipes } from "$lib/functions/db";

	let xStart = 0;
	let yStart = 0;

	let xCoord = 0;
	let yCoord = 0;

	let threshold = 150;
	let isTouching = false;

	let swipeDirection: Direction = Direction.None;
	let transformValue = "translate(0px, 0px)";

	let cards = [{Card, id: 2}, {Card, id: 1}, {Card, id: 0}];
	let currentRecipe = 0;

	onMount(() => {
		threshold = Math.min(window.innerWidth * 0.1, 150);

		window.addEventListener("resize", function () {
			threshold = Math.min(window.innerWidth * 0.1, 150);
		});
	});

	function handlePan(event: CustomEvent<{ x: number; y: number; target: EventTarget }>) {
		xCoord = event.detail.x;
		yCoord = event.detail.y;

		if (!isTouching) {
			xStart = xCoord;
			yStart = yCoord;
			isTouching = true;
		}

		let rotation = (xCoord - xStart) / 30;
		transformValue = `translate(${xCoord - xStart}px, ${yCoord - yStart}px) rotate(${rotation}deg)`;

		swipeDirection = (() => {
			if (xCoord - xStart > +threshold) return Direction.Right;
			if (xCoord - xStart < -threshold) return Direction.Left;
			if (yCoord - yStart < -threshold) return Direction.Up;
			return Direction.None;
		})();
	}

	function addCard() {
		setTimeout(function() {
			currentRecipe++;
			cards.pop();
			setTimeout(function() {
				transformValue = "translate(0px, 0px)";
				cards = [{Card, id: currentRecipe + 2}, ...cards];
			}, 1);
			swipeDirection = Direction.None;
		}, 300);
	}

	function handlePanEnd() {
		isTouching = false;
		switch (swipeDirection) {
			case Direction.Left:
				transformValue =  "translate(-200vw, 0px) rotate(-50deg)";
				addCard();
				return;
			case Direction.Right:
				transformValue = "translate(200vw, 0px) rotate(50deg)";
				addCard();
				return;
			case Direction.Up:
				transformValue = "translate(0vw, -100vh) rotate(0deg)";
				return;
			default:
				transformValue = "translate(0px, 0px)";
				return;
		}
	}
</script>

<div class="relative flex h-full w-full">
	{#await fetchRecipes()}
		<p class="relative flex w-full items-center justify-center">Loading...</p>
	{:then recipes}
		{#each cards as item, i}
			<svelte:component this={Card} key={i} recipe={recipes[item.id]}
							  swipeDirection="{i === cards.length-1 ? swipeDirection : Direction.None}"
							  transformValue={i === cards.length-1 ? transformValue : ""}
							  {isTouching}
							  class={"absolute h-full w-full"}/>
		{/each}
	{:catch error}
		<p>Something went wrong: {error}</p>
	{/await}

	<button
		class="z-[99] h-full w-full after:w-[100dvh] active:fixed active:left-0 active:top-0 active:h-[100dvh]"
		use:pan={{ delay: 0 }}
		on:pan={handlePan}
		on:mouseup={handlePanEnd}
		on:touchend={handlePanEnd}
		on:touchcancel={handlePanEnd}>
	</button>
</div>
