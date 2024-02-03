<script lang="ts">
	import Star from "$lib/assets/icons/star.svg";
	import StarEmpty from "$lib/assets/icons/star_empty.svg";
	import { fetchRating, upsertRating } from "$lib/functions/database/ratings.js";
	import type { Recipe } from "$types/database.types";
	import { user } from "$lib/functions/stores";
	import { onMount } from "svelte";

	export let recipe: Recipe;
	let rating: number | null;
	let userRating: number | null;

	onMount(async () => {
		if ($user) {
			userRating = await fetchRating(recipe.id, $user.id);
			rating = userRating;
		}
	});

	const handleHover = (index: number) => {
		rating = index;
	};

	const handleMouseLeave = () => {
		rating = userRating;
	};

	const rateRecipe = (rating: number) => {
		if ($user) {
			upsertRating({
				rating: rating,
				recipe: recipe.id,
				user_id: $user.id,
			}).then(() => {
				userRating = rating;
			});
		}
	};
</script>

{#if user}
	<div role="group" class="flex justify-center" on:mouseleave={() => handleMouseLeave()}>
		{#each Array(5) as _, index}
			<button
				type="button"
				on:mouseenter={() => handleHover(index + 1)}
				on:click={() => rateRecipe(index + 1)}
				class="focus rounded-full p-0.5"
			>
				<img class="hover:cursor-pointer" src={rating && index < rating ? Star : StarEmpty} alt="Rating Icon" />
			</button>
		{/each}
	</div>
{/if}
