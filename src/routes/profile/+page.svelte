<script>
	import img from '../../assets/img/test-img.jpg';
	import H1 from '../../components/H1.svelte';
</script>

<svelte:head>
	<title>Profil</title>
	<meta name="description" content="Profil" />
</svelte:head>

<div class="text-column flex justify-center flex-col items-center">
	<img class="rounded-full w-44" alt="User" src={img} />
	<H1 text="Profile" />
	<a href={'/'} class="block bg-yellow p-5 flex text-black rounded-xl"> o shit go bacc </a>

	<p>
		The <a href="/sverdle">Sverdle</a> page illustrates SvelteKit's data loading and form handling. Try
		using it with JavaScript disabled!
	</p>
</div>
