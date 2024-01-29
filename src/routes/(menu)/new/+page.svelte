<script lang="ts">
	import { goto } from "$app/navigation";

	import {
		fetchCategories,
		insertRecipe,
		insertRecipeCategories,
		insertRecipeImages,
		insertRecipeIngredients,
		insertRecipeSteps,
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
	import { validateRecipeName, validateRecipeDescription, validateRecipeSteps } from "$lib/functions/validation";

	let recipeName: { content: string; isValid: boolean } = {
		content: "",
		isValid: true,
	};
	let recipeDescription: { content: string; isValid: boolean } = {
		content: "",
		isValid: true,
	};
	let difficulty: FilterValue<number>;
	let preperation_time: FilterValue<number>;
	let cost: FilterValue<number>;
	let categories: { id: number; name: string }[];
	let recipeSteps: { number: number; description: string; isValid: boolean }[] = [
		{
			number: 1,
			description: "",
			isValid: true,
		},
	];

	let ingredients: { name: string; amount: string }[] = [];
	let images: Blob[] = [];
	let loading = false;

	const uploadAndInsertImages = async (files: { recipe_id: number; image: Blob }[]) => {
		const paths = await uploadRecipeImages(files);
		await insertRecipeImages(paths);
	};

	let inputs = [recipeName, recipeDescription, recipeSteps];

	async function publishRecipe() {
		if (!$user || loading) return;
		if (!recipeName.isValid) return;
		if (!recipeDescription.isValid) return;
		if (!recipeSteps.every((step) => step.isValid)) return;

		loading = true;

		try {
			let recipe = await insertRecipe({
				name: recipeName.content,
				description: recipeDescription.content,
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
					recipeSteps.map((step) => ({
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
			<input
				bind:value={recipeName.content}
				on:input={() => (recipeName.isValid = validateRecipeName(recipeName.content))}
				type="text"
				placeholder="Hier eingeben..."
				class="input"
				required
			/>
			{#if !recipeName.isValid}
				<FadeIn>
					<p class="mt-2 rounded-sm bg-red p-2">Ungültiger Rezeptname. Bitte gebe mindestens 10 Zeichen ein.</p>
				</FadeIn>
			{/if}
		</Section>

		<Section title="Beschreibung">
			<textarea
				bind:value={recipeDescription.content}
				on:input={() => (recipeDescription.isValid = validateRecipeDescription(recipeDescription.content))}
				placeholder="Hier eingeben..."
				class="input h-32"
				required
			/>
			{#if !recipeDescription.isValid}
				<FadeIn>
					<p class="mt-2 rounded-sm bg-red p-2">Ungültige Rezeptbeschreibung. Bitte gebe mindestens 30 Zeichen ein.</p>
				</FadeIn>
			{/if}
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
						<img
							src={UploadIcon}
							alt="Bild hochladen"
							class="upload inline h-10 w-10 drop-shadow-md transition-all hover:scale-[1.1]"
						/>
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
									class="input grow-[2] basis-0 text-lg"
									required
								/>
								<input
									type="text"
									bind:value={ingredient.amount}
									placeholder="Anzahl"
									class="input grow-[1] basis-0 text-lg"
								/>
								<button
									type="button"
									on:click={() => {
										ingredients.splice(index, 1);
										ingredients = ingredients;
									}}
									class="rounded-full bg-red p-2 duration-150 hover:bg-[#be4a3a]"
								>
									<img src={RemoveIcon} alt="Zutat entfernen" class="size-3" />
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
						<img
							src={UploadIcon}
							alt="Zutat hinzufügen"
							class="upload inline h-10 w-10 drop-shadow-md transition-all hover:scale-[1.1]"
						/>
					</button>
					<p class="text-lg text-gray-300">Zutat hinzufügen</p>
				</div>
			</div>
		</Section>

		<Section title="Arbeitsschritte">
			<div class="space-y-sm">
				{#each recipeSteps as step, index}
					<div>
						<div class="flex justify-between p-1">
							<p class="text-xl font-semibold text-yellow">{step.number}. Schritt</p>
							{#if index != 0}
								<button
									type="button"
									aria-label="Schritt Entfernen"
									on:click={() => {
										recipeSteps.splice(index, 1);
										recipeSteps = recipeSteps;
									}}
									class="text-gray-300">Entfernen</button
								>
							{/if}
						</div>
						<textarea
							bind:value={step.description}
							on:input={() => (step.isValid = validateRecipeSteps(step.description))}
							placeholder="Hier eingeben..."
							class="input h-32"
							required
						/>

						{#if !step.isValid}
							<FadeIn>
								<p class="mt-2 rounded-sm bg-red p-2">Bitte gebe mindestens 30 Zeichen pro schritt ein.</p>
							</FadeIn>
						{/if}
					</div>
				{/each}
				<div class="flex items-center gap-2">
					<button
						type="button"
						aria-label="Schritt hinzufügen"
						on:click={() => {
							recipeSteps.push({ number: recipeSteps.length + 1, description: "", isValid: true });
							recipeSteps = recipeSteps;
						}}
						class="transition-all hover:scale-[1.1]"
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
