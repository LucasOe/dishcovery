<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
	import Section from "$lib/components/Section.svelte";
	import type { Filter, FilterOptions, FilterValue } from "$types/filter.types";
	import { twMerge } from "tailwind-merge";
	import { getEntries } from "$lib/functions/utils";
	import { filters } from "$lib/functions/stores";
	import { goto } from "$app/navigation";

	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import PriceIcon from "$lib/assets/icons/price.svg";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import TagIcon from "$lib/assets/icons/tag.svg";

	const filterOptions: FilterOptions = {
		difficulty: {
			displayName: "Schwierigkeit",
			icon: DifficultyIcon,
			options: [
				{
					id: null,
					name: "Alle",
				},
				{
					id: 1,
					name: "Einfach",
				},
				{
					id: 2,
					name: "Mittel",
				},
				{
					id: 3,
					name: "Schwer",
				},
			],
		},
		cost: {
			displayName: "Preis",
			icon: PriceIcon,
			options: [
				{
					id: null,
					name: "Alle",
				},
				{
					id: 1,
					name: "€",
				},
				{
					id: 2,
					name: "€€",
				},
				{
					id: 3,
					name: "€€€",
				},
			],
		},
		preperation_time: {
			displayName: "Dauer",
			icon: ClockIcon,
			options: [
				{
					id: null,
					name: "Alle",
				},
				{
					id: [5, 10, 15],
					name: "5-15 min.",
				},
				{
					id: [20, 25, 30, 35, 40],
					name: "20-40 min.",
				},
				{
					id: [45, 50, 55, 60],
					name: "45+ min.",
				},
			],
		},
		categories: {
			displayName: "Kategorie",
			icon: TagIcon,
			options: [
				{
					id: null,
					name: "Alle",
				},
				{
					id: 31,
					name: "Frühstück",
				},
				{
					id: 33,
					name: "Mittagessen",
				},
				{
					id: 32,
					name: "Abendessen",
				},
			],
		},
	};

	let selectedFilters: Filter = {
		difficulty: $filters?.difficulty || null,
		cost: $filters?.cost || null,
		preperation_time: $filters?.preperation_time || null,
		categories: $filters?.categories || null,
	};

	function onClick<FilterKey extends keyof Filter>(filter: FilterKey, option: FilterValue<Filter[FilterKey]>) {
		selectedFilters[filter] = option.id;
	}

	function applyFilters() {
		$filters = selectedFilters;
		goto("/");
	}
</script>

<FadeIn>
	<div class="space-y-lg">
		{#each getEntries(filterOptions) as [filter, filterOption]}
			<Section title={filterOption.displayName} icon={filterOption.icon}>
				<div class="flex items-center justify-between rounded-md bg-gray-500 px-1 py-4">
					{#each filterOption.options as option}
						<div class="flex grow-[1] basis-0 flex-col items-center justify-center p-1">
							<button
								class={twMerge(
									"focus size-6 rounded-full border border-gray-300 text-center hover:bg-gray-500-hover",
									JSON.stringify(selectedFilters[filter]) == JSON.stringify(option.id)
										? "bg-yellow text-white hover:bg-yellow"
										: "bg-gray-900"
								)}
								on:click={() => onClick(filter, option)}
							/>
							<p class="mt-2 text-xs sm:text-sm">{option.name}</p>
						</div>
					{/each}
				</div>
			</Section>
		{/each}

		<button type="button" on:click={applyFilters} class="button my-6">Filter anwenden</button>
	</div>
</FadeIn>
