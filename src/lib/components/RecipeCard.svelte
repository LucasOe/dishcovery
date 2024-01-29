<script lang="ts">
	import RoundButton from "$lib/components/RoundButton.svelte";
	import type { Recipe } from "$types/database.types";
	import DetailRow from "./DetailRow.svelte";
	import RejectIcon from "$lib/assets/icons/reject.svg";
	import DeleteModal from "./DeleteModal.svelte";

	export let recipe: Recipe;
	export let message: string;
	export let onConfirm: () => void;

	let showModal = false;
</script>

<div>
	{#if showModal}
		<DeleteModal {message} {onConfirm} onCancel={() => (showModal = false)} />
	{/if}

	<a
		href={"/recipe/" + recipe.id}
		class="flex w-full flex-row items-center justify-between rounded-lg bg-gray-500 p-sm drop-shadow-xl"
	>
		<div class="w-100 flex w-full flex-row items-center gap-md">
			<img src={recipe.images[0].image} class="aspect-square size-20 rounded-sm object-cover" alt="Rezept Bild" />
			<div class="flex flex-col space-y-1">
				<div class="text-md w-100 text-ellipsis whitespace-nowrap font-semibold text-yellow sm:text-lg">
					{recipe.name}
				</div>
				<DetailRow {recipe} />
			</div>
			<RoundButton
				action={() => (showModal = true)}
				type="button"
				src={RejectIcon}
				alt="Delete"
				size="sm"
				class="ml-auto bg-gray-900 drop-shadow-none"
			/>
		</div>
	</a>
</div>
