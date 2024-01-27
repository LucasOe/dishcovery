<script lang="ts">
	import { goto } from "$app/navigation";
	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";
	import { validatePassword } from "$lib/functions/validation";
	import FadeIn from "$lib/components/FadeIn.svelte";

	let confirmPasswordInput: string;
	let feedbackMessage: string = "";

	let password = {
		content: "",
		isValid: true,
	};

	let inputs = [password];

	async function resetPassword() {
		for (let input of inputs) if (!input.isValid) return;
		try {
			if (!password.content || !confirmPasswordInput) {
				feedbackMessage = "Bitte gib ein neues Passwort und bestätige es.";
				return;
			}

			if (password.content !== confirmPasswordInput) {
				feedbackMessage = "Die Passwörter stimmen nicht überein.";
				return;
			}

			const { error } = await supabase.auth.updateUser({ password: password.content });

			if (error) {
				console.error("Fehler beim Zurücksetzen des Passworts:", error.message);
				feedbackMessage = "Fehler beim Zurücksetzen des Passworts. Bitte versuche es erneut.";
			} else {
				console.log("Passwort erfolgreich zurückgesetzt");
				feedbackMessage = "Passwort erfolgreich zurückgesetzt. Du kannst dich jetzt anmelden.";
				goto("/login");
			}
		} catch (error) {
			console.error("Fehler beim Zurücksetzen des Passworts:", error);
			feedbackMessage = "Unerwarteter Fehler beim Zurücksetzen des Passworts.";
		}
	}
</script>

<div class="flex flex-col space-y-lg pt-12">
	<h1 class="font-header text-xxl text-light">Passwort zurücksetzen</h1>
	<Section title="Neues Passwort">
		<input
			bind:value={password.content}
			on:input={() => (password.isValid = validatePassword(password.content))}
			id="password"
			type="password"
			minlength="6"
			class="h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl text-white hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
			required
		/>
		{#if !password.isValid}
			<FadeIn>
				<p class="mt-2 rounded-sm bg-red p-2">
					Passwörter müssen mindestens einen Großbuchstaben, eine Ziffer und 8 Zeichen enthalten.
				</p>
			</FadeIn>
		{/if}
	</Section>
	<Section title="Passwort bestätigen">
		<input
			bind:value={confirmPasswordInput}
			id="confirm_password"
			type="password"
			minlength="6"
			class="h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl text-white hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
			required
		/>
		{#if !password.isValid}
			<FadeIn>
				<p class="mt-2 rounded-sm bg-red p-2">
					Passwörter müssen mindestens einen Großbuchstaben, eine Ziffer und 8 Zeichen enthalten.
				</p>
			</FadeIn>
		{/if}
	</Section>

	<button
		type="submit"
		on:click={resetPassword}
		class="mt-5 h-16 w-full rounded-sm border-sm border-yellow bg-yellow text-xl font-semibold text-gray-900 transition duration-100 hover:bg-gray-900 hover:text-yellow"
	>
		Passwort zurücksetzen
	</button>

	{#if feedbackMessage}
		<p class={feedbackMessage.includes("Fehler") ? "text-red-500" : "text-green-500"}>{feedbackMessage}</p>
	{/if}
</div>
