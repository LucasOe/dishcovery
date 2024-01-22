<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
	import Section from "$lib/components/Section.svelte";
	import TagList from "$lib/components/TagList.svelte";
	import { fetchCategories, fetchTypes } from "$lib/functions/database/recipes";
	import { twMerge } from "tailwind-merge";

	type Filters = {
		Bewertung: string;
		Preis: string;
		Dauer: string;
		Schwierigkeit: string;
	};

	const filterOptions: { name: keyof Filters; options: string[] }[] = [
		{ name: "Bewertung", options: ["alle", "2+", "3+", "4+"] },
		{ name: "Preis", options: ["alle", "€", "€€", "€€€"] },
		{ name: "Dauer", options: ["alle", "<10 Min.", "<30 Min.", "<60 Min."] },
		{ name: "Schwierigkeit", options: ["alle", "einfach", "fortgeschritten", "schwer"] },
	];

	const selectedFilters: Filters = {
		Bewertung: "alle",
		Preis: "alle",
		Dauer: "alle",
		Schwierigkeit: "alle",
	};
</script>

<FadeIn>
	<div class="space-y-lg">
		<Section title="Titel"></Section>
		{#await fetchTypes() then types}
			<Section title="Art">
				<TagList tags={types} />
			</Section>
		{/await}

		{#await fetchCategories() then categories}
			<Section title="Kategorie">
				<TagList tags={categories} />
			</Section>
		{/await}

		{#each filterOptions as filter}
			<Section title={filter.name}>
				<div class="flex items-center">
					{#each filter.options as option}
						<div class="text-center">
							<button
								class={twMerge(
									"focus:shadow-outline mb-2 mr-20 h-6 w-6 rounded-full border border-gray-300 focus:outline-none",
									selectedFilters[filter.name] === option ? "bg-yellow text-white" : "bg-gray-900"
								)}
								on:click={() => (selectedFilters[filter.name] = option)}
							/>
							<p class="mr-20 text-sm">{option}</p>
						</div>
					{/each}
				</div>
			</Section>
		{/each}

		<button class="mt-5 h-16 w-full rounded-sm border-sm border-yellow bg-yellow text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow">Filter anwenden</button>
	</div>
</FadeIn>
