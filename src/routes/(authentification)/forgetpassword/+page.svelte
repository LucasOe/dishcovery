<script lang="ts">
	import { goto } from "$app/navigation";
	import type { AuthError } from "@supabase/supabase-js";
	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";
	import { validateEmail, validatePassword, validateUsername } from "$lib/functions/validation";
	import FadeIn from "$lib/components/FadeIn.svelte";

	let email = {
		content: "",
		isValid: true,
	};
	let password = "";
	let error: AuthError | null = null;
	let successMessage = "";

	let inputs = [email];

let isFormValid = true;

	async function handleLogin() {
		for (let input of inputs) {
			if (!input.isValid) {
				isFormValid = false;
				return;
			}
		}
		try {
		const { data, error: auth_error } = await supabase.auth.signInWithPassword({
			email: email.content,
			password,
		});

		if (data.user) {
			goto("/profile");
		} else if (auth_error) {
			error = auth_error;
		}
	} catch (e) {
			error = e as AuthError;
			setTimeout(() => {
				error = null;
			}, 3000);
		}
	}

	async function handleForgotPassword() {
		try {
			if (!email) {
				error = { message: "Bitte geben Sie Ihre E-Mail-Adresse ein." };
				return;
			}

			const resetUrl = `${window.location.origin}/resetpassword`;
			const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.content, {
				redirectTo: resetUrl,
			});

			if (resetError) {
				error = resetError;
			} else {
				successMessage = "Passwort-Wiederherstellungs-E-Mail wurde gesendet. Bitte überprüfe dein E-Mail-Postfach.";
			}
		} catch (error) {
			console.error("Fehler beim Senden der Passwort-Wiederherstellungs-E-Mail:", error.message);
			throw error;
		}
	}
</script>

<div class="flex flex-col space-y-lg">
	<form on:submit|preventDefault={handleLogin}></form>
	<form on:submit|preventDefault={handleForgotPassword}>
		<Section title="E-Mail-Adresse">
		<input
			bind:value={email.content}
			on:input={() => (email.isValid = validateEmail(email.content))}
			id="email"
			type="email"
			class="h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl text-white hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
			required
		/>
		{#if !email.isValid}
			<FadeIn>
				<p class="mt-2 rounded-sm bg-red p-2">Ungültige E-Mail-Adresse</p>
			</FadeIn>
		{/if}
	</Section>

		<button
			type="submit"
			class="mt-5 h-16 w-full rounded-sm border-sm border-yellow bg-yellow text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow"
		>
			Passwort zurücksetzen
		</button>
	</form>

	{#if successMessage}
		<p class="text-green-500">{successMessage}</p>
	{/if}

	{#if error}
		<p class="text-red-500">{error.message}</p>
	{/if}
</div>