<script lang="ts">
	import RoundButton from "$lib/components/RoundButton.svelte";
	import type { Recipe } from "$types/database.types";
	import DetailRow from "./DetailRow.svelte";
	import RejectIcon from "$lib/assets/icons/trashcan.svg";
	import DeleteModal from "./DeleteModal.svelte";
	import LazyLoadingImage from "$lib/components/LazyLoadingImage.svelte";

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
		<div
			class="group relative overflow-hidden rounded-[2rem] border-2 border-transparent shadow-shadowSubtleGray duration-200 hover:border-yellow"
		>
			<div>
				<div class="absolute z-[1] size-full bg-gradient-to-b from-transparent from-20% to-gray-500 to-100%"></div>

				{#if recipe.images.length > 0}
					<div class="relative">
						<div class="relative h-48 w-full scale-[1.0] object-cover">
							<div class="absolute left-0 right-0 h-48 w-full duration-300 group-hover:ml-[-5%] group-hover:w-[110%]">
								<LazyLoadingImage src={recipe.images[0].image} />
							</div>
						</div>
					</div>
				{/if}

				<div class="absolute bottom-0 left-0 z-[2] w-full px-md py-sm">
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
					class="absolute right-0 top-0 z-[4] m-md bg-gray-900 drop-shadow-none"
				/>
			{/if}
		</div>
	</a>
</div>
