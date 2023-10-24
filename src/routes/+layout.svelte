<script lang="ts">
	import '../app.css';
</script>

<div class="flex h-[100dvh] w-full">
	<div
		class="relative mx-auto my-0 box-border flex h-full w-full max-w-[48rem] flex-col content-between gap-16 p-xl pb-[4rem] font-default text-fs-text text-light"
	>
		<slot />
	</div>
</div>
