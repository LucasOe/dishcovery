<script lang="ts">
	import { goto } from "$app/navigation";

	import {
		fetchCategories,
		fetchTypes,
		insertRecipe,
		insertRecipeCategories,
		insertRecipeImages,
		insertRecipeIngredients,
		insertRecipeSteps,
		insertRecipeTypes,
		uploadRecipeImages,
	} from "$lib/functions/database/recipes";
	import { user } from "$lib/functions/stores";

	import UploadIcon from "$lib/assets/icons/upload.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import PriceIcon from "$lib/assets/icons/price.svg";
	import TagList from "$lib/components/TagList.svelte";
	import Section from "$lib/components/Section.svelte";
	import Dropdown from "$lib/components/Dropdown.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import RemoveIcon from "$lib/assets/icons/cancel.svg";
	import { range } from "$lib/functions/utils";
	import type { FilterValue } from "$types/filter.types";

	let name: string;
	let description: string;
	let difficulty: FilterValue<number>;
	let preperation_time: FilterValue<number>;
	let cost: FilterValue<number>;
	let types: { id: number; name: string }[];
	let categories: { id: number; name: string }[];
	let steps: { number: number; description: string }[] = [{ number: 0, description: "" }];
	let ingredients: { name: string; amount: string }[] = [];
	let images: Blob[] = [];
	let loading = false;

	const uploadAndInsertImages = async (files: { recipe_id: number; image: Blob }[]) => {
		const paths = await uploadRecipeImages(files);
		await insertRecipeImages(paths);
	};

	async function publishRecipe() {
		if (!$user || loading) return;

		loading = true;

		try {
			let recipe = await insertRecipe({
				name: name,
				description: description,
				difficulty: difficulty.id,
				cost: cost.id,
				preperation_time: preperation_time.id,
				user_id: $user.id,
			});

			await Promise.all([
				uploadAndInsertImages(
					images.map((image) => ({
						recipe_id: recipe.id,
						image: image,
					}))
				),
				insertRecipeTypes(
					types.map((type) => ({
						recipe_id: recipe.id,
						type_id: type.id,
					}))
				),
				insertRecipeCategories(
					categories.map((category) => ({
						recipe_id: recipe.id,
						category_id: category.id,
					}))
				),
				insertRecipeIngredients(
					ingredients.map((ingredient) => ({
						recipe_id: recipe.id,
						name: ingredient.name,
						amount: ingredient.amount,
					}))
				),
				insertRecipeSteps(
					steps.map((step) => ({
						recipe_id: recipe.id,
						number: step.number,
						description: step.description,
					}))
				),
			]);

			goto(`/recipe/${recipe.id}`);
		} catch (error) {
			console.error("Fehler beim Veröffentlichen des Rezepts:", error);
		} finally {
			loading = false;
		}
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
			<input type="text" bind:value={name} placeholder="Hier eingeben..." class="input" required />
		</Section>

		<Section title="Beschreibung">
			<textarea bind:value={description} placeholder="Hier eingeben..." class="input h-32" required />
		</Section>

		<Section title="Bilder">
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<input
						type="file"
						accept=".jpg, .jpeg, .png"
						on:change={onFileSelected}
						bind:this={fileInput}
						class="hidden"
						required
					/>
					<button type="button" aria-label="Bild hochladen" on:click={() => fileInput.click()}>
						<img src={UploadIcon} alt="Bild hochladen" class="upload inline h-10 w-10 drop-shadow-md" />
					</button>
					<p class="text-lg text-gray-300">Bild hochladen</p>
				</div>

				{#if images.length > 0}
					<div class="grid grid-cols-4 gap-4">
						{#each images as image, index}
							<div class="relative aspect-[3/5] overflow-hidden rounded-md">
								<button
									type="button"
									on:click={() => {
										images.splice(index, 1);
										images = images;
									}}
									class="absolute right-0 top-0 m-1 rounded-full bg-red p-2 duration-150 hover:bg-[#be4a3a]"
								>
									<img src={RemoveIcon} alt="Bild entfernen" class="size-4" />
								</button>
								<img src={URL.createObjectURL(image)} alt="Bildvorschau" class="h-full object-cover" />
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</Section>

		{#await fetchTypes() then _types}
			<Section title="Art">
				<TagList tags={_types} bind:selected={types} />
			</Section>
		{/await}

		{#await fetchCategories() then _categories}
			<Section title="Kategorie">
				<TagList tags={_categories} bind:selected={categories} />
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
				entries={range(5, 60, 5).map((value) => ({
					id: value,
					name: `${value} Min.`,
				}))}
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
			<div class="space-y-4">
				{#if ingredients.length > 0}
					<div class="flex flex-col gap-2">
						{#each ingredients as ingredient, index}
							<div class="flex items-center gap-2">
								<input
									type="text"
									bind:value={ingredient.name}
									placeholder="Zutat"
									class="input h-8 grow-[2] basis-0 text-lg"
									required
								/>
								<input
									type="text"
									bind:value={ingredient.amount}
									placeholder="Anzahl"
									class="input h-8 grow-[1] basis-0 text-lg"
								/>
								<button
									type="button"
									on:click={() => {
										ingredients.splice(index, 1);
										ingredients = ingredients;
									}}
									class="rounded-full bg-red p-2 duration-150 hover:bg-[#be4a3a]"
								>
									<img src={RemoveIcon} alt="Bild entfernen" class="size-3" />
								</button>
							</div>
						{/each}
					</div>
				{/if}

				<div class="flex items-center gap-2">
					<button
						type="button"
						aria-label="Zutat hinzufügen"
						on:click={() => {
							ingredients.push({ name: "", amount: "" });
							ingredients = ingredients;
						}}
						class="h-10 w-10"
					>
						<img src={UploadIcon} alt="Zutat hinzufügen" class="upload inline h-10 w-10 drop-shadow-md" />
					</button>
					<p class="text-lg text-gray-300">Zutat hinzufügen</p>
				</div>
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
									aria-label="Schritt Entfernen"
									on:click={() => {
										steps.splice(index, 1);
										steps = steps;
									}}
									class="text-gray-300">Entfernen</button
								>
							{/if}
						</div>
						<textarea bind:value={step.description} placeholder="Hier eingeben..." class="input h-32" required />
					</div>
				{/each}
				<div class="flex items-center gap-2">
					<button
						type="button"
						aria-label="Schritt hinzufügen"
						on:click={() => {
							steps.push({ number: steps.length, description: "" });
							steps = steps;
						}}
					>
						<img src={UploadIcon} alt="Schritt hinzufügen" class="size-10" />
					</button>
					<p class="text-lg text-gray-300">Schritt hinzufügen</p>
				</div>
			</div>
		</Section>

		<button
			class="mt-5 h-16 w-full rounded-sm border-sm border-yellow bg-yellow text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow"
		>
			Rezept veröffentlichen
		</button>
	</form>
	{#if loading}
		<div class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
			<div class="h-32 w-32 animate-spin rounded-full border-t-8 border-yellow"></div>
		</div>
	{/if}
</FadeIn>
