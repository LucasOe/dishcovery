<script lang="ts">
	import "../app.css";
	import { onMount } from "svelte";
	import { user } from "$lib/functions/stores";
	import { supabase } from "$lib/functions/database/createClient";
	import { fetchCurrentUser } from "$lib/functions/database/user";
	import ViewTransition from "$lib/components/Navigation.svelte";

	onMount(async () => {
		$user = await fetchCurrentUser();
	});

	// Listen to Log in
	supabase.auth.onAuthStateChange(async (event) => {
		if (event === "SIGNED_IN") {
			$user = await fetchCurrentUser();
		}
	});
</script>

<div class="mx-auto flex min-h-dvh max-w-[36rem] font-default text-base text-light">
	<ViewTransition />
	<slot />
</div>
