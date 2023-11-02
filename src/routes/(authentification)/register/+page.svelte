<script lang="ts">
	import Section from "$lib/components/Section.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import Button from "$lib/components/Button.svelte";
	import LinkText from "$lib/components/LinkText.svelte";
	import TextInput from "$lib/components/TextInput.svelte";
</script>

<FadeIn>
	<div class="space-y-lg">
		<Section title="Benutzername">
			<TextInput type="text" />
		</Section>
		<Section title="E-Mail Adresse">
			<TextInput type="text" />
		</Section>
		<Section title="Passwort">
			<TextInput type="passwort" />
		</Section>

		<Button>Login</Button>
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<span>Noch kein Konto?</span>
				<LinkText link="/register" title="Registrieren" textColor="text-yellow">Jetzt registrieren</LinkText>
			</div>
			<LinkText link="/" title="Als Gast beitreten">Als Gast beitreten</LinkText>
		</div>
	</div>
</FadeIn>
