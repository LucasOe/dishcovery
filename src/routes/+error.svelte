<script lang="ts">
	import { page } from "$app/stores";
</script>

<div class="mx-auto flex min-h-dvh max-w-[36rem] flex-col items-center justify-center px-md">
	{#if $page.error}
		<div class="py-md text-center text-base text-light">
			<div class="w-full font-header text-[4rem] text-yellow">{$page.status}</div>
			<h1 class="w-full font-header text-xl">{$page.error.message}</h1>
			{#if $page.status === 404}
				<p class="mt-4 font-header text-xl text-light">
					Diese Seite ist wie ein Rezept ohne Gewürze... <br /> Entweder existiert sie nicht, oder sie hat sich heimlich
					vom Teller geschlichen.
				</p>
			{/if}
		</div>
	{/if}
	<a
		href={"/"}
		class="rounded-sm border-sm border-yellow bg-yellow px-md py-sm text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow"
	>
		Zurück zum Swipen
	</a>
</div>
