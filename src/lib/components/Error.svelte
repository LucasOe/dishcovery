<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import FadeIn from "./FadeIn.svelte";

	export let visible: boolean;
</script>

{#if visible}
	<div class={twMerge("hidden peer-focus:block", $$props.class)}>
		<FadeIn>
			<p class="mt-2 rounded-sm bg-red p-2"><slot /></p>
		</FadeIn>
	</div>
{/if}
