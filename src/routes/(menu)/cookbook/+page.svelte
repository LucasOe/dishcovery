<script lang="ts">
  import type { Recipe } from "$types/database.types";
  import { fetchRecipesInCookBook, removeRecipeFromCookBook, deleteRecipe } from "$lib/functions/database/recipes";
  import { fetchUserRecipes } from "$lib/functions/database/user";
  import { user } from "$lib/functions/stores";
  import FadeIn from "$lib/components/FadeIn.svelte";
  import RecipeCard from "$lib/components/RecipeCard.svelte";
	import DeleteModal from "$lib/components/DeleteModal.svelte";


  let allRecipes: Recipe[] = [];
  let userRecipes: Recipe[] = [];
  let showCookBook = true;

  // Reactive statements to fetch recipes when user changes
  $: {
    if ($user) {
      fetchAllRecipes();
      fetchUserSpecificRecipes();
    }
  }

  async function fetchAllRecipes() {
    if ($user) {
      const cookBookRecipes = await fetchRecipesInCookBook($user.id);
      const otherUserRecipes = await fetchUserRecipes($user.id);
      allRecipes = [...cookBookRecipes, ...otherUserRecipes];
    }
  }

  async function fetchUserSpecificRecipes() {
    if ($user) {
      userRecipes = await fetchUserRecipes($user.id);
      console.log('User Recipes:', userRecipes);
    }
  }

  function toggleRecipes() {
    showCookBook = !showCookBook;
  }

  let showModal = false;
  let selectedRecipeId: number | null = null;

  function promptDelete(id: number) {
    showModal = true;
    selectedRecipeId = id;
  }

  function confirmDelete() {
    if (selectedRecipeId !== null) {
      onDeleteWrapper(selectedRecipeId);
    }
    closeModal();
  }

  function closeModal() {
    showModal = false;
    selectedRecipeId = null;
  }

  async function onDeleteWrapper(id: number) {
    if ($user) {
      await removeRecipeFromCookBook($user.id, id);
      await deleteRecipe(id); 
      fetchAllRecipes(); 
      fetchUserSpecificRecipes(); 
    }
  }
 
</script>

<FadeIn>
  {#if showModal}
    <DeleteModal
      message="Möchtest du dieses Rezept wirklich löschen?"
      onConfirm={confirmDelete}
      onCancel={closeModal}
    />
  {/if}
  <div class="space-y-8">
    <div class="mb-4">
      <button on:click={toggleRecipes} class="mt-lg flex font-bold text-gray-300">
        {#if showCookBook}
          Deine Rezepte anzeigen
        {:else}
          Alle Rezepte anzeigen
        {/if}
      </button>
    </div>

    {#if showCookBook}
      {#if allRecipes.length > 0}
        <div class="space-y-sm">
          <h2 class="text-2xl font-bold">Alle Rezepte</h2>
          {#key allRecipes}
            {#each allRecipes as recipe}
              <RecipeCard {recipe} onDeleteRequest={promptDelete} />
            {/each}
          {/key}
        </div>
      {:else}
        <p>Keine Rezepte gefunden.</p>
      {/if}
    {:else if userRecipes.length > 0}
      <div>
        <h2 class="text-2xl font-bold">Deine Rezepte</h2>
        {#key userRecipes}
          {#each userRecipes as recipe}
            <div class="pb-md">
              <RecipeCard {recipe} onDeleteRequest={promptDelete} />
            </div>
          {/each}
        {/key}
      </div>
    {:else}
      <p>Keine eigenen Rezepte gefunden.</p>
    {/if}
  </div>
</FadeIn>
