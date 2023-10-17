<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import './styles.css';
	import '../app.css';
</script>

<div class="flex items-center w-full min-h-screen bg-gray-900">
	<div class="relative flex w-full max-w-[48rem] p-xl my-0 mx-auto box-border min-h-screen bg-gray-900 text-light">
		<slot />
	</div>
</div>


