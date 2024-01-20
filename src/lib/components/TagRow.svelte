<script lang="ts">
	import type { Recipe } from "$types/database.types";
	import Tag from "./Tag.svelte";

	export let recipe: Recipe;
</script>

<div class="flex gap-sm">
	{#each recipe.categories as category}
		<Tag text={category.name} color="yellow" class="select-none" />
	{/each}
	{#each recipe.types as type}
		<Tag text={type.name} color="yellow" class="select-none" />
	{/each}
</div>
