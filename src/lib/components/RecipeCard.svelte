<script lang="ts">
	import RoundButton from "$lib/components/RoundButton.svelte";
	import type { Recipe } from "$types/database.types";
	import DetailRow from "./DetailRow.svelte";

	import RejectIcon from "$lib/assets/icons/reject.svg";

	export let recipe: Recipe;
	export let action: () => void;
</script>

<a
	href={"/recipe/" + recipe.id}
	class="flex w-full flex-row items-center justify-between rounded-lg bg-gray-500 p-sm drop-shadow-xl"
>
	<div class="flex w-full flex-row items-center gap-md overflow-hidden">
		<img src={recipe.images[0].image} class="aspect-square size-20 rounded-sm object-cover" alt="Rezept Bild" />
		<div class="flex flex-col space-y-1">
			<div class="text-xl font-semibold text-yellow">{recipe.name}</div>
			<DetailRow {recipe} />
		</div>
		<RoundButton
			{action}
			type="button"
			src={RejectIcon}
			alt="More"
			size="sm"
			class="ml-auto bg-gray-900 drop-shadow-none"
		/>
	</div>
</a>
