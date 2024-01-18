<script lang="ts">
	import ViewTransition from './Navigation.svelte'
	import "../app.css";
	import {onMount} from "svelte";
	import {fetchCurrentUserId, fetchUserData} from "$lib/functions/db";
	import {currentUser} from "$lib/functions/stores";

	//Fetch and set current user on page load
	onMount(async () => {
		const userID = await fetchCurrentUserId();
		currentUser.set(await fetchUserData(userID));
	});
</script>

<div class="mx-auto flex min-h-dvh max-w-[36rem] font-default text-base text-light">
	<ViewTransition />
	<slot />
</div>
