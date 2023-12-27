<script lang="ts">
	import Tag from "$lib/components/Tag.svelte";

	export let tags: string[];
	export let selected: string[] = [];

	function toggleSelect(tag: string) {
		const index = selected.indexOf(tag);
		selected.includes(tag) ? selected.splice(index, 1) : selected.push(tag);
		selected = selected; // needed for the component to update. See: https://stackoverflow.com/questions/69791435/svelte-list-wont-update-when-i-add-to-an-array
	}
</script>

<div class="flex flex-wrap gap-sm rounded-sm bg-gray-500 p-sm">
	{#each tags as tag}
		<button on:click={() => toggleSelect(tag)}>
			<Tag text={tag} color={selected.includes(tag) ? "yellow" : "gray"} />
		</button>
	{/each}
</div>
