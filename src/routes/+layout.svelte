<script lang="ts">
	import "../app.css";
	import { onMount } from "svelte";
	import { previousPage, user } from "$lib/functions/stores";
	import { supabase } from "$lib/functions/database/createClient";
	import { fetchUserDataById } from "$lib/functions/database/user";
	import ViewTransition from "$lib/components/Navigation.svelte";
	import { beforeNavigate } from "$app/navigation";

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, session) => {
			if (!session) $user = null;
			else
				fetchUserDataById(session.user.id).then((profile) => {
					$user = profile;
				});
		});

		return () => data.subscription.unsubscribe();
	});

	beforeNavigate(({ to }) => {
		$previousPage.push(to?.url.pathname);
	});
</script>

{#if $user !== undefined}
	<div class="mx-auto flex min-h-svh max-w-[36rem] font-default text-base text-light height-full overflow-hidden">
		<ViewTransition />
		<slot />
	</div>
{/if}
