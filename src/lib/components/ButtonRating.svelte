<script lang="ts">
	import Star from "$lib/assets/icons/star.svg";
	import StarEmpty from "$lib/assets/icons/star_empty.svg";
	import {upsertRating} from "$lib/functions/database/ratings.js";
	import type { Recipe } from "$types/database.types";
	import {user} from "$lib/functions/stores";
	import {Direction} from "$types/card.types";
	import type {User} from "@supabase/supabase-js";

	export let recipe: Recipe;
	let rating = 0;
	let isRated = false;

	const handleHover = (index: number) => {
		rating = index;
	};

	const handleMouseLeave = () => {
		if (!isRated) {
			rating = 0;
		}
	};

	const rateRecipe = (rating: number) => {
		if ($user) {
			upsertRating({
				user_id: $user.id,
				recipe: recipe.id,
				rating: rating
			}).then(() => {
				isRated = true;
			});
		}
	}
</script>

{#if user}
	<div class="flex gap-3 block justify-center" on:mouseleave={() => handleMouseLeave()}>
		{#each Array(5) as _, index}
			<img src={index < rating? Star: StarEmpty} alt="Rating Icon" on:mouseenter={() => handleHover(1 + index)} on:click={() => rateRecipe(rating)}/>
		{/each}
	</div>
{/if}
