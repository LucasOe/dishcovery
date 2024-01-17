<script lang="ts">
	import ViewTransition from './Navigation.svelte'
	import "../app.css";
</script>

<div class="mx-auto flex min-h-dvh max-w-[44rem] font-default text-base text-light">
	<ViewTransition />
	<slot />
</div>
