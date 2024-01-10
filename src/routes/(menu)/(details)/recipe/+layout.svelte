<script lang="ts">
	import { page } from "$app/stores";
</script>

<svelte:head>
	<title>{$page.data.title || "Page Title"}</title>
</svelte:head>

<div class="flex w-full flex-col gap-6">
	<slot />
</div>
