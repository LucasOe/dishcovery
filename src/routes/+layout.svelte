<script lang="ts">
	import "../app.css";
	import {onMount} from "svelte";
	import {fetchCurrentUser} from "$lib/functions/db";
	import {currentUser} from "$lib/functions/stores";

	//Fetch and set current user on page load
	onMount(async () => {
		currentUser.set(await fetchCurrentUser());
	});
</script>

<div class="mx-auto flex min-h-dvh max-w-[44rem] p-12 font-default text-base text-light">
	<slot />
</div>
