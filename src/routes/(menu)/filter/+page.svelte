<script lang="ts">
	import { fetchCategories, fetchTypes } from "$lib/functions/db";

	import FadeIn from "$lib/components/FadeIn.svelte";
	import Section from "$lib/components/Section.svelte";
	import TagList from "$lib/components/TagList.svelte";

	type Filters = {
		Bewertung: String;
		Preis: String;
		Dauer: String;
		Schwierigkeit: String;
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
				<TagList tags={types.map((type) => type.name)} />
			</Section>
		{/await}

		{#await fetchCategories() then categories}
			<Section title="Kategorie">
				<TagList tags={categories.map((category) => category.name)} />
			</Section>
		{/await}

		<component>
			{#each filterOptions as filter}
				<Section title={filter.name}>
					<div class="flex items-center">
						{#each filter.options as option}
							<div class="text-center">
								<button
									class={`focus:shadow-outline mb-2 mr-20 h-6 w-6 rounded-full border border-gray-300 focus:outline-none ${
										selectedFilters[filter.name] === option ? "text-white bg-yellow" : "bg-gray-900"
									}`}
									on:click={() => (selectedFilters[filter.name] = option)}
								></button>
								<p class="mr-20 text-sm">{option}</p>
							</div>
						{/each}
					</div>
				</Section>
			{/each}
		</component>

		<button class="h-16 w-full rounded-sm bg-yellow text-xl font-semibold text-gray-900">Filter anwenden</button>
	</div>
</FadeIn>
