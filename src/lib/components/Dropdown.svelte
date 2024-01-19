<script lang="ts">
	import { twMerge } from "tailwind-merge";

	import DropDownIcon from "$lib/assets/icons/dropdown.svg";
	import type { DisplayValue } from "$types/database.types";

	export let entries: DisplayValue[];
	export let selected: DisplayValue = entries[0];

	let menuOpen = false;
</script>

<div class={twMerge("relative space-y-sm rounded-sm bg-gray-500", menuOpen && "ring-2 ring-gray-300")}>
	<button on:click={() => (menuOpen = !menuOpen)} class="flex w-full justify-between">
		<button class="px-sm text-xl font-semibold">{selected.name}</button>
		<img alt="Dropdown" class={twMerge("size-10 p-1", menuOpen && "rotate-180")} src={DropDownIcon} />
	</button>

	<ul
		class={twMerge(
			"absolute z-10 w-full space-y-xs rounded-md bg-gray-500 px-md py-sm shadow-xl",
			menuOpen ? "ring-2 ring-gray-300" : "hidden"
		)}
	>
		{#each entries as entry}
			<li class={twMerge("cursor-pointer text-xl font-semibold", entry.id == selected.id && "text-yellow")}>
				<button
					on:click={() => {
						selected = entry;
						menuOpen = false;
					}}
				>
					{entry.name}
				</button>
			</li>
		{/each}
	</ul>
</div>
