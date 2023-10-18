<script>
	import Header from '../components/Header.svelte';
	import '../app.css';
</script>

<div class="flex w-full min-h-screen bg-gray-900">
	<div
		class="relative flex content-between w-full max-w-[48rem] p-xl my-0 mx-auto box-border min-h-screen bg-gray-900 text-light flex-col gap-16 font-default text-fs-text"
	>
		<slot />
	</div>
</div>
