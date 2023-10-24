<script lang="ts">
	import AddIcon from "$lib/assets/icons/add.svg";
	import FilterIcon from "$lib/assets/icons/filter.svg";
	import RecipeIcon from "$lib/assets/icons/recipes.svg";

	let tabs = [
		{ name: "Kochbuch", link: "recipes", icon: RecipeIcon },
		{ name: "Add new", link: "new", icon: AddIcon },
		{ name: "filter", link: "filter", icon: FilterIcon },
	];

	let profileTab = { name: "profile", link: "profile", icon: AddIcon };
</script>

<div class="w-full grow-0">
	<div class="flex w-full flex-row items-center justify-between font-default duration-200">
		<!-- Nav -->
		<ul class="flex flex-row gap-10">
			{#each tabs as tab}
				<li>
					<a href={tab.link} class="duration-200">
						<img class="h-6 w-6" alt={tab.name} src={tab.icon} />
					</a>
				</li>
			{/each}
		</ul>

		<!-- Profile -->
		<div>
			<a href={profileTab.link} class="duration-200">
				<div class="h-10 w-10 rounded-full bg-yellow" />
			</a>
		</div>
	</div>
</div>
