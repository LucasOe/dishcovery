<script lang="ts">
	import { onNavigate } from "$app/navigation";

	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((resolve, reject) => {
			document.startViewTransition(async () => {
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
