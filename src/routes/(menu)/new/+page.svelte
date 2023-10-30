<script lang="ts">
	import { onMount } from "svelte";

	import UploadIcon from "$lib/assets/icons/upload.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import PriceIcon from "$lib/assets/icons/price.svg";
	import TagList from "$lib/components/TagList.svelte";
	import Section from "$lib/components/Section.svelte";
	import Dropdown from "$lib/components/Dropdown.svelte";
</script>

<div class="space-y-lg">
	<Section title="Titel">
		<input type="text" id="title" class=" text-white h-10 w-full rounded-sm bg-[#2A2A2A] text-xl" />
	</Section>

	<Section title="Beschreibung">
		<textarea
			class="h-32 w-full rounded-sm bg-gray-500 p-sm text-xl focus:outline-none"
			placeholder="Hier eingeben..."
		/>
	</Section>

	<Section title="Bilder">
		<div class="flex items-center gap-2">
			<img class="h-10 w-10" src={UploadIcon} alt="Bild hinzufügen" />
			<p>Bild hinzufügen</p>
		</div>
	</Section>

	<Section title="Art">
		<TagList tags={["Frühstück", "Abendessen", "Snack", "Gebäck", "Cocktail"]} />
	</Section>

	<Section title="Kategorie">
		<TagList
			tags={["Vegetarisch", "Vegan", "Pizza", "Ohne Nüsse", "Burger", "Herzhaft", "Wenig Zutaten", "Salat", "Schnell"]}
		/>
	</Section>

	<Section title="Schwierigkeit" icon={DifficultyIcon}>
		<Dropdown entries={["leicht", "mittel", "schwer"]} />
	</Section>

	<Section title="Zeit" icon={ClockIcon}>
		<Dropdown entries={["5 Min.", "10 Min.", "15 Min.", "20 Min.", "25 Min.", "30 Min."]} />
	</Section>

	<Section title="Preis" icon={PriceIcon}>
		<Dropdown entries={["€", "€€", "€€€"]} />
	</Section>

	<Section title="Zutaten">
		<div class="flex items-center gap-2">
			<img class="h-10 w-10" src={UploadIcon} alt="Zutat hinzufügen" />
			<p>Zutat hinzufügen</p>
		</div>
	</Section>

	<!-- Worksteps -->

	<Section title="Arbeitsschritte">
		<div class="space-y-sm">
			<p class=" block text-xl font-semibold text-[#FFC532]">1.Schritt</p>
			<textarea
				class="h-32 w-full rounded-sm bg-gray-500 p-sm text-xl focus:outline-none"
				placeholder="Hier eingeben..."
			/>
			<img alt="Close" class="h-10 w-10" src={UploadIcon} />
		</div>
	</Section>

	<button class="h-16 w-full rounded-sm bg-[#FFC532] text-xl font-semibold text-[#212121]">
		Rezept veröffentlichen
	</button>
</div>
