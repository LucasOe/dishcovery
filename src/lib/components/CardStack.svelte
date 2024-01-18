<script lang="ts">
	import { pan } from "svelte-gestures";
	import { onMount } from "svelte";

	import { Direction } from "$types/card.types";
	import Card from "$lib/components/Card.svelte";
	import type { Recipe } from "$types/database.types";

	import { goto } from "$app/navigation";
	import { selectedRecipe, swipeDirection } from "$lib/functions/stores";
	import Spinner from "$lib/components/Spinner.svelte";
	import { fetchRecipe, fetchRecipes } from "$lib/functions/database/recipes";

	let swipeVisual: Direction = Direction.None;

	swipeDirection.subscribe(async (value) => {
		swipeVisual = value;
		switch (value) {
			case Direction.Left:
			case Direction.Right:
				transformValue = getTransformValue();
				await handleCardChoice();
				break;
			case Direction.Up:
				transformValue = getTransformValue();
				showDetailPage();
				break;
			default:
				break;
		}
	});

	let xStart = 0;
	let yStart = 0;

	let xCoord = 0;
	let yCoord = 0;

	let xDist = 0;
	let yDist = 0;
	let rotation = 0;

	let threshold = 150;
	let isTouching = false;

	let isAnimationOver = true;
	let isLoading = false;
	let isError = false;
	let errorMessage = "";

	let transformValue = "translate(0px, 0px)";

	let initialRecipes = [3, 2, 1];
	let recipes: Recipe[] = [];
	let currentRecipe = 1;

	const initRecipes = async () => {
		recipes = await fetchRecipes(initialRecipes);
		recipes.reverse();
		selectedRecipe.set(recipes.slice(-1)[0]);
	};

	onMount(() => {
		threshold = Math.min(window.innerWidth * 0.1, 150);

		initRecipes();

		window.addEventListener("resize", function () {
			threshold = Math.min(window.innerWidth * 0.1, 150);
		});
	});

	const handlePan = (event: CustomEvent<{ x: number; y: number; target: EventTarget }>) => {
		if (isAnimationOver) {
			xCoord = event.detail.x;
			yCoord = event.detail.y;

			if (!isTouching) {
				xStart = xCoord;
				yStart = yCoord;
				isTouching = true;
			}

			xDist = xCoord - xStart;
			yDist = yCoord - yStart;

			rotation = xDist / 30;
			transformValue = `translate(${xDist}px, ${yDist}px) rotate(${rotation}deg)`;

			swipeVisual = direction(xDist, yDist, threshold);
		}
	};

	function direction(xDist: number, yDist: number, threshold: number) {
		if (xDist > +threshold) return Direction.Right;
		if (xDist < -threshold) return Direction.Left;
		if (yDist < -threshold) return Direction.Up;
		return Direction.None;
	}

	const handlePanEnd = () => {
		isTouching = false;
		transformValue = getTransformValue();
		xDist = 0;
		yDist = 0;
		swipeDirection.set(swipeVisual);
	};

	//transform value for card
	const getTransformValue = () => {
		switch (swipeVisual) {
			case Direction.Left:
				return "translate(-200vw, 0px) rotate(-50deg)";
			case Direction.Right:
				return "translate(200vw, 0px) rotate(50deg)";
			case Direction.Up:
				return `translate(${xDist}px, -40vh) rotate(${rotation}deg)`;
			default:
				return "translate(0px, 0px)";
		}
	};

	const showDetailPage = () => {
		goto("recipe/" + currentRecipe);
	};

	const handleCardChoice = async () => {
		isAnimationOver = false;

		// wait for animation to finish
		setTimeout(() => {
			recipes = [...recipes.slice(0, -1)];
			swipeVisual = Direction.None;
			swipeDirection.set(swipeVisual);
			transformValue = "translate(0px, 0px)";
			currentRecipe++;
			isAnimationOver = true;
			selectedRecipe.set(recipes.slice(-1)[0]);
		}, 300);

		isLoading = true;

		// add new recipe
		await fetchRecipe(currentRecipe + initialRecipes.length)
			.then((recipe) => {
				isLoading = false;
				addRecipeToStack(isAnimationOver, recipe);
			})
			.catch((err) => {
				handleError(true, err);
			});
	};

	const addRecipeToStack = (isAnimationOver: boolean, recipe: Recipe) => {
		if (isAnimationOver) {
			recipes = [recipe, ...recipes];
		} else {
			setTimeout(() => {
				recipes = [recipe, ...recipes];
			}, 300);
		}
	};

	const handleError = (error: boolean, message: string) => {
		if (error) {
			isError = true;
			isLoading = false;
			setErrorMessage(message);
		} else {
			isError = false;
			errorMessage = "";
		}
	};

	const setErrorMessage = (message: string) => {
		errorMessage = message == null ? "Es gibt keine weiteren Rezepte mehr." : message;
	};
</script>

<div class="relative flex size-full items-center justify-center">
	{#if isLoading}
		<div class="absolute flex size-40 items-center justify-center rounded-full">
			<Spinner />
		</div>
	{/if}
	{#if isError}
		<div class="absolute flex size-40 items-center justify-center rounded-full bg-red text-center">
			{errorMessage}
		</div>
	{/if}
	{#key recipes}
		{#each recipes as recipe, i}
			<Card {recipe} isLast={i === recipes.length - 1} isFirst={i === 0} {transformValue} {isTouching} {swipeVisual} />
		{/each}
	{/key}
	<button
		class="after:w-dvh z-[99] size-full active:fixed active:left-0 active:top-0 active:h-dvh"
		use:pan={{ delay: 0 }}
		on:pan={handlePan}
		on:mouseup={handlePanEnd}
		on:touchend={handlePanEnd}
		on:touchcancel={handlePanEnd}
	>
	</button>
</div>
