<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import './styles.css';
	import '../app.css';
</script>


<div class="relative flex flex-col w-full max-w-[64rem] my-0 mx-auto box-border min-h-screen bg-gray-900">
	<Header/>
	
	<slot />

	<Footer/>
</div>


