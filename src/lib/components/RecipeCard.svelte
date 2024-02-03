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

<div class="">
	{#if showModal}
		<DeleteModal {message} {onConfirm} onCancel={() => (showModal = false)} />
	{/if}

	<a href={"/recipe/" + recipe.id} class="block">
		<div class="group relative duration-100 rounded-[2rem] border-2 border-transparent overflow-hidden hover:border-yellow shadow-shadowSubtleGray">
			<div>
				<div class="size-full z-[1] absolute bg-gradient-to-b from-transparent from-20% to-gray-500 to-100%"></div>

				{#if recipe.images.length > 0}
					<img src={recipe.images[0].image} class="duration-300 scale-[1.0] h-48 w-full object-cover group-hover:scale-[1.05]" alt="Rezept Bild" />
				{/if}

				<div class="z-[2] absolute bottom-0 left-0 w-full px-md py-sm">
					<div class="font-header text-xl text-yellow [text-shadow:_0_0_5px_#000]">
						{recipe.name}
					</div>
					<DetailRow {recipe} showRatings showHearts />
				</div>
			</div>
			{#if showButton}
				<RoundButton
					action={() => (showModal = true)}
					type="button"
					src={RejectIcon}
					alt="Delete"
					size="sm"
					class="absolute z-[4] right-0 top-0 m-md bg-gray-900 drop-shadow-none"
				/>
			{/if}
		</div>
	</a>
</div>
