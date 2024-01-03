<script lang="ts">
	import RejectIcon from "$lib/assets/icons/reject.svg";
	import AddToListIcon from "$lib/assets/icons/addToList.svg";
	import OpenIcon from "$lib/assets/icons/open.svg";
	import RoundButton from "$lib/components/RoundButton.svelte";
	import {goto} from "$app/navigation";
	import {Direction} from "$types/card.types";
	import {swipeDirection} from "$lib/functions/stores";

	let swipeValue:Direction = Direction.None;
	swipeDirection.subscribe(value => {
		swipeValue = value;
		console.log(swipeValue);
	});

	const openRecipe = () => {
		goto("/detail")
	}

	const rejectRecipe = () => {
		swipeDirection.set(Direction.Left)
	}

	const likeRecipe = () => {
		swipeDirection.set(Direction.Right)
	}


</script>

<div class="flex items-center justify-center gap-xxl">
	<RoundButton src={RejectIcon} alt="Reject Icon" action={rejectRecipe} size="md" />
	<RoundButton src={OpenIcon} alt="Open Icon" action={openRecipe} size="sm" />
	<RoundButton src={AddToListIcon} alt="Add Icon" action={likeRecipe} size="md" />
</div>
