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
	import RemoveIcon from "$lib/assets/icons/cancel.svg";
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

<FadeIn>
	<form on:submit|preventDefault={publishRecipe} class="space-y-lg">
		<Section title="Titel">
			<input bind:value={name} placeholder="Hier eingeben..." class="input" required />
		</Section>

		<Section title="Beschreibung">
			<textarea bind:value={description} placeholder="Hier eingeben..." class="input h-32" required />
		</Section>

		<Section title="Bilder">
			<input
				class="hidden"
				type="file"
				accept=".jpg, .jpeg, .png"
				on:change={onFileSelected}
				bind:this={fileInput}
				required
			/>
			<button type="button" class="inline" on:click={() => fileInput.click()}>
				<img class="upload inline h-10 w-10 drop-shadow-md" src={UploadIcon} alt="" />
			</button>
			<p class="inline pl-2">Bilder hochladen</p>
		</Section>

		{#if images.length > 0}
			<Section title="Bilder Vorschau">
				<div class="grid grid-cols-4 gap-4">
					{#each images as image, index}
						<div class="relative aspect-[3/5] overflow-hidden rounded-md">
							<button
								type="button"
								on:click={() => {
									images.splice(index, 1);
									images = images;
								}}
								class="absolute right-0 top-0 m-1 rounded-full bg-red p-2 drop-shadow-xl duration-150 hover:bg-[#be4a3a]"
							>
								<img src={RemoveIcon} alt="Remove" class="size-4" />
							</button>
							<img src={URL.createObjectURL(image)} alt="Bildvorschau" class="h-full object-cover" />
						</div>
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
			<div class="space-y-sm">
				{#each steps as step, index}
					<div>
						<div class="flex justify-between p-1">
							<p class="text-xl font-semibold text-yellow">{index + 1}. Schritt</p>
							{#if index != 0}
								<button
									type="button"
									on:click={() => {
										steps.splice(index, 1);
										steps = steps;
									}}
									class="text-gray-300">Remove</button
								>
							{/if}
						</div>
						<textarea bind:value={step} placeholder="Hier eingeben..." class="input h-32" required />
					</div>
				{/each}
			</div>
			<button
				type="button"
				on:click={() => {
					steps.push("");
					steps = steps;
				}}
				class="mt-sm"
			>
				<img alt="Close" class="size-10" src={UploadIcon} />
			</button>
		</Section>

		<button class="h-16 w-full rounded-sm bg-yellow text-xl font-semibold text-gray-900">
			Rezept veröffentlichen
		</button>
	</form>
</FadeIn>
