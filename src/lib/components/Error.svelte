<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import FadeIn from "./FadeIn.svelte";

	export let visible = true;
</script>

{#if visible}
	<div class={twMerge("hidden peer-focus:block", $$props.class)}>
		<FadeIn>
			<p class="ml-2 mt-1 text-gray-300"><slot /></p>
		</FadeIn>
	</div>
{/if}
