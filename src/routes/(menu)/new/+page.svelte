<script lang="ts">
	import type { Enums, Tables } from "../../../database.types";
	import { supabase } from "$lib/functions/createClient";
	import { onMount } from "svelte";

	import UploadIcon from "$lib/assets/icons/upload.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import PriceIcon from "$lib/assets/icons/price.svg";
	import TagList from "$lib/components/TagList.svelte";
	import Section from "$lib/components/Section.svelte";
	import Dropdown from "$lib/components/Dropdown.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";

	let types: Tables<"types">[] = [];
	let categories: Tables<"categories">[] = [];
	let difficulty: Enums<"difficulty">[] = ["einfach", "fortgeschritten", "schwer"];
	let duration: Enums<"duration">[] = ["< 5", "5", "10", "15", "20", "30", "45", "60", "90", "180", "240", "240 <"];
	let price: Enums<"price">[] = ["€", "€€", "€€€"];

	onMount(() => {
		fetchTypes();
		fetchCategories();
	});

	const fetchTypes = async () => {
		let { data } = await supabase.from("types").select(`*`);
		if (data) types = data;
	};

	const fetchCategories = async () => {
		let { data } = await supabase.from("categories").select(`*`);
		if (data) categories = data;
	};
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

		<Section title="Art">
			<TagList tags={categories.map((category) => category.name)} />
		</Section>

		<Section title="Kategorie">
			<TagList tags={types.map((type) => type.name)} />
		</Section>

		<Section title="Schwierigkeit" icon={DifficultyIcon}>
			<Dropdown entries={difficulty.map((difficulty) => ({ id: difficulty, name: difficulty }))} />
		</Section>

		<Section title="Zeit" icon={ClockIcon}>
			<Dropdown entries={duration.map((duration) => ({ id: duration, name: `${duration} Min.` }))} />
		</Section>

		<Section title="Preis" icon={PriceIcon}>
			<Dropdown entries={price.map((price) => ({ id: price, name: price }))} />
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
