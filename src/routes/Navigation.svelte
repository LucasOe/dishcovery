<script lang='ts'>
    import { onMount } from 'svelte';
    import { onNavigate } from '$app/navigation'

    onNavigate((navigation) => {
        //@ts-expect-error ViewTransition ist noch zu neu
        if (!document.startViewTransition) {
            console.log("View Transition API not supported");
            return
        }
            

        return new Promise((resolve, reject) => {
            //@ts-ignore
            document.startViewTransition(async (transition) => {
                try {
                    console.log("Starting view transition");
                    resolve();
                    // Temporarily comment out the actual transition logic for debugging
                    // await transition.start();
                    //@ts-ignore
                    await navigation.complete();
                } catch (error) {
                    console.error("Error during transition:", error);
                    reject(error);
                }
            });
        });
    } )
</script>