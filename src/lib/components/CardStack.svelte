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

	let xDist = 0;
	let yDist = 0;

	let threshold = 150;
	let isTouching = false;

	let swipeDirection: Direction = Direction.None;
	let transformValue = "translate(0px, 0px)";

	let recipeIds = [0, 1, 2];
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

		xDist = xCoord - xStart;
		yDist = yCoord - yStart;

		let rotation = xDist / 30;
		transformValue = `translate(${xDist}px, ${yDist}px) rotate(${rotation}deg)`;

		swipeDirection = (() => {
			if (xDist > +threshold) return Direction.Right;
			if (xDist < -threshold) return Direction.Left;
			if (yDist < -threshold) return Direction.Up;
			return Direction.None;
		})();
	}

	function handlePanEnd() {
		isTouching = false;
		transformValue = getTransformValue(swipeDirection);
		xDist = 0;
		yDist = 0;

		setTimeout(() => {
		if (swipeDirection == Direction.Left || swipeDirection == Direction.Right) provideNewCards();
		}, 300);
	}

	function getTransformValue(direction: Direction) {
		switch (direction) {
			case Direction.Left:
				return "translate(-200vw, 0px) rotate(-50deg)";
			case Direction.Right:
				return "translate(200vw, 0px) rotate(50deg)";
			case Direction.Up:
				return "translate(0vw, -100vh) rotate(0deg)";
			default:
				return "translate(0px, 0px)";
		}
	}

	function provideNewCards() {
		transformValue = "translate(0px, 0px)";
			currentRecipe++;
			recipeIds.pop();

			recipeIds = [currentRecipe + recipeIds.length, ...recipeIds];

			swipeDirection = Direction.None;
	}
</script>

<div class="relative flex h-full w-full">
	{#await fetchRecipes()}
		<p class="relative flex w-full items-center justify-center">Loading...</p>
	{:then recipes}
		{#each recipeIds as id, i (id)}
			<Card
				recipe={recipes[id % recipes.length]}
				swipeDirection={i === recipeIds.length - 1 ? swipeDirection : Direction.None}
				transformValue={i === recipeIds.length - 1 ? transformValue : "translate(0px, 0px)"}
				isTouching={i === recipeIds.length - 1 ? isTouching : false}
				class={"absolute h-full w-full "}
			/>
		{/each}

		<button
			class="z-[99] h-full w-full after:w-[100dvh] active:fixed active:left-0 active:top-0 active:h-[100dvh]"
			use:pan={{ delay: 0 }}
			on:pan={handlePan}
			on:mouseup={handlePanEnd}
			on:touchend={handlePanEnd}
			on:touchcancel={handlePanEnd}
		>
		</button>
	{:catch error}
		<p>Something went wrong: {error}</p>
	{/await}
</div>
