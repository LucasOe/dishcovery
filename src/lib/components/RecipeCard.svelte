<script lang="ts">
	import RoundButton from "$lib/components/RoundButton.svelte";
	import type { Recipe } from "$types/database.types";
	import DetailRow from "./DetailRow.svelte";
	import RejectIcon from "$lib/assets/icons/trashcan.svg";
	import DeleteModal from "./DeleteModal.svelte";

	export let recipe: Recipe;
	export let message: string;
	export let onConfirm: () => void;
	export let showButton = true;

	let showModal = false;
</script>

<div>
	{#if showModal}
		<DeleteModal {message} {onConfirm} onCancel={() => (showModal = false)} />
	{/if}

	<a href={"/recipe/" + recipe.id}>
		<div class="relative">
			<div>
				{#if recipe.images.length > 0}
					<div
						class="size-full overflow-hidden rounded-[2rem] shadow-shadowGray duration-200 before:absolute before:size-full before:rounded-[2rem] before:bg-gradient-to-b before:from-transparent before:from-20% before:to-gray-500 before:to-100%"
					>
						<img src={recipe.images[0].image} class="h-48 w-full object-cover" alt="Rezept Bild" />
					</div>
				{/if}
				<div class="absolute bottom-0 left-0 w-full px-md py-sm">
					<div class="font-header text-xl text-yellow [text-shadow:_0_0_5px_#000]">
						{recipe.name}
					</div>
					<DetailRow {recipe} />
				</div>
			</div>
			{#if showButton}
				<RoundButton
					action={() => (showModal = true)}
					type="button"
					src={RejectIcon}
					alt="Delete"
					size="sm"
					class="absolute right-0 top-0 m-md bg-gray-900 drop-shadow-none"
				/>
			{/if}
		</div>
	</a>
</div>
