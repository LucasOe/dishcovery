<script lang="ts">
	import "../app.css";
	import { onMount } from "svelte";
	import { user } from "$lib/functions/stores";
	import { supabase } from "$lib/functions/database/createClient";
	import { fetchUserDataById } from "$lib/functions/database/user";
	import ViewTransition from "$lib/components/Navigation.svelte";

	onMount(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			if (session)
				fetchUserDataById(session.user.id).then((profile) => {
					$user = profile;
				});
		});

		const { data } = supabase.auth.onAuthStateChange((_, session) => {
			if (session)
				fetchUserDataById(session.user.id).then((profile) => {
					$user = profile;
				});
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div class="mx-auto flex min-h-dvh max-w-[36rem] font-default text-base text-light">
	<ViewTransition />
	<slot />
</div>
