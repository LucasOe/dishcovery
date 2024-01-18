<script lang="ts">
	import ViewTransition from "./Navigation.svelte";
	import "../app.css";
	import { onMount } from "svelte";
	import { currentUser } from "$lib/functions/stores";
	import { fetchCurrentUserId, fetchUserDataById } from "$lib/functions/database/user";

	//Fetch and set current user on page load
	onMount(async () => {
		const userID = await fetchCurrentUserId();
		currentUser.set(await fetchUserDataById(userID));
	});
</script>

<div class="mx-auto flex min-h-dvh max-w-[36rem] font-default text-base text-light">
	<ViewTransition />
	<slot />
</div>
