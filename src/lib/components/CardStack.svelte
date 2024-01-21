<script lang="ts">
	import { pan } from "svelte-gestures";
	import { onDestroy, onMount } from "svelte";
	import { goto } from "$app/navigation";

	import { selectedRecipe, swipeDirection } from "$lib/functions/stores";
	import { fetchRecipe, fetchRecipes } from "$lib/functions/database/recipes";
	import type { Recipe } from "$types/database.types";
	import { Direction } from "$types/card.types";
	import Card from "$lib/components/Card.svelte";
	import Spinner from "$lib/components/Spinner.svelte";
	import { direction, getTransformValue } from "$lib/functions/cardStack";


	let container: HTMLDivElement;
	let cardInstances: Card[] = [];
	let initialRecipes = [3, 2, 1];
	let recipes: Recipe[] = [];
	let currentRecipe = 1;
	let swipeVisual: Direction = Direction.None;

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

	const initRecipes = async () => {
		recipes = await fetchRecipes(initialRecipes);
		recipes.forEach((recipe) => {
			createCardInstance(recipe);
		});
		selectedRecipe.set(recipes.slice(-1)[0]);
		removeCardShadows();
	};

	onMount(() => {
		threshold = Math.min(window.innerWidth * 0.1, 150);
		initRecipes();
		window.addEventListener("resize", function () {
			threshold = Math.min(window.innerWidth * 0.1, 150);
		});
	});

	swipeDirection.subscribe(async (value) => {
		swipeVisual = value;
		switch (value) {
			case Direction.Left:
			case Direction.Right:
				transformValue = getTransformValue(swipeVisual);
				await handleCardChoice();
				refreshCardProps();
				break;
			case Direction.Up:
				transformValue = getTransformValue(swipeVisual);
				showDetailPage();
				break;
			default:
				break;
		}
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
			refreshCardProps();
		}
	};

	const handlePanEnd = () => {
		isTouching = false;
		transformValue = getTransformValue(swipeVisual);
		xDist = 0;
		yDist = 0;
		swipeDirection.set(swipeVisual);
		refreshCardProps();
	};

	const refreshCardProps = () => {
		cardInstances[0].$set({
			transformValue,
			swipeVisual,
			isTouching,
		})};

	const showDetailPage = () => {
		goto("recipe/" + currentRecipe);
	};

	const handleCardChoice = async () => {
		isAnimationOver = false;

		// wait for animation to finish
		setTimeout(() => {
			swipeVisual = Direction.None;
			swipeDirection.set(swipeVisual);
			transformValue = "translate(0px, 0px)";
			isAnimationOver = true;
			selectedRecipe.set(recipes[0]);
		}, 300);

		isLoading = true;

		// add new recipe
		await fetchRecipe(currentRecipe + initialRecipes.length)
			.then((recipe) => {
				setTimeout(() => {
					refreshCardStackContent(recipe);
					isLoading = false;
				},
				!isAnimationOver ? 300 : 0)
			})
			.catch((err) => {
				refreshCardStackContent();
				handleError(true, err);
			});
	};

	const refreshCardStackContent = (recipe?: Recipe) => {
		currentRecipe++;

		//Remove current Card
		recipes.shift();
		cardInstances.shift().$destroy();

		//Add new Card
		if (recipe) {
			recipes = [...recipes, recipe];
			createCardInstance(recipe);
		}
		removeCardShadows();
	};

	const createCardInstance = (recipe: Recipe) => {
		cardInstances.push(
			new Card({
			target: container,
			props: {
				recipe,
				isBottom: true,
				transformValue,
				isTouching,
				swipeVisual,
			},
			anchor: container.firstChild,
		}));
	};

	const removeCardShadows = () => {
		cardInstances.forEach((instance) => {
			instance.$set({ isBottom: false });
		});
		cardInstances[cardInstances.length - 1].$set({ isBottom: true });
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

	onDestroy(() => {
		// Clean up card instances when component is destroyed
		cardInstances.forEach((instance) => instance.$destroy());
	});
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
	<div class="relative flex size-full items-center justify-center" bind:this={container}>
		<button
			class="after:w-dvh z-[99] size-full active:fixed active:left-0 active:top-0 active:h-dvh"
			use:pan={{ delay: 0 }}
			on:pan={handlePan}
			on:mouseup={handlePanEnd}
			on:touchend={handlePanEnd}
			on:touchcancel={handlePanEnd}></button>
	</div>
</div>
