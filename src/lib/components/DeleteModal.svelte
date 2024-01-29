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

<div class="modal-backdrop" on:click={handleClickOutside}>
	<div class="modal w-90% flex max-w-[500px] flex-col items-center gap-md rounded-md bg-gray-500 p-8">
		<div class="rounded-full border-2 border-red p-5">
			<img src={Close} alt="DeleteIcon" width="32" />
		</div>
		<p class="w-full text-center text-lg">{message}</p>
		<div class="flex flex-row gap-sm">
			<button
				class="rounded-sm border-sm border-gray-300 bg-gray-300 px-3 py-1 text-lg font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-gray-300"
				on:click={onCancel}>Abbrechen</button
			>
			<button
				class="rounded-sm border-sm border-red bg-red px-3 py-1 text-lg font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-red"
				on:click={onConfirm}>Löschen</button
			>
		</div>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 99999;
	}
</style>
