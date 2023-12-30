<script lang="ts">
	import { pan } from "svelte-gestures";
	import { onMount } from "svelte";

	import { Direction } from "$types/card.types";
	import Card from "$lib/components/Card.svelte";
	import { fetchRecipe, fetchRecipes } from "$lib/functions/db";
	import type { Recipe } from "$types/database.types";

	import { goto } from '$app/navigation';

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

	

    function handleSwipeCompletion() {
        if (swipeDirection === Direction.Up) { 
            goto('/detail'); 
        }
    }

	const handlePanEnd = () => {
		isTouching = false;
		transformValue = getTransformValue(swipeDirection);
		xDist = 0;
		yDist = 0;

		//wait for animation to finish
		if (swipeDirection == Direction.Left || swipeDirection == Direction.Right) provideNewRecipe();

		handleSwipeCompletion();
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
		// add new recipe
		isLoading = true;
		const newRecipe = await fetchRecipe(currentRecipe + recipes.length + 1)
			.then((recipe) => {
				isLoading = false;
				return recipe;
			})
			.catch((err) => {
				handleError(true, err);
			});

		swipeDirection = Direction.None;

		// wait for animation to finish
		setTimeout(() => {
			recipes = [newRecipe[0], ...recipes.slice(0, -1)];
			transformValue = "translate(0px, 0px)";
			currentRecipe++;
		}, 300);
	};

	const handleError = (error: boolean, message: string) => {
		if (error) {
			isError = true;
			errorMessage = message;
		} else {
			isError = false;
			errorMessage = "";
		}
	};

</script>

<div class="size-full relative flex">
	{#if isLoading}
		<div class="size-40 absolute flex items-center justify-center rounded-full bg-yellow">LOADING...</div>
	{/if}
	{#if isError}
		<div class="size-40 absolute flex items-center justify-center rounded-full bg-red">
			{errorMessage}
		</div>
	{/if}
	{#key recipes}
		{#each recipes as recipe, i}
			<Card
				{recipe}
				isLast={i === recipes.length - 1}
				isFirst={i === 0}
				{swipeDirection}
				{transformValue}
				{isTouching}
				class={"size-full absolute "}
			/>
		{/each}
	{/key}
	<button
		class="size-full active:h-dvh after:w-dvh z-[99] active:fixed active:left-0 active:top-0"
		use:pan={{ delay: 0 }}
		on:pan={handlePan}
		on:mouseup={handlePanEnd}
		on:touchend={handlePanEnd}
		on:touchcancel={handlePanEnd}
	>
	</button>
</div>
