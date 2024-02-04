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
	let imageLoaded = false;
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
					<div class="relative">
						<img src={recipe.images[0].image} class="duration-300 scale-[1.0] h-48 w-full object-cover group-hover:scale-[1.05]"
							 alt="Rezept Bild"
							 on:load={() => imageLoaded = true} />
						<div
								class={`absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-r from-yellow to-red animation-loading duration-300 pointer-events-none opacity-1` + (imageLoaded ? " opacity-0" : "")}
						></div>
					</div>
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

<style >
	.animation-loading {
		animation: loading 2s linear infinite;
		background: linear-gradient(100deg, #2c2c2c 0%, #2c2c2c 35%, #3c3c3c 42.5%,  #2c2c2c 50%, #2c2c2c 85%, #3c3c3c 92.5%, #2c2c2c 100%);
		background-size: 220% 200%;
	}

	@keyframes loading {
		0% {
			background-position: 0 50%;
		}
		100% {
			background-position: 100% 50%;
		}
	}
</style>
