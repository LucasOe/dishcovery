<script lang="ts">
	export let title: string;
	export let icon: string | null = null;
</script>

<div>
	<div class="mb-sm flex items-center gap-4">
		{#if icon}
			<img alt={icon} src={icon} class="size-6" />
		{/if}
		<p class="text-xl font-semibold">{title}</p>
	</div>
	<slot />
</div>
