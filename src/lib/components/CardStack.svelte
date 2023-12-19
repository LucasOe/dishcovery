<script lang="ts">
	import { pan } from "svelte-gestures";

	import { Direction } from "$types/card.types";
	import Card from "$lib/components/Card.svelte";
	import { fetchRecipes } from "$lib/functions/db";

	let xStart = 0;
	let yStart = 0;

	let xCoord = 0;
	let yCoord = 0;

	let threshhold = 150;
	let isTouching = false;

	let swipeDirection: Direction = Direction.None;
	let transformValue = "translate(0px, 0px)";
	let rotation;

	function handlePan(event: CustomEvent<{ x: number; y: number; target: EventTarget }>) {
		xCoord = event.detail.x;
		yCoord = event.detail.y;

		if (!isTouching) {
			xStart = xCoord;
			yStart = yCoord;
			isTouching = true;
		}

		rotation = (xCoord - xStart) / 30;
		transformValue = `translate(${xCoord - xStart}px, ${yCoord - yStart}px) rotate(${rotation}deg)`;

		swipeDirection = (() => {
			if (xCoord - xStart > +threshhold) return Direction.Right;
			if (xCoord - xStart < -threshhold) return Direction.Left;
			if (yCoord - yStart < -threshhold) return Direction.Up;
			return Direction.None;
		})();
	}

	function handlePanEnd() {
		isTouching = false;

		transformValue = (() => {
			switch (swipeDirection) {
				case Direction.Left:
					return "translate(-120vw, 0px) rotate(-50deg)";
				case Direction.Right:
					return "translate(120vw, 0px) rotate(50deg)";
				case Direction.Up:
					return "translate(0vw, -100vh) rotate(0deg)";
				default:
					return "translate(0px, 0px)";
			}
		})();
	}
</script>

<div class="relative flex h-full w-full">
	<div class="peer relative z-10 flex h-full w-full">
		{#await fetchRecipes()}
			<p class="flex w-full items-center justify-center">Loading...</p>
		{:then recipes}
			<Card recipe={recipes[1]} class="absolute h-full w-full" />
			<Card recipe={recipes[0]} class="absolute h-full w-full" {transformValue} {isTouching} {swipeDirection} />
		{:catch error}
			<p>Something went wrong: {error}</p>
		{/await}
	</div>

	<!-- This button only shows up while the peer (Card) is being hovered. While the card is being
	dragged (active state), it fills the whole screen, so the touch events get correctly handled.
	This is a terrible workaround but the only solution I could come up with. -->
	<button
		class="peer absolute -z-[99] hidden h-full w-full hover:z-[99] hover:flex active:fixed active:left-0 active:top-0 active:h-screen active:w-screen peer-hover:z-[99] peer-hover:flex"
		use:pan={{ delay: 0 }}
		on:pan={handlePan}
		on:mouseup={handlePanEnd}
		on:touchend={handlePanEnd}
		on:mouseleave={handlePanEnd}
		on:touchcancel={handlePanEnd}
	/>
</div>
