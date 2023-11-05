<script>
	import { fetchCategories, fetchTypes } from "$lib/functions/db";

	import FadeIn from "$lib/components/FadeIn.svelte";
	import Section from "$lib/components/Section.svelte";
	import TagList from "$lib/components/TagList.svelte";

</script>



<FadeIn>
	<div class="space-y-lg">
		<Section title="Titel">
			
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

<section>
	
		<div class="flex items-center">
	<div class="mr-20">Bewertung</div>
	
			<div class="flex items-center flex-col justify-center text-center">
				<input type="radio" name="options"  id="option1">
	
			</div>
			
			<div class="flex items-center flex-grow">
				<div class="border-t border-r border-b border-gray-500 flex-grow h-1"></div>
			</div>
			
			<div class="flex items-center flex-col justify-center text-center">
				<input type="radio" name="options" class="" id="option2">
			
			</div>
	
			<div class="flex items-center flex-grow">
				<div class="border-t border-r border-b border-gray-500 flex-grow h-1"></div>
			</div>
			<div class="flex items-center flex-col justify-center text-center">
				<input type="radio" name="options" class="" id="option2">
			
			</div>
	
			<div class="flex items-center flex-grow">
				<div class="border-t border-r border-b border-gray-500 flex-grow h-1"></div>
			</div>
			<div class="flex items-center flex-col justify-center text-center">
				<input type="radio" name="options" class="" id="option2">
			</div>			
		</div>


	
	

	
	
	
</section>

<section>
	<button class="h-16 w-full rounded-sm bg-yellow text-xl font-semibold text-gray-900">Filter anwenden</button>
</section>
	</div>
</FadeIn>
