<script lang="ts">
	import { fetchCategories, fetchTypes } from "$lib/functions/db";

	import UploadIcon from "$lib/assets/icons/upload.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import PriceIcon from "$lib/assets/icons/price.svg";
	import TagList from "$lib/components/TagList.svelte";
	import Section from "$lib/components/Section.svelte";
	import Dropdown from "$lib/components/Dropdown.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";
</script>

<FadeIn>
	<div class="space-y-lg">
		<Section title="Titel">
			<input type="text" class=" text-white h-10 w-full rounded-sm bg-gray-500 text-xl" />
		</Section>

		<Section title="Beschreibung">
			<textarea
				class="h-32 w-full rounded-sm bg-gray-500 p-sm text-xl placeholder:text-gray-300 focus:outline-none"
				placeholder="Hier eingeben..."
			></textarea>
		</Section>

		<Section title="Bilder">
			<div class="flex items-center gap-2">
				<img class="h-10 w-10" src={UploadIcon} alt="Bild hinzufügen" />
				<p class="text-lg text-gray-300">Bild hinzufügen</p>
			</div>
		</Section>

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

		<Section title="Schwierigkeit" icon={DifficultyIcon}>
			<Dropdown
				entries={[
					{ id: 1, name: "Einfach" },
					{ id: 2, name: "Mittel" },
					{ id: 3, name: "Schwer" },
				]}
			/>
		</Section>

		<Section title="Zeit" icon={ClockIcon}>
			<Dropdown
				entries={[
					{ id: 5, name: "5 Min." },
					{ id: 10, name: "10 Min." },
					{ id: 15, name: "15 Min." },
				]}
			/>
		</Section>

		<Section title="Preis" icon={PriceIcon}>
			<Dropdown
				entries={[
					{ id: 1, name: "€" },
					{ id: 2, name: "€€" },
					{ id: 3, name: "€€€" },
				]}
			/>
		</Section>

		<Section title="Zutaten">
			<div class="flex items-center gap-2">
				<img class="h-10 w-10" src={UploadIcon} alt="Zutat hinzufügen" />
				<p class="text-lg text-gray-300">Zutat hinzufügen</p>
			</div>
		</Section>

		<Section title="Arbeitsschritte">
			<div class="space-y-sm">
				<p class="text-xl font-semibold text-yellow">1. Schritt</p>
				<textarea
					class="h-32 w-full rounded-sm bg-gray-500 p-sm text-xl placeholder:text-gray-300 focus:outline-none"
					placeholder="Hier eingeben..."
				></textarea>
				<img alt="Close" class="h-10 w-10" src={UploadIcon} />
			</div>
		</Section>

		<button class="h-16 w-full rounded-sm bg-yellow text-xl font-semibold text-gray-900">Rezept veröffentlichen</button>
	</div>
</FadeIn>
