<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { supabase } from "$lib/functions/database/createClient";
	import Section from "$lib/components/Section.svelte";

	let newPasswordInput: string;
	let confirmPasswordInput: string;
	let feedbackMessage: string = "";
	let token: string | null;

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		token = urlParams.get("token");
	});

	async function resetPassword() {
		try {
			if (!newPasswordInput || !confirmPasswordInput) {
				feedbackMessage = "Bitte gib ein neues Passwort und bestätige es.";
				return;
			}

			if (newPasswordInput !== confirmPasswordInput) {
				feedbackMessage = "Die Passwörter stimmen nicht überein.";
				return;
			}

			const { error } = await supabase.auth.updateUser({ password: newPasswordInput });

			if (error) {
				console.error("Fehler beim Zurücksetzen des Passworts:", error.message);
				feedbackMessage = "Fehler beim Zurücksetzen des Passworts. Bitte versuche es erneut.";
			} else {
				console.log("Passwort erfolgreich zurückgesetzt");
				feedbackMessage = "Passwort erfolgreich zurückgesetzt. Du kannst dich jetzt anmelden.";
				goto("/login");
			}
		} catch (error) {
			console.error("Fehler beim Zurücksetzen des Passworts:", error.message);
			feedbackMessage = "Unerwarteter Fehler beim Zurücksetzen des Passworts.";
		}
	}
</script>

<div class="flex flex-col space-y-lg">
	<Section title="Neues Passwort eingeben mit mindestens 6 Zeichen">
		<input
			type="password"
			bind:value={newPasswordInput}
			id="newPassword"
			class="h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl text-white hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
		/>
	</Section>

	<Section title="Passwort bestätigen">
		<input
			type="password"
			bind:value={confirmPasswordInput}
			id="confirmPassword"
			class="h-10 w-full rounded-sm border-sm border-gray-500 bg-gray-500 px-sm py-md text-xl text-white hover:border-[#383838] hover:bg-[#383838] focus:border-yellow focus:bg-gray-900 focus:outline-none"
		/>
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
