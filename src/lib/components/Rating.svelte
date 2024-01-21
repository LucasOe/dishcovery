<script lang="ts">
	import Star from "$lib/assets/icons/star.svg";
	import StarHalf from "$lib/assets/icons/star_half.svg";
	import StarEmpty from "$lib/assets/icons/star_empty.svg";
	import { onMount } from "svelte";
	import { fetchAverageRating } from "$lib/functions/database/ratings.js";
	import type { Recipe } from "$types/database.types";

	export let recipe: Recipe;
	let rating = 0;

	onMount(async () => {
		rating = await fetchAverageRating(recipe.id);
	});
</script>

<div class="flex gap-1">
	{#if rating != 0}
		{#each Array(Math.floor(rating)) as _}
			<img src={Star} alt="Rating Icon" />
		{/each}
		{#if rating % 1 !== 0}
			<img src={StarHalf} alt="Half Star Icon" />
		{/if}
		{#each Array(5 - Math.round(rating)) as _}
			<img src={StarEmpty} alt="Empty Star Icon" />
		{/each}
	{/if}
</div>
