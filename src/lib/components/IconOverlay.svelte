<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import { Direction } from "$types/card.types";

	export let swipeIndicator: Direction = Direction.None;

	import Like from "$lib/assets/icons/addToList.svg";
	import Dislike from "$lib/assets/icons/reject.svg";
	import Open from "$lib/assets/icons/open.svg";
</script>

<div>
	<img
		class={twMerge(
			"absolute left-xxl top-xxl z-10 size-xxl duration-300",
			swipeIndicator === Direction.Right ? "opacity-100" : "opacity-0"
		)}
		src={Like}
		alt="Like Icon"
	/>
	<img
		class={twMerge(
			"absolute right-xxl top-xxl z-10 size-xxl duration-300",
			swipeIndicator === Direction.Left ? "opacity-100" : "opacity-0"
		)}
		src={Dislike}
		alt="Dislike Icon"
	/>
	<img
		class={twMerge(
			"absolute bottom-0 left-0 right-0 top-0 z-10 m-auto size-xxl brightness-200 duration-300",
			swipeIndicator === Direction.Up ? "opacity-100" : "opacity-0"
		)}
		src={Open}
		alt="Open Icon"
	/>
	<div
		class={twMerge(
			"absolute left-0 top-0 size-full bg-gradient-to-t from-transparent from-10% to-gray-500 duration-300",
			swipeIndicator !== Direction.Down && swipeIndicator !== Direction.None ? "opacity-100" : "opacity-0"
		)}
	/>
</div>
