<script lang="ts">
	import RoundButton from "$lib/components/RoundButton.svelte";
	import type { Recipe } from "$types/database.types";
	import { goto } from "$app/navigation";
	import DetailRow from "./DetailRow.svelte";

	import MoreIcon from "$lib/assets/icons/more.svg";

	export let recipe: Recipe;
</script>

<a
	href={"/recipe/" + recipe.id}
	class="flex w-full flex-row items-center justify-between rounded-lg bg-gray-500 p-sm drop-shadow-xl"
>
	<div class="flex w-full flex-row items-center gap-md">
		<img src={recipe.images[0].image} class="aspect-square size-20 rounded-sm object-cover" alt="Rezept Bild" />
		<div class="flex flex-col space-y-1">
			<div class="text-xl font-semibold text-yellow">{recipe.name}</div>
			<DetailRow {recipe} />
		</div>
		<RoundButton
			type="button"
			src={MoreIcon}
			alt="More"
			action={() => {}}
			size="sm"
			class="ml-auto bg-gray-900 drop-shadow-none"
		/>
	</div></a
>
