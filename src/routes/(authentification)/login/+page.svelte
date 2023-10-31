<script lang="ts">
	import Section from "$lib/components/Section.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import Button from "$lib/components/Button.svelte";
	import LinkText from "$lib/components/LinkText.svelte";
	import Checkbox from "$lib/components/Checkbox.svelte";

</script>

<FadeIn>
	<div class="space-y-lg">
		<Section title="E-Mail Adresse">
			<input type="text" class=" text-white h-10 w-full rounded-sm bg-gray-500 text-xl" />
		</Section>
		<Section title="Passwort">
			<input type="password" class=" text-white h-10 w-full rounded-sm bg-gray-500 text-xl" />
		</Section>
		<div class="flex justify-between">
			<Checkbox name="remember" label="Angemeldet bleiben"></Checkbox>
			<LinkText link="/reset-password" title="Passwort zurücksetzen">Passwort vergessen?</LinkText>
		</div>

		<Button>Login</Button>
		<div class="flex justify-between items-center">
			<div class="flex flex-col">
				<span>Noch kein Konto?</span>
				<LinkText link="/register" title="Registrieren" textColor="text-yellow">Jetzt registrieren</LinkText>
			</div>
			<LinkText link="/" title="Als Gast beitreten">Als Gast beitreten</LinkText>
		</div>
	</div>
</FadeIn>
