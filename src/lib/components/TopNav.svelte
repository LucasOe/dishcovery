<script lang="ts">
	import AddIcon from "$lib/assets/icons/add.svg";
	import FilterIcon from "$lib/assets/icons/filter.svg";
	import RecipeIcon from "$lib/assets/icons/recipes.svg";
	import UserIcon from "$lib/assets/icons/ic_user.svg";
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
			<div class={`size-14 rounded-full border-yellow border-[2px] overflow-hidden`}>
				{#if user}
					<img class="rounded-full" alt="profile" src={user.avatar_url} />
				{:else}
					<img class="rounded-full" alt="profile" src={UserIcon} />
				{/if}
			</div>
		</a>
	</div>
</div>
