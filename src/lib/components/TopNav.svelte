<script lang="ts">
	import AddIcon from "$lib/assets/icons/add.svg";
	import FilterIcon from "$lib/assets/icons/filter.svg";
	import RecipeIcon from "$lib/assets/icons/recipes.svg";
	import UserIcon from "$lib/assets/icons/ic_user.svg";
	import { user } from "$lib/functions/stores";
</script>

<div class="flex items-center justify-between">
	<!-- Nav -->
	<div class="flex gap-xl">
		{#if $user}
			<a href="/cookbook">
				<img class="size-6" alt="Kochbuch" src={RecipeIcon} />
			</a>
			<a href="/new">
				<img class="size-6" alt="Neues Rezept" src={AddIcon} />
			</a>
		{/if}
		<a href="/filter">
			<img class="size-6" alt="Rezepte Filtern" src={FilterIcon} />
		</a>
	</div>

	<!-- Profile -->
	<div>
		<a href={`${$user ? `/profile/${$user.username}` : "/login"}`}>
			<div class={`size-14 overflow-hidden rounded-full border-[2px] border-yellow`}>
				{#if $user}
					<img class="rounded-full" alt="profile" src={$user.avatar_url} />
				{:else}
					<img class="rounded-full" alt="profile" src={UserIcon} />
				{/if}
			</div>
		</a>
	</div>
</div>
