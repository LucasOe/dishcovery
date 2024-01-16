<script lang="ts">
	import AddIcon from "$lib/assets/icons/add.svg";
	import FilterIcon from "$lib/assets/icons/filter.svg";
	import RecipeIcon from "$lib/assets/icons/recipes.svg";
	import {onMount} from "svelte";
	import {fetchCurrentUser} from "$lib/functions/db";

	let tabs = [
		{ name: "Kochbuch", link: "recipes", icon: RecipeIcon },
		{ name: "Add new", link: "new", icon: AddIcon },
		{ name: "filter", link: "filter", icon: FilterIcon },
	];

	let profileTab = { name: "profile", link: "profile", icon: AddIcon };
	let user;

	onMount(async () => {
		user = await fetchCurrentUser();
	});
</script>

<div class="flex items-center justify-between">
	<!-- Nav -->
	<div class="flex gap-xl">
		{#each tabs as tab}
			<a href={tab.link}>
				<img class="size-6" alt={tab.name} src={tab.icon} />
			</a>
		{/each}
	</div>

	<!-- Profile -->
	<div>
		<a href={profileTab.link}>
			<div class="size-10 rounded-full bg-yellow" />
		</a>
	</div>
</div>
