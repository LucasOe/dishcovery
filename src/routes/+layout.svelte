<script lang="ts">
	import ViewTransition from "./Navigation.svelte";
	import "../app.css";
	import { onMount } from "svelte";
	import { currentUser } from "$lib/functions/stores";
	import { supabase } from "$lib/functions/database/createClient";
	import { fetchCurrentUser, fetchUserDataById } from "$lib/functions/database/user";

	//Fetch and set current user on page load
	onMount(async () => {

		// Fetch the current session
		const  user  = await fetchCurrentUser();

		// If a session exists, fetch the user's data and set it in the user store
		if (user) {
			currentUser.set(await fetchUserDataById(user.id));
		}

		// Listen to Log in
		supabase.auth.onAuthStateChange(async (event) => {
			if (event === "SIGNED_IN") {
				currentUser.set(await fetchCurrentUser());
			}
		});
	});
</script>

<div class="mx-auto flex min-h-dvh max-w-[36rem] font-default text-base text-light">
	<ViewTransition />
	<slot />
</div>
