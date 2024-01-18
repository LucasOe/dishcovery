<script lang="ts">
	import {
		fetchCategories,
		fetchTypes,
		insertRecipe,
		insertRecipeCategories,
		insertRecipeImages,
		insertRecipeTypes,
		uploadRecipeImages,
	} from "$lib/functions/database/recipes";
	import UploadIcon from "$lib/assets/icons/upload.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import PriceIcon from "$lib/assets/icons/price.svg";
	import TagList from "$lib/components/TagList.svelte";
	import Section from "$lib/components/Section.svelte";
	import Dropdown from "$lib/components/Dropdown.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import type { DisplayValue } from "$types/database.types";
	import { goto } from "$app/navigation";

	let name: string;
	let description: string;
	let types: DisplayValue[];
	let categories: DisplayValue[];
	let difficulty: DisplayValue;
	let preperation_time: DisplayValue;
	let cost: DisplayValue;
	let images: Blob[] = [];
	let steps: string[] = [""];

	const uploadAndInsertImages = async (id: number, images: Blob[]) => {
		const paths = await uploadRecipeImages(id, images);
		await insertRecipeImages(id, paths);
	};

	async function publishRecipe() {
		let id = await insertRecipe({
			name: name,
			description: description,
			difficulty: difficulty.id,
			cost: cost.id,
			preperation_time: preperation_time.id,
		});

		// prettier-ignore
		await Promise.all([
			insertRecipeCategories(id, categories.map((category) => category.id)),
			insertRecipeTypes(id, types.map((type) => type.id)),
			uploadAndInsertImages(id, images),
		]);

		goto(`/recipe/${id}`);
	}

	let fileInput: HTMLInputElement;

	function onFileSelected(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!e.currentTarget.files) return null;
		for (const file of e.currentTarget.files) images.push(file);
		images = images;
	}
</script>

<!-- svelte-ignore missing-declaration -->
<FadeIn>
	<div class="space-y-lg">
		<Section title="Titel">
			<input bind:value={name} type="text" class="text-white h-10 w-full rounded-sm bg-gray-500 text-xl" />
		</Section>

		<Section title="Beschreibung">
			<textarea
				bind:value={description}
				class="h-32 w-full rounded-sm bg-gray-500 p-sm text-xl placeholder:text-gray-300 focus:outline-none"
				placeholder="Hier eingeben..."
			></textarea>
		</Section>

		<Section title="Bilder">
			<input class="hidden" type="file" accept=".jpg, .jpeg, .png" on:change={onFileSelected} bind:this={fileInput} />
			<button class="inline" on:click={() => fileInput.click()}>
				<img class="upload inline h-10 w-10 drop-shadow-md" src={UploadIcon} alt="" />
			</button>
			<p class="inline pl-2">Bilder hochladen</p>
		</Section>

		{#if images.length > 0}
			<Section title="Bilder Vorschau">
				<div class="grid grid-cols-4 gap-4">
					{#each images as image}
						<img src={URL.createObjectURL(image)} alt="Bildvorschau" />
					{/each}
				</div>
			</Section>
		{/if}

		{#await fetchTypes() then _types}
			<Section title="Art">
				<TagList bind:selected={types} tags={_types} />
			</Section>
		{/await}

		{#await fetchCategories() then _categories}
			<Section title="Kategorie">
				<TagList bind:selected={categories} tags={_categories} />
			</Section>
		{/await}

		<Section title="Schwierigkeit" icon={DifficultyIcon}>
			<Dropdown
				bind:selected={difficulty}
				entries={[
					{ id: 1, name: "Einfach" },
					{ id: 2, name: "Mittel" },
					{ id: 3, name: "Schwer" },
				]}
			/>
		</Section>

		<Section title="Zeit" icon={ClockIcon}>
			<Dropdown
				bind:selected={preperation_time}
				entries={[
					{ id: 5, name: "5 Min." },
					{ id: 10, name: "10 Min." },
					{ id: 15, name: "15 Min." },
				]}
			/>
		</Section>

		<Section title="Preis" icon={PriceIcon}>
			<Dropdown
				bind:selected={cost}
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
			{#each steps as step, index}
				<div class="space-y-sm">
					<p class="text-xl font-semibold text-yellow">{index + 1}. Schritt</p>
					<textarea
						bind:value={step}
						class="h-32 w-full rounded-sm bg-gray-500 p-sm text-xl placeholder:text-gray-300 focus:outline-none"
						placeholder="Hier eingeben..."
					/>
				</div>
			{/each}
			<button
				on:click={() => {
					steps.push("");
					steps = steps;
				}}
				class="mt-sm"
			>
				<img alt="Close" class="size-10" src={UploadIcon} />
			</button>
		</Section>
		<button on:click={publishRecipe} class="h-16 w-full rounded-sm bg-yellow text-xl font-semibold text-gray-900">
			Rezept veröffentlichen
		</button>
	</div>
</FadeIn>
