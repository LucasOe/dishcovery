<script lang="ts">
	import { supabase } from "$lib/functions/database/createClient";
	import { validateEmail, validatePassword } from "$lib/functions/validation";
	import type { AuthError } from "@supabase/supabase-js";
	import { goto } from "$app/navigation";

	import FadeIn from "$lib/components/FadeIn.svelte";
	import Section from "$lib/components/Section.svelte";
	import LinkText from "$lib/components/LinkText.svelte";
	import Error from "$lib/components/Error.svelte";

	let error: AuthError | null;
	let email = { content: "", isValid: true };
	let password = { content: "", isValid: true };

	async function handleLogin() {
		if (!email.isValid) return;
		if (!password.isValid) return;

		let { error: auth_error } = await supabase.auth.signInWithPassword({
			email: email.content,
			password: password.content,
		});

		if (auth_error) {
			error = auth_error;
		} else {
			goto("/");
		}
	}
</script>

<div class="flex flex-col">
	<form on:submit|preventDefault={handleLogin} class="flex flex-col gap-md">
		<Section title="E-Mail-Adresse">
			<input
				bind:value={email.content}
				on:input={() => {
					email.isValid = validateEmail(email.content);
					error = null;
				}}
				id="email"
				type="email"
				autocomplete="email"
				class="input peer"
				required
			/>
			<Error visible={!email.isValid}>Ungültige E-Mail-Adresse.</Error>
		</Section>

		<Section title="Passwort">
			<input
				bind:value={password.content}
				on:input={() => {
					password.isValid = validatePassword(password.content);
					error = null;
				}}
				id="password"
				type="password"
				minlength="6"
				autocomplete="current-password"
				class="input peer"
				required
			/>
			<Error visible={!password.isValid}>
				Passwörter müssen mindestens einen Großbuchstaben, eine Ziffer und 8 Zeichen enthalten.
			</Error>
		</Section>

		<div class="py-6">
			<button type="submit" class="button">Login</button>
			{#if error}
				<FadeIn>
					<p class="error">Das Passwort oder die E-Mail-Adresse ist ungültig.</p>
				</FadeIn>
			{/if}
		</div>
	</form>

	<div class="flex flex-col items-center justify-center gap-sm">
		<div class="flex flex-row items-center gap-xs">
			<span>Noch kein Mitglied?</span>
			<LinkText link="/register" title="Registrieren" textColor="text-yellow">Jetzt Registrieren</LinkText>
		</div>
		<LinkText link="/forgetpassword" title="Passwort vergessen">Passwort vergessen?</LinkText>
	</div>
</div>
