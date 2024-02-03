<script lang="ts">
	import type { FilterValue } from "$types/filter.types";

	import { twMerge } from "tailwind-merge";

	import ChevronSvg from "./ChevronSVG.svelte";

	type T = $$Generic;
	export let entries: FilterValue<T>[];
	export let selected: FilterValue<T> = entries[0];

	let menuOpen = false;

	let container: any;

	function onWindowClick(e: any) {
		if (container.contains(e.target) == false) menuOpen = false;
	}
</script>

<svelte:window on:click={onWindowClick} />

<div
	bind:this={container}
	class={twMerge(
		"relative space-y-sm rounded-sm bg-gray-500 duration-150 hover:bg-gray-500-hover",
		menuOpen && "bg-gray-500-hover ring-0 ring-gray-300"
	)}
>
	<button
		type="button"
		on:click={() => (menuOpen = !menuOpen)}
		class="focus flex w-full items-center justify-between rounded-sm"
	>
		<p class="px-sm text-lg font-semibold">{selected.name}</p>
		<!--
		<img alt="Dropdown" class={twMerge("size-10 p-1 duration-500", menuOpen && "rotate-180")} src={DropDownIcon} />
		-->
		<div class="w-10">
			<ChevronSvg isOpen={menuOpen ? true : false} />
		</div>
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
					class="focus w-full rounded-sm px-1 py-1 text-left"
					type="button"
					tabindex="-1"
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
