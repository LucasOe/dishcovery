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


	<a href={"/recipe/" + recipe.id} class="relative">
		<div>
			<div class="size-full duration-200 overflow-hidden rounded-[2rem] before:absolute before:size-full before:bg-gradient-to-b before:from-transparent before:rounded-[2rem] before:from-20% before:to-gray-500 before:to-100%">
				<img src={recipe.images[0].image} class="h-48 w-full object-cover" alt="Rezept Bild" />
			</div>
			<div class="absolute bottom-0 left-0 py-sm px-md w-full">
				<div class="font-header text-xl text-yellow custom-text-shadow">
					{recipe.name}
				</div>
				<DetailRow {recipe} />
			</div>
		</div>
		<RoundButton
			action={() => (showModal = true)}
			type="button"
			src={RejectIcon}
			alt="Delete"
			size="sm"
			class="absolute top-0 right-0 m-md bg-gray-900 drop-shadow-none"
		/>
	</a>

	<!--Backup
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
	-->
</div>

<style>
	.custom-text-shadow {
		text-shadow: 0 0 5px #000;
	}
</style>
