<script lang="ts">
	import { goto } from "$app/navigation";

	import {
		deleteRecipe,
		fetchCategories,
		insertRecipe,
		insertRecipeCategories,
		insertRecipeImages,
		insertRecipeIngredients,
		insertRecipeSteps,
		uploadRecipeImages,
	} from "$lib/functions/database/recipes";
	import { user } from "$lib/functions/stores";

	import {
		validateRecipeName,
		validateRecipeDescription,
		validateRecipeSteps,
		validateImages,
	} from "$lib/functions/validation";
	import type { FilterValue } from "$types/filter.types";
	import { range } from "$lib/functions/utils";

	import UploadSVG from "$lib/components/UploadSVG.svelte";
	import TagList from "$lib/components/TagList.svelte";
	import Section from "$lib/components/Section.svelte";
	import Dropdown from "$lib/components/Dropdown.svelte";
	import Error from "$lib/components/Error.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";

	import RemoveIcon from "$lib/assets/icons/cancel.svg";
	import DifficultyIcon from "$lib/assets/icons/difficulty.svg";
	import PriceIcon from "$lib/assets/icons/price.svg";
	import ClockIcon from "$lib/assets/icons/clock.svg";
	import TagIcon from "$lib/assets/icons/tag.svg";

	let recipeName = { content: "", isValid: false };
	let recipeDescription = { content: "", isValid: false };
	let difficulty: FilterValue<number>;
	let preperation_time: FilterValue<number>;
	let cost: FilterValue<number>;
	let categories: { id: number; name: string }[];
	let recipeSteps = [
		{
			number: 1,
			description: "",
			isValid: false,
		},
	];
	let ingredients: { name: string; amount: string }[] = [];
	let images: { content: Blob[]; isValid: boolean } = { content: [], isValid: false };

	let loading = false;

	const uploadAndInsertImages = async (files: { recipe_id: number; image: Blob }[]) => {
		const paths = await uploadRecipeImages(files);
		await insertRecipeImages(paths);
	};

	async function publishRecipe() {
		if (!$user) return;
		if (loading) return;
		if (!recipeName.isValid) return;
		if (!recipeDescription.isValid) return;
		if (!images.isValid) return;
		if (!recipeSteps.every((step) => step.isValid)) return;

		loading = true;

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
				images.content.map((image) => ({
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
		])
			.then(() => {
				goto(`/recipe/${recipe.id}`);
			})
			.catch(() => {
				deleteRecipe(recipe.id);
			});
	}

	let fileInput: HTMLInputElement;

	function onFileSelected(e: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		if (!e.currentTarget.files) return null;
		for (const file of e.currentTarget.files) images.content.push(file);
		images = images;
		images.isValid = validateImages(images.content);
	}
</script>

{#if $user}
	{#await fetchCategories() then _categories}
		<FadeIn>
			<form on:submit|preventDefault={publishRecipe} class="space-y-lg">
				<Section title="Titel" required>
					<input
						bind:value={recipeName.content}
						on:input={() => (recipeName.isValid = validateRecipeName(recipeName.content))}
						type="text"
						placeholder="Hier eingeben..."
						class="input peer"
						required
					/>
					<Error visible={!recipeName.isValid}>Der Name braucht mindestens 10 Zeichen.</Error>
				</Section>

				<Section title="Beschreibung" required>
					<textarea
						bind:value={recipeDescription.content}
						on:input={() => (recipeDescription.isValid = validateRecipeDescription(recipeDescription.content))}
						placeholder="Hier eingeben..."
						class="input peer h-32"
						required
					/>
					<Error visible={!recipeDescription.isValid}>Die Beschreibung braucht mindestens 30 Zeichen.</Error>
				</Section>

				<Section title="Bilder" required>
					<div class="space-y-4">
						<div class="flex items-center gap-2">
							<input
								type="file"
								accept=".jpg, .jpeg, .png"
								on:change={onFileSelected}
								bind:this={fileInput}
								class="focus rounded-sm file:mr-2 file:rounded-sm file:border-solid file:border-yellow file:bg-gray-900 file:px-3 file:py-2 file:text-yellow file:hover:bg-gray-500"
								multiple
								required
							/>
						</div>

						{#if images.content.length > 0}
							<div class="grid grid-cols-4 gap-4">
								{#each images.content as image, index}
									<div class="relative aspect-[3/5] overflow-hidden rounded-md">
										<button
											type="button"
											on:click={() => {
												images.content.splice(index, 1);
												images = images;
												images.isValid = validateImages(images.content);
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
					<Error visible={!images.isValid} class="mt-2 block">Das Rezept benötigt 1 bis maximal 4 Bilder.</Error>
				</Section>
				<Section title="Kategorie" icon={TagIcon}>
					<TagList tags={_categories} bind:selected={categories} />
				</Section>

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
							name: `${value} min.`,
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
											class="focus rounded-full bg-red p-2 duration-150 hover:bg-[#be4a3a]"
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
								class="focus h-10 w-10 rounded-[.8rem]"
							>
								<UploadSVG />
							</button>
							<p class="text-lg text-gray-300">Zutat hinzufügen</p>
						</div>
					</div>
				</Section>

				<Section title="Arbeitsschritte" required>
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
												recipeSteps.forEach((step) => {
													if (step.number > index) step.number -= 1;
												});
												recipeSteps = recipeSteps;
											}}
											class="focus rounded-sm text-gray-300 hover:underline hover:opacity-80">Entfernen</button
										>
									{/if}
								</div>
								<textarea
									bind:value={step.description}
									on:input={() => (step.isValid = validateRecipeSteps(step.description))}
									placeholder="Hier eingeben..."
									minlength="30"
									class="input peer h-32"
									required
								/>
								<Error visible={!step.isValid}>Bitte gebe mindestens 30 Zeichen pro Schritt ein.</Error>
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
								class="focus h-10 w-10 rounded-[.8rem]"
							>
								<UploadSVG />
							</button>
							<p class="text-lg text-gray-300">Schritt hinzufügen</p>
						</div>
					</div>
				</Section>

				<button class="button my-6">Rezept veröffentlichen</button>
			</form>
			{#if loading}
				<div class="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
					<div class="h-32 w-32 animate-spin rounded-full border-t-8 border-yellow"></div>
				</div>
			{/if}
		</FadeIn>
	{/await}
{:else}
	<p>Du musst angemeldet sein, um diese Seite zu sehen. Bitte melde dich an.</p>
	<a href="/login" class="button flex h-12 w-36 items-center justify-center p-0">Zum Login</a>
{/if}
