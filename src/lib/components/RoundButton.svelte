<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let src: string;
	export let alt: string;
	export let size: "sm" | "md" = "md";
	export let action: () => void;
</script>

<button
	on:click|preventDefault={action}
	{...$$props}
	class={twMerge(
		"focus aspect-square rounded-full bg-gray-500 drop-shadow-xl duration-150 hover:bg-gray-500-hover",
		{
			sm: "size-10 p-3",
			md: "size-14 p-4",
		}[size],
		$$props.class
	)}
>
	<img {src} {alt} class="size-full" />
</button>
