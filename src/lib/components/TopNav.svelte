<script lang="ts">
	import UserIcon from "$lib/assets/icons/ic_user.svg";
	import DefaultAvatar from "$lib/assets/user.png";
	import { user } from "$lib/functions/stores";
</script>

<div class="flex items-center justify-between">
	<!-- Nav -->
	<div class="flex items-center justify-between gap-xl">
		{#if $user}
			<a href="/cookbook" class="focus rounded-sm p-2 duration-150">
				<svg class="nav-icon" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M6.76 20.3043V17.7802C6.76 17.4454 6.48854 17.1739 6.15368 17.1739C3.30738 17.1739 1 14.8665 1 12.0202V11.409C1 8.9604 2.64005 6.8152 5.00298 6.1731L6.45759 5.77783C6.64652 5.72649 6.79731 5.58414 6.85942 5.39846C7.73837 2.77117 10.1986 1 12.969 1H13.6899C16.3213 1 18.6001 2.82654 19.1729 5.39482C19.2142 5.57983 19.3545 5.72677 19.5374 5.77648L20.997 6.1731C23.3599 6.8152 25 8.9604 25 11.409V12.0202C25 14.8665 22.6926 17.1739 19.8463 17.1739C19.5115 17.1739 19.24 17.4454 19.24 17.7802V20.3043M6.76 20.3043V23C6.76 24.1046 7.65543 25 8.76 25H17.24C18.3446 25 19.24 24.1046 19.24 23V20.3043M6.76 20.3043H19.24"
						stroke="#7d7c7c"
						stroke-width="2"
					/>
				</svg>
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
				<img
					class="h-full w-full rounded-full object-cover"
					alt="profile"
					src={$user.avatar_url ? $user.avatar_url : DefaultAvatar}
				/>
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
