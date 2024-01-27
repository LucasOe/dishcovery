<script lang="ts">
	import Tag from "$lib/components/Tag.svelte";
	import type { FilterValue } from "$types/filter.types";

	type T = $$Generic;
	export let tags: FilterValue<T>[];
	export let selected: FilterValue<T>[] = [];

	function toggleSelect(tag: FilterValue<T>) {
		const index = selected.indexOf(tag);
		selected.includes(tag) ? selected.splice(index, 1) : selected.push(tag);
		selected = selected; // needed for the component to update. See: https://stackoverflow.com/questions/69791435/svelte-list-wont-update-when-i-add-to-an-array
	}
</script>

<div class="flex flex-wrap gap-sm rounded-sm bg-gray-500 p-sm">
	{#each tags as tag}
		<button type="button" on:click={() => toggleSelect(tag)}>
			<Tag text={tag.name} color={selected.includes(tag) ? "yellow" : "gray"} />
		</button>
	{/each}
</div>
