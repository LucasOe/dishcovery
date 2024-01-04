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
    import type { Entry } from "$types/dropdown.types";

    //Textfield
    import { onMount } from "svelte";

    let textFields: { id: number; value: string }[] = [];
    let nextTextFieldId = 0;

    function addTextField() {
        const newTextField = {
            id: nextTextFieldId++,
            value: "",
        };
        textFields = [...textFields, newTextField];
    }

    onMount(() => {
        addTextField();
    });

    let title: string;
    let description: string;
    let types: string[];
    let categories: string[];
    let difficulty: Entry;
    let preperation_time: Entry;
    let cost: Entry;

    function logRecipe() {
        let recipe = {
            title: title,
            description: description,
            types: types,
            categories: categories,
            difficulty: difficulty.id,
            preperation_time: preperation_time.id,
            cost: cost.id,
        };

        console.log(recipe);
    }

    //picture
    let preview: any, fileInput: HTMLInputElement;
    const onFileSelected = (e: { target: { files: (Blob | MediaSource)[] } }) =>
        (preview = e.target.files[0] && URL.createObjectURL(e.target.files[0]));
</script>

<FadeIn>
    <div class="space-y-lg">
        <Section title="Titel">
            <input bind:value={title} type="text" class="text-white h-10 w-full rounded-sm bg-gray-500 text-xl" />
        </Section>

        <Section title="Beschreibung">
            <textarea
                bind:value={description}
                class="h-32 w-full rounded-sm bg-gray-500 p-sm text-xl placeholder:text-gray-300 focus:outline-none"
                placeholder="Hier eingeben..."
            ></textarea>
        </Section>

        <Section title="Bilder">
            <img class="upload inline h-10 w-10 drop-shadow-md" src={UploadIcon} alt="" on:click={() => fileInput.click()} />
            <div class="chan" on:click={() => fileInput.click()}></div>
            <input
                style="display:none"
                type="file"
                accept=".jpg, .jpeg, .png"
                on:change={onFileSelected}
                bind:this={fileInput}
            />
            <p class="mt-2.5">Bilder hochladen</p>
        </Section>

        <Section title="Preview">
            <img class="preview" src={preview} alt="" />
        </Section>

        {#await fetchTypes() then _types}
            <Section title="Art">
                <TagList bind:selected={types} tags={_types.map((type) => type.name)} />
            </Section>
        {/await}

        {#await fetchCategories() then _categories}
            <Section title="Kategorie">
                <TagList bind:selected={categories} tags={_categories.map((category) => category.name)} />
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
            {#each textFields as textField, index (textField.id)}
                <div class="space-y-sm">
                    <p class="text-xl font-semibold text-yellow">{index + 1}. Schritt</p>
                    <textarea
                        bind:value={textField.value}
                        class="h-32 w-full rounded-sm bg-gray-500 p-sm text-xl placeholder:text-gray-300 focus:outline-none"
                        placeholder="Hier eingeben..."
                    ></textarea>
                    <button on:click={addTextField}><img alt="Close" class="h-10 w-10" src={UploadIcon} /></button>
                </div>
            {/each}
        </Section>
        <button on:click={logRecipe} class="h-16 w-full rounded-sm bg-yellow text-xl font-semibold text-gray-900">
            Rezept veröffentlichen
        </button>
    </div>
</FadeIn>

