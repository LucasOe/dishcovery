<script lang="ts">
	import AddIcon from '$lib/assets/icons/add.svg';
	import FilterIcon from '$lib/assets/icons/filter.svg';
	import RecipeIcon from '$lib/assets/icons/recipes.svg';

	let tabs = [
		{ name: 'Kochbuch', link: 'recipes', icon: RecipeIcon },
		{ name: 'Add new', link: 'add-recipe', icon: AddIcon },
		{ name: 'filter', link: 'filter', icon: FilterIcon }
	];

	let profileTab = { name: 'profile', link: 'profile', icon: AddIcon };
</script>

<header class="w-full grow-0">
	<!-- Navigation bar -->
	<div
		class="w-full flex flex-row justify-between items-center font-default duration-200 pt-10 pb-5 px-4"
	>
		<!-- Nav -->
		<ul class="flex flex-row gap-10">
			{#each tabs as tab}
				<li>
					<a href={tab.link} class="duration-200">
						<img class="w-6 h-6" alt={tab.name} src={tab.icon} />
					</a>
				</li>
			{/each}
		</ul>

		<!-- Profile -->
		<div>
			<a href={profileTab.link} class="duration-200">
				<div class="h-10 w-10 bg-yellow rounded-full" />
			</a>
		</div>
	</div>
</header>
