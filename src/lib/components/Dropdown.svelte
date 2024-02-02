<script lang="ts">
	import type { FilterValue } from "$types/filter.types";

	import { twMerge } from "tailwind-merge";

	import DropDownIcon from "$lib/assets/icons/dropdown.svg";

	type T = $$Generic;
	export let entries: FilterValue<T>[];
	export let selected: FilterValue<T> = entries[0];

	let menuOpen = false;
</script>

<div
	class={twMerge(
		"relative space-y-sm rounded-sm bg-gray-500 duration-150 hover:bg-gray-500-hover",
		menuOpen && "ring-2 ring-gray-300"
	)}
>
	<button type="button" on:click={() => (menuOpen = !menuOpen)} class="focus flex w-full items-center justify-between rounded-sm">
		<p class="px-sm text-lg font-semibold">{selected.name}</p>
		<img alt="Dropdown" class={twMerge("size-10 p-1 duration-500", menuOpen && "rotate-180")} src={DropDownIcon} />
	</button>

	<ul
		class={twMerge(
			"absolute z-10 w-full space-y-xs overflow-hidden rounded-md bg-gray-500 shadow-xl",
			menuOpen ? "ring-2 ring-gray-300" : "hidden"
		)}
	>
		{#each entries as entry}
			<li
				class={twMerge(
					"cursor-pointer px-2 py-1 text-lg font-semibold hover:bg-gray-500-hover",
					entry.id == selected.id && "text-yellow"
				)}
			>
				<button
					class="focus rounded-sm w-full text-left px-1 py-1"
					type="button"
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
