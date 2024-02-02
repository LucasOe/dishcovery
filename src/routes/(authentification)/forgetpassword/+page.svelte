<script lang="ts">
	import { supabase } from "$lib/functions/database/createClient";
	import { validateEmail } from "$lib/functions/validation";
	import type { AuthError } from "@supabase/supabase-js";

	import FadeIn from "$lib/components/FadeIn.svelte";
	import Section from "$lib/components/Section.svelte";
	import Error from "$lib/components/Error.svelte";

	let error: AuthError | null = null;
	let successMessage: string | null;
	let email = { content: "", isValid: false };

	async function handleForgotPassword() {
		if (!email.isValid) return;

		const { error: reset_error } = await supabase.auth.resetPasswordForEmail(email.content, {
			redirectTo: `${window.location.origin}/resetpassword`,
		});

		if (reset_error) {
			error = reset_error;
		} else {
			successMessage = "Passwort-Wiederherstellungs-E-Mail wurde gesendet. Bitte überprüfe dein E-Mail-Postfach.";
		}
	}
</script>

<div class="flex flex-col space-y-lg">
	<form on:submit|preventDefault={handleForgotPassword}>
		<Section title="E-Mail-Adresse">
			<input
				bind:value={email.content}
				on:input={() => {
					email.isValid = validateEmail(email.content);
					error = null;
					successMessage = null;
				}}
				id="email"
				type="email"
				autocomplete="email"
				class="input peer"
				required
			/>
			<Error visible={!email.isValid}>Ungültige E-Mail-Adresse.</Error>
		</Section>

		<div class="py-6">
			<button type="submit" class="button">Passwort zurücksetzen</button>
			{#if error}
				<FadeIn>
					<p class="error">{error}</p>
				</FadeIn>
			{:else if successMessage}
				<FadeIn>
					<p class="success">{successMessage}</p>
				</FadeIn>
			{/if}
		</div>
	</form>
</div>
