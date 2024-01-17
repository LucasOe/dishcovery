<script lang="ts">
	import ViewTransition from './Navigation.svelte'
	import "../app.css";
	import {onMount} from "svelte";
	import {fetchCurrentUser} from "$lib/functions/db";
	import {currentUser} from "$lib/functions/stores";

	//Fetch and set current user on page load
	onMount(async () => {
		currentUser.set(await fetchCurrentUser());
	});
</script>

<div class="mx-auto flex min-h-dvh max-w-[44rem] font-default text-base text-light">
	<ViewTransition />
	<slot />
</div>
