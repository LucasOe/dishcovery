<script lang="ts">
	import Close from "$lib/assets/icons/reject.svg";
    export let message = 'Willst du das Rezept wirklich aus deinen Likes entfernen?';
    export let onConfirm: () => void;
    export let onCancel: () => void;
  </script>
  
  <div class="modal-backdrop">
    <div class="modal bg-gray-500 py-5 px-6 rounded-md flex flex-col items-center gap-md">
        <div class="rounded-full border-red border-2 p-3">
            <img src={Close} alt="">
        </div>
        <p class="text-lg">{message}</p>
        <div class="flex flex-row gap-sm">
            <button class="px-3 py-1 rounded-sm border-sm border-gray-300 bg-gray-300 text-lg font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-gray-300" on:click={onCancel}>Abbrechen</button>
            <button class="px-3 py-1 rounded-sm border-sm border-red bg-red text-lg font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-red" on:click={onConfirm}>Löschen</button>
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
  