<script lang="ts">
	import type { Recipe } from "$types/database.types";
	import { twMerge } from "tailwind-merge";
	import Tag from "./Tag.svelte";

	export let recipe: Recipe;
	export let isInDetail = false;

	$: extraCategoriesCount = recipe.categories.length > 2 ? recipe.categories.length - 2 : 0;
</script>

<div class={twMerge("flex gap-sm whitespace-nowrap", isInDetail && "flex-wrap")}>
	{#if isInDetail}
		{#each recipe.categories as category}
			<Tag text={category.name} color="yellow" class="select-none" />
		{/each}
	{:else}
		{#each recipe.categories.slice(0, 2) as category}
			<Tag text={category.name} color="yellow" class="select-none" />
		{/each}
		{#if extraCategoriesCount > 0}
			<Tag text={"+" + extraCategoriesCount} color="yellow" class="select-none"></Tag>
		{/if}
	{/if}
</div>
