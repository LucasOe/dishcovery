<script lang="ts">
	import Close from "$lib/assets/icons/reject.svg";

	export let message = "Willst du das Rezept wirklich aus deinen Likes entfernen?";
	export let onConfirm: () => void;
	export let onCancel: () => void;

	function handleClickOutside(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onCancel();
		}
	}
</script>

<button
	class="fixed left-0 top-0 z-50 flex size-full items-center justify-center bg-black bg-opacity-50"
	on:click={handleClickOutside}
>
	<div class="modal w-90% flex max-w-[500px] flex-col items-center gap-md rounded-md bg-gray-500 p-8">
		<div class="rounded-full border-2 border-red p-5">
			<img src={Close} alt="DeleteIcon" class="size-8" />
		</div>
		<p class="w-full text-center text-lg">{message}</p>
		<div class="flex flex-row gap-sm">
			<button
				class="rounded-sm border-sm border-gray-300 px-3 py-1 text-lg font-semibold text-gray-300 transition duration-100 hover:bg-gray-900"
				on:click={onCancel}
			>
				Abbrechen
			</button>
			<button
				class="rounded-sm border-sm border-red bg-red px-3 py-1 text-lg font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-red"
				on:click={() => {
					onConfirm();
					onCancel();
				}}
			>
				Löschen
			</button>
		</div>
	</div>
</button>
