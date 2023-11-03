<script lang="ts">
	import { twMerge } from "tailwind-merge";

	import DropDownIcon from "$lib/assets/icons/dropdown.svg";

	type Entry = {
		id: string | number;
		name: string;
	};

	export let entries: Entry[];
	let selectedEntry: Entry = entries[0];
	let menuOpen = false;
</script>

<div class="relative space-y-xs rounded-sm bg-gray-500">
	<button on:click={() => (menuOpen = !menuOpen)} class="flex w-full justify-between">
		<button class="rounded-md px-sm text-xl font-semibold">{selectedEntry.name}</button>
		<img alt="Dropdown" class="h-10 w-10" src={DropDownIcon} />
	</button>

	<ul
		class={twMerge(
			"absolute z-10 w-full space-y-xs rounded-md bg-gray-500 px-md py-sm shadow-xl",
			!menuOpen && "hidden"
		)}
	>
		{#each entries as entry}
			<li class={twMerge("cursor-pointer text-xl font-semibold", entry.id == selectedEntry.id && "text-yellow")}>
				<button
					on:click={() => {
						selectedEntry = entry;
						menuOpen = false;
					}}>{entry.name}</button
				>
			</li>
		{/each}
	</ul>
</div>
