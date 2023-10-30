<script lang="ts">
	import Tag from "$lib/components/Tag.svelte";

	export let tags: string[];
</script>

<div class="flex flex-wrap gap-sm rounded-sm bg-[#363636] p-sm">
	{#each tags as tag}
		<button>
			<Tag text={tag} color="gray" />
		</button>
	{/each}
</div>
