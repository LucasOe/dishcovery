<script lang="ts">
	import { onNavigate } from "$app/navigation";

	onNavigate((navigation) => {
		//@ts-expect-error ViewTransition ist noch zu neu
		if (!document.startViewTransition) {
			console.log("View Transition API not supported");
			return;
		}

		return new Promise((resolve, reject) => {
			//@ts-ignore
			document.startViewTransition(async (transition) => {
				try {
					resolve();
					await navigation.complete;
				} catch (error) {
					console.error("Error during transition:", error);
					reject(error);
				}
			});
		});
	});
</script>
