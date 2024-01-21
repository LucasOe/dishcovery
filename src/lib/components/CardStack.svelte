<script lang="ts">
	import { onDestroy, onMount } from "svelte";

	import { currentUser, selectedRecipe, swipeDirection } from "$lib/functions/stores";
	import { fetchRecipe, fetchRecipes } from "$lib/functions/database/recipes";
	import type { Recipe } from "$types/database.types";
	import { Direction } from "$types/card.types";
	import Card from "$lib/components/Card.svelte";
	import Spinner from "$lib/components/Spinner.svelte";
	import { createCardInstance, direction, getTransformValue } from "$lib/functions/cardStack";
	import { upsertRating } from "$lib/functions/database/ratings";
	import { spring } from "svelte/motion";
	import { pannable } from "$lib/functions/pannable";
	import { navigateToRecipe } from "$lib/functions/navigation";

	let user;
	let recipe;
	let initialRecipes = [3, 2, 1];

	currentUser.subscribe((value) => {
		user = value;
	});

	selectedRecipe.subscribe((value) => {
		recipe = value;
	});

	let container: HTMLDivElement;
	let cardInstances: Card[] = [];
	let recipes: Recipe[] = [];
	let swipeIndicator: Direction = Direction.None;

	const coords = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.2,
			damping: 0.4,
		}
	);

	let threshold = 150;
	let isTouching = false;

	let isLoading = false;
	let isError = false;
	let errorMessage = "";

	let transformValue = "translate(0px, 0px)";

	const initRecipes = async () => {
		recipes = await fetchRecipes(initialRecipes);
		recipes.forEach((recipe) => {
			container && cardInstances.push(createCardInstance(recipe, container));
		});
		selectedRecipe.set(recipes[0]);
		removeCardShadows();
	};

	onMount(() => {
		threshold = Math.min(window.innerWidth * 0.2, 150);
		initRecipes();
		window.addEventListener("resize", function () {
			threshold = Math.min(window.innerWidth * 0.2, 150);
		});
	});

	swipeDirection.subscribe(async (value) => {
		swipeIndicator = value;
		switch (value) {
			case Direction.Left:
			case Direction.Right:
				transformValue = getTransformValue(swipeIndicator);
				await handleCardChoice();
				refreshCardProps();
				break;
			case Direction.Up:
				transformValue = getTransformValue(swipeIndicator);
				navigateToRecipe(recipe.id);
				break;
			default:
				break;
		}
	});

	const handlePanStart = () => {
		isTouching = true;
		coords.stiffness = coords.damping = 1;
		coords.update(($coords) => ({
			x: 0,
			y: 0,
		}));
	};

	const handlePanMove = (event) => {
		let xStart = 0;
		let yStart = 0;
		let xDist;
		let yDist;
		let rotation;

		coords.update(() => ({
			x: $coords.x + event.detail.dx,
			y: $coords.y + event.detail.dy,
		}));

		xDist = $coords.x - xStart;
		yDist = $coords.y - yStart;

		rotation = xDist / 30;
		transformValue = `translate(${xDist}px, ${yDist}px) rotate(${rotation}deg)`;

		swipeIndicator = direction(xDist, yDist, threshold);
		refreshCardProps();
	};

	const handlePanEnd = () => {
		isTouching = false;
		transformValue = getTransformValue(swipeIndicator);
		swipeDirection.set(swipeIndicator);
		refreshCardProps();
	};

	const refreshCardProps = () => {
		cardInstances[0].$set({
			transformValue,
			swipeIndicator: swipeIndicator,
			isTouching,
		});
	};

	const handleCardChoice = async () => {
		// add rating to database
		await upsertRating(user.id, recipes[0].id, null, swipeIndicator === Direction.Right);

		// wait for animation to finish
		swipeIndicator = Direction.None;
		swipeDirection.set(swipeIndicator);
		transformValue = "translate(0px, 0px)";

		isLoading = true;

		// add new recipe
		await fetchRecipe(recipe.id + recipes.length)
			.then((recipe) => {
				refreshCardStackContent(recipe);
			})
			.catch((err) => {
				handleError(true, err);
				refreshCardStackContent();
			});
	};

	const refreshCardStackContent = (recipe?: Recipe) => {
		isLoading = false;

		//Remove current Card
		recipes.shift();
		cardInstances.shift().$destroy();

		//Add new Card
		if (recipe) {
			recipes = [...recipes, recipe];
			container && cardInstances.push(createCardInstance(recipe, container));
		}
		removeCardShadows();

		//Change current recipe
		selectedRecipe.set(recipes[0]);
	};

	const removeCardShadows = () => {
		cardInstances.forEach((instance) => {
			instance.$set({ isBottom: false });
		});
		cardInstances[cardInstances.length - 1] && cardInstances[cardInstances.length - 1].$set({ isBottom: true });
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
		<div
			class="text-md absolute flex aspect-square size-48 flex-col items-center justify-center rounded-full bg-gray-500 p-4 text-center font-semibold"
		>
			{errorMessage}
		</div>
	{/if}
	<div class="relative flex size-full items-center justify-center" bind:this={container}>
		<button
			class="after:w-dvh z-[99] size-full active:fixed active:left-0 active:top-0 active:h-dvh"
			use:pannable
			on:panstart={handlePanStart}
			on:panmove={handlePanMove}
			on:panend={handlePanEnd}
		></button>
	</div>
</div>
