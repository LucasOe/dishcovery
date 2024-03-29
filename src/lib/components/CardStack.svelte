<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { spring } from "svelte/motion";

	import { user, recipe, swipeDirection, filters } from "$lib/functions/stores";
	import {
		fetchNextRecipeNotSeen,
		fetchNextRecipe,
		fetchRecipesNotSeen,
		fetchRecipesWithFilter,
	} from "$lib/functions/database/recipes";
	import type { Recipe } from "$types/database.types";
	import { Direction } from "$types/card.types";
	import Card from "$lib/components/Card.svelte";
	import Spinner from "$lib/components/Spinner.svelte";
	import { createCardInstance, direction, getTransformValue } from "$lib/functions/cardStack";
	import { pannable } from "$lib/functions/pannable";
	import { goto } from "$app/navigation";
	import { deleteLikes, upsertLike } from "$lib/functions/database/likes";

	let container: HTMLDivElement;
	let cardInstances: Card[] = [];
	let recipes: Recipe[] = [];
	let swipeIndicator: Direction = Direction.None;
	let threshold = 150;
	let isTouching = false;
	let transformValue = "translate(0px, 0px)";
	let loading = true;
	let inAnimation = false;

	const coords = spring({ x: 0, y: 0 }, { stiffness: 0.2, damping: 0.4 });

	onMount(() => {
		scaleThreshhold();
		window.addEventListener("resize", function () {
			scaleThreshhold();
		});

		initCards();
	});

	onDestroy(() => {
		cardInstances.forEach((instance) => instance.$destroy());
	});

	// React to state change from BottomNav
	swipeDirection.subscribe(async (direction) => {
		swipeIndicator = direction;
		transformValue = getTransformValue(direction);

		switch (swipeIndicator) {
			case Direction.Left:
			case Direction.Right:
				await handleCardSwipe();
				break;
			case Direction.Up:
				if (!$recipe) return;
				goto(`/recipe/${$recipe.id}`);
				break;
		}
	});

	async function initCards() {
		// Delete old cards
		cardInstances.forEach((instance) => instance.$destroy());
		cardInstances = [];

		if ($user) recipes = await fetchRecipesNotSeen($user.id, $filters);
		else recipes = await fetchRecipesWithFilter($filters);

		// create card instances
		recipes.forEach((recipe) => {
			container && cardInstances.push(createCardInstance(recipe, container));
		});

		if (recipes[0]) $recipe = recipes[0];
		else $recipe = null;

		loading = false;
	}

	function handlePanStart() {
		isTouching = true;

		coords.stiffness = 1;
		coords.damping = 1;
		coords.update(() => ({ x: 0, y: 0 }));
	}

	function handlePanMove(event: CustomEvent) {
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
	}

	async function handlePanEnd() {
		isTouching = false;
		transformValue = getTransformValue(swipeIndicator);
		$swipeDirection = swipeIndicator;

		refreshCardProps();
	}

	async function handleCardSwipe() {
		refreshCardProps();
		if (!recipes[0]) return;

		if ($user) {
			await Promise.all([
				upsertLike({
					user_id: $user.id,
					recipe: recipes[0].id,
					liked: swipeIndicator === Direction.Right,
				}),
				fetchNextRecipeNotSeen(recipes[recipes.length - 1].id, $user.id, $filters),
			])
				.then(([_, nextRecipe]) => {
					refreshCardStackContent(nextRecipe);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			await fetchNextRecipe(recipes[recipes.length - 1].id, $filters)
				.then((nextRecipe) => {
					refreshCardStackContent(nextRecipe);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	function refreshCardProps() {
		if (inAnimation) return;

		cardInstances[0]?.$set({
			transformValue,
			swipeIndicator: swipeIndicator,
			isTouching,
		});
	}

	function refreshCardStackContent(nextRecipe: Recipe | null) {
		inAnimation = true;

		setTimeout(() => {
			// reset state
			swipeIndicator = Direction.None;
			$swipeDirection = swipeIndicator;
			transformValue = "translate(0px, 0px)";

			//Remove current Card
			recipes.shift();
			cardInstances.shift()?.$destroy();

			//Add new Card
			if (nextRecipe) {
				recipes = [...recipes, nextRecipe];
				container && cardInstances.push(createCardInstance(nextRecipe, container));
			}

			recipes = recipes; // update component
			if (recipes[0]) $recipe = recipes[0];
			else $recipe = null;

			inAnimation = false;
		}, 100);
	}

	function scaleThreshhold() {
		threshold = Math.min(window.innerWidth * 0.2, 150);
	}

	async function onReset() {
		if (!$user) return;
		await deleteLikes($user.id);
		initCards();
	}
</script>

<div class="relative flex size-full items-center justify-center">
	{#if loading}
		<div class="absolute flex size-40 items-center justify-center rounded-full">
			<Spinner />
		</div>
	{:else if recipes.length === 0}
		<div
			class="text-md absolute flex aspect-square size-48 flex-col items-center justify-center gap-2 rounded-full bg-gray-500 p-4 text-center font-semibold"
		>
			Es gibt keine weiteren Rezepte mehr.
			<button on:click={onReset} aria-label="Reset" class="underline"> Gesehene Rezepte zurücksetzen </button>
		</div>
	{/if}

	<div
		bind:this={container}
		use:pannable
		on:panstart={handlePanStart}
		on:panmove={handlePanMove}
		on:panend={handlePanEnd}
		class="flex size-full cursor-pointer items-center justify-center"
	/>
</div>
