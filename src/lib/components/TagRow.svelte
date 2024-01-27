<script lang="ts">
	import type { Recipe } from "$types/database.types";
	import Tag from "./Tag.svelte";

	export let recipe: Recipe;
</script>

<div class="flex gap-sm whitespace-nowrap">
	{#each recipe.categories as category}
		<Tag text={category.name} color="yellow" class="select-none" />
	{/each}
</div>
