<script lang="ts">
	import { goto } from "$app/navigation";

	import { validateEmail, validatePassword } from "$lib/functions/validation";
	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";
	import LinkText from "$lib/components/LinkText.svelte";
	import FadeIn from "$lib/components/FadeIn.svelte";
	import type { AuthError } from "@supabase/supabase-js";

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
				class="input"
				required
			/>
			{#if !email.isValid}
				<FadeIn>
					<p class="error">Ungültige E-Mail-Adresse</p>
				</FadeIn>
			{/if}
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
				class="input"
				required
			/>
			{#if !password.isValid}
				<FadeIn>
					<p class="error">Passwörter müssen mindestens einen Großbuchstaben, eine Ziffer und 8 Zeichen enthalten.</p>
				</FadeIn>
			{/if}
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
			<span>Noch kein Mitglied</span>
			<LinkText link="/register" title="Registrieren" textColor="text-yellow">Jetzt Registrieren</LinkText>
		</div>
		<LinkText link="/forgetpassword" title="Passwort vergessen">Passwort vergessen?</LinkText>
	</div>
</div>
