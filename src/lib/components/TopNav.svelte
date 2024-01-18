<script lang="ts">
	import AddIcon from "$lib/assets/icons/add.svg";
	import FilterIcon from "$lib/assets/icons/filter.svg";
	import RecipeIcon from "$lib/assets/icons/recipes.svg";
	import UserIcon from "$lib/assets/icons/ic_user.svg";
	import {onMount} from "svelte";
	import {currentUser} from "$lib/functions/stores";

	let userData;

	let tabs = [
		{ name: "Kochbuch", link: "recipes", icon: RecipeIcon },
		{ name: "Add new", link: "new", icon: AddIcon },
		{ name: "filter", link: "filter", icon: FilterIcon },
	];

	let profileTab = { name: "profile", link: "profile", icon: AddIcon };

	onMount(async () => {
		currentUser.subscribe((value) => {
			userData = value;
		});
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
		<a href={`${userData? profileTab.link : "/login"}`}>
			<div class={`size-14 rounded-full border-yellow border-[2px] overflow-hidden`}>
				{#if userData}
					<img class="rounded-full" alt="profile" src={userData.avatar_url} />
				{:else}
					<img class="rounded-full" alt="profile" src={UserIcon} />
				{/if}
			</div>
		</a>
	</div>
</div>
