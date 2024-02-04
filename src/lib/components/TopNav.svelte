<script lang="ts">
	import UserIcon from "$lib/assets/icons/ic_user.svg";
	import DefaultAvatar from "$lib/assets/user.png";
	import {user} from "$lib/functions/stores";
	import LazyLoadingImage from "$lib/components/LazyLoadingImage.svelte";
	import CookBookIcon from "$lib/components/CookBookIcon.svelte";
</script>

<div class="flex items-center justify-between">
	<!-- Nav -->
	<div class="flex items-center justify-between gap-md">
		{#if $user}
			<a href="/cookbook" class="focus rounded-sm p-2 duration-150 relative">
				<CookBookIcon/>
			</a>
			<a href="/new" class="focus rounded-sm p-2 duration-150">
				<svg class="nav-icon" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M13 1V13M13 13V25M13 13H1M13 13L25 13" stroke="#7d7c7c" stroke-width="2" stroke-linecap="round" />
				</svg>
			</a>
		{/if}
		<a href="/filter" class="focus rounded-sm p-2 duration-150">
			<svg class="nav-icon" width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M1 5H11M23 5H25M1 18H3M15 18H25" stroke="#7d7c7c" stroke-width="2" stroke-linecap="round" />
				<circle cx="10" cy="18" r="4" stroke="#7d7c7c" stroke-width="2" />
				<circle cx="16" cy="5" r="4" stroke="#7d7c7c" stroke-width="2" />
			</svg>
		</a>
	</div>

	<!-- Profile -->
	<a href={`${$user ? `/profile/${$user.username}` : "/login"}`} class="focus rounded-full">
		<div class={`size-14 overflow-hidden rounded-full border-sm border-gray-300 duration-150 hover:border-yellow`}>
			{#if $user}
				<div class="h-full w-full rounded-full object-cover overflow-hidden relative">
					<LazyLoadingImage src={$user.avatar_url ? $user.avatar_url : DefaultAvatar} alt="User" />
				</div>
			{:else}
				<img class="h-full w-full rounded-full object-cover" alt="profile" src={UserIcon} />
			{/if}
		</div>
	</a>
</div>

<style>
	.nav-icon path,
	.nav-icon circle {
		transition: stroke 150ms;
	}
	.nav-icon:hover path,
	.nav-icon:hover circle {
		stroke: #ffc532;
	}
</style>
