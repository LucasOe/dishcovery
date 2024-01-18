<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";
	import { twMerge } from "tailwind-merge";

	export let src: string;
	export let alt: string;
	export let size: "sm" | "md" = "md";
	export let action: () => MouseEventHandler<HTMLButtonElement> | null | undefined;
</script>

<button
	{...$$props}
	on:click={action()}
	class={twMerge(
		"rounded-full bg-gray-500 drop-shadow-xl duration-150 hover:bg-[#383838]",
		{
			sm: "size-10 p-3",
			md: "size-14 p-4",
		}[size],
		$$props.class
	)}
>
	<img {src} {alt} class="size-full" />
</button>
