<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let title: string;
	export let icon: string | null = null;
	export let required: boolean = false;
</script>

<div>
	<div class={twMerge("mb-sm flex items-center", $$props.class)}>
		{#if icon}
			<img alt={icon} src={icon} class="mr-4 size-6" />
		{/if}
		<p class="text-xl font-semibold">{title}</p>
		{#if required}
			<sup class="ml-1 text-lg font-semibold text-red">*</sup>
		{/if}
	</div>
	<slot />
</div>
