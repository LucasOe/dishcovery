<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
	import Section from "$lib/components/Section.svelte";
	import type { Filter, FilterOptions, FilterValue } from "$types/filter.types";
	import { twMerge } from "tailwind-merge";
	import { getEntries } from "$lib/functions/utils";
	import { filters } from "$lib/functions/stores";
	import { goto } from "$app/navigation";

	const filterOptions: FilterOptions = {
		difficulty: {
			displayName: "Schwierigkeit",
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
			options: [
				{
					id: null,
					name: "Alle",
				},
				{
					id: [5, 10, 15],
					name: "5-15 Min.",
				},
				{
					id: [20, 25, 30, 35, 40],
					name: "20-40 Min.",
				},
				{
					id: [45, 50, 55, 60],
					name: "45+ Min.",
				},
			],
		},
	};

	const selectedFilters: Filter = {
		difficulty: $filters?.difficulty || null,
		cost: $filters?.cost || null,
		preperation_time: $filters?.preperation_time || null,
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
			<Section title={filterOption.displayName}>
				<div class="flex items-center justify-between rounded-md bg-gray-500 p-1">
					{#each filterOption.options as option}
						<div class="flex grow-[1] basis-0 flex-col items-center justify-center p-2">
							<button
								class={twMerge(
									"focus:shadow-outline size-6 rounded-full border border-gray-300 text-center focus:outline-none",
									JSON.stringify(selectedFilters[filter]) == JSON.stringify(option.id)
										? "bg-yellow text-white"
										: "bg-gray-900"
								)}
								on:click={() => onClick(filter, option)}
							/>
							<p class="mt-2 text-sm">{option.name}</p>
						</div>
					{/each}
				</div>
			</Section>
		{/each}

		<button
			type="button"
			on:click={applyFilters}
			class="mt-5 h-16 w-full rounded-sm border-sm border-yellow bg-yellow text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow"
		>
			Filter anwenden
		</button>
	</div>
</FadeIn>
