<script lang="js">
	// @ts-nocheck

	import { pan } from "svelte-gestures";
	import { direction } from "$lib/functions/helper";
	import Card from "$lib/components/Card.svelte";
	import { fetchRecipes } from "$lib/functions/db";

	let cardW = 0;
	let cardH = 0;

	let xStart = 0;
	let yStart = 0;

	let xCoord = 0;
	let yCoord = 0;

	let threshhold = 150;
	let touchStarted = false;

	let swipeDirection = direction.none;

	let transformValue = `translate(0px, 0px)`;
	let scale;
	let rotation;

	function handlePan(event) {
		xCoord = event.detail.x;
		yCoord = event.detail.y;

		if (!touchStarted) {
			xStart = xCoord;
			yStart = yCoord;
			touchStarted = true;
		}

		scale = 1 + Math.abs((xCoord - xStart) / (cardW * 15));
		rotation = (xCoord - xStart) / 30 + "deg";
		transformValue = `translate(${xCoord - xStart}px, ${yCoord - yStart}px) rotate(${rotation}) scale(${scale})`;

		if (xCoord - xStart > threshhold) {
			swipeDirection = direction.right;
		} else if (xCoord - xStart < -threshhold) {
			swipeDirection = direction.left;
		} else if (yCoord - yStart < -threshhold) {
			swipeDirection = direction.up;
		} else {
			swipeDirection = direction.none;
		}
	}

	function handlePanEnd() {
		touchStarted = false;

		if (swipeDirection === direction.none) {
			transformValue = `translate(0px, 0px)`;
			xCoord = 0;
			yCoord = 0;
		} else if (swipeDirection === direction.left) {
			transformValue = `translate(-120vw, 0px) rotate(-50deg)`;
		} else if (swipeDirection === direction.right) {
			transformValue = `translate(120vw, 0px) rotate(50deg)`;
		} else {
			transformValue = `translate(0vw, -100vh) rotate(0deg)`;
		}
	}
</script>

<button
	class="relative flex h-full"
	use:pan={{ delay: 0 }}
	on:pan={handlePan}
	on:mouseup={handlePanEnd}
	on:touchend={handlePanEnd}
	bind:offsetHeight={cardH}
	bind:offsetWidth={cardW}
>
	{#await fetchRecipes()}
		<p class=" relative flex w-full items-center justify-center">Loading...</p>
	{:then recipes}
		<Card recipe={recipes[1]} class="absolute h-full w-full flex-auto" />
		<Card
			recipe={recipes[0]}
			class="absolute h-full w-full flex-auto"
			{transformValue}
			{touchStarted}
			{swipeDirection}
		/>
	{:catch error}
		<p>Something went wrong: {error}</p>
	{/await}
</button>
