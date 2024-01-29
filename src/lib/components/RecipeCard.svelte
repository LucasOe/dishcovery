<script lang="ts">
	import RoundButton from "$lib/components/RoundButton.svelte";
	import type { Recipe } from "$types/database.types";
	import DetailRow from "./DetailRow.svelte";
	import RejectIcon from "$lib/assets/icons/reject.svg";
  
	export let recipe: Recipe;
	export let onDeleteRequest: (id: number) => void;
  
	// Stelle sicher, dass recipe.images[0] definiert ist, bevor du darauf zugreifst
	let recipeImage = recipe.images && recipe.images[0] ? recipe.images[0].image : '';
  </script>
  
  <a
	href={"/recipe/" + recipe.id}
	class="flex w-full flex-row items-center justify-between rounded-lg bg-gray-500 p-sm drop-shadow-xl"
>
	<div class="flex w-full flex-row items-center gap-md w-100">
		<img src={recipeImage} class="aspect-square size-20 rounded-sm object-cover" alt="Rezept Bild" />
		<div class="flex flex-col space-y-1">
			<div class="text-ellipsis whitespace-nowrap text-md sm:text-lg w-100 font-semibold text-yellow">{recipe.name}</div>
			<DetailRow {recipe} />
		</div>
		<RoundButton
		  	action={() => onDeleteRequest(recipe.id)}
			type="button"
			src={RejectIcon}
			alt="Delete"
			size="sm"
			class="ml-auto bg-gray-900 drop-shadow-none"
		/>
	</div>
</a>