<script lang="ts">
	import RejectIcon from "$lib/assets/icons/reject.svg";
	import AddToListIcon from "$lib/assets/icons/addToList.svg";
	import OpenIcon from "$lib/assets/icons/open.svg";
	import RoundButton from "$lib/components/RoundButton.svelte";
	import { goto } from "$app/navigation";
	import { Direction } from "$types/card.types";
	import { recipe, swipeDirection } from "$lib/functions/stores";

	const openRecipe = () => {
		if (!$recipe) return;
		goto(`recipe/${$recipe.id}`);
	};

	const rejectRecipe = () => {
		$swipeDirection = Direction.Left;
	};

	const likeRecipe = () => {
		$swipeDirection = Direction.Right;
	};
</script>

<div class="flex items-center justify-center gap-xxl">
	<RoundButton src={RejectIcon} alt="Reject Icon" action={rejectRecipe} size="md" />
	<RoundButton src={OpenIcon} alt="Open Icon" action={openRecipe} size="sm" />
	<RoundButton src={AddToListIcon} alt="Add Icon" action={likeRecipe} size="md" />
</div>
