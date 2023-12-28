<script lang="ts">
	import { pan } from "svelte-gestures";
	import { onMount } from "svelte";

	import { Direction } from "$types/card.types";
	import Card from "$lib/components/Card.svelte";
	import { fetchRecipe, fetchRecipes } from "$lib/functions/db";

	let xStart = 0;
	let yStart = 0;

	let xCoord = 0;
	let yCoord = 0;

	let xDist = 0;
	let yDist = 0;

	let threshold = 150;
	let isTouching = false;

	let isLoading = false;
	let isError = false;
	let errorMessage = "";

	let swipeDirection: Direction = Direction.None;
	let transformValue = "translate(0px, 0px)";

	let initialRecipes = [3, 2, 1];
	let recipes = [];
	let currentRecipe = 1;

	const initRecipes = async () => {
		recipes = await fetchRecipes(initialRecipes);
		recipes.reverse();
	};

	onMount(() => {
		threshold = Math.min(window.innerWidth * 0.1, 150);

		initRecipes();

		window.addEventListener("resize", function () {
			threshold = Math.min(window.innerWidth * 0.1, 150);
		});
	});

	const handlePan = (event: CustomEvent<{ x: number; y: number; target: EventTarget }>) => {
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
	};

	const handlePanEnd = () => {
		isTouching = false;
		transformValue = getTransformValue(swipeDirection);
		xDist = 0;
		yDist = 0;

		//wait for animation to finish
		setTimeout(() => {
			if (swipeDirection == Direction.Left || swipeDirection == Direction.Right) provideNewRecipe();
		}, 300);
	};

	//transform value for card
	const getTransformValue = (direction: Direction) => {
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
	};

	const provideNewRecipe = async () => {
		isLoading = true;

		// remove last element
		recipes = recipes.slice(0, -1);
		transformValue = "translate(0px, 0px)";
		swipeDirection = Direction.None;

		// add new recipe
		await fetchRecipe(currentRecipe + recipes.length + 1)
			.then((recipe) => {
				isLoading = false;
				recipes = [recipe[0], ...recipes];
				handleError(false, "");
			})
			.catch((err) => {
				handleError(true, err);
			});
		currentRecipe++;
	};

	const handleError = (isError: boolean, errorMessage: string) => {
		if (isError) {
			isError = true;
			errorMessage = errorMessage;
		} else {
			isError = false;
			errorMessage = "";
		}
	};
</script>

<div class="relative flex h-full w-full">
	{#if isLoading}
		<div class="absolute flex h-40 w-40 items-center justify-center rounded-full bg-yellow">LOADING...</div>
	{/if}
	{#if isError}
		<div class="absolute flex h-40 w-40 items-center justify-center rounded-full bg-red">
			{errorMessage}
		</div>
	{/if}

	{#each recipes as recipe, i}
		<Card
			{recipe}
			swipeDirection={i === recipes.length - 1 ? swipeDirection : Direction.None}
			transformValue={i === recipes.length - 1 ? transformValue : "translate(0px, 0px)"}
			isTouching={i === recipes.length - 1 ? isTouching : false}
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
</div>
