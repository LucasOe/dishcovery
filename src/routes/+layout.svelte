<script>
	import Header from '../components/Header.svelte';
	import '../app.css';
</script>

<div class="flex w-full h-[100dvh]">
	<div
		class="relative flex content-between w-full max-w-[48rem] p-xl pb-[4rem] my-0 mx-auto box-border h-full text-light flex-col gap-16 font-default text-fs-text"
	>
		<slot />
	</div>
</div>
