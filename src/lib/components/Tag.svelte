<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let text: string;
	export let color: "gray" | "yellow" = "gray";
</script>

<div
	class={twMerge(
		"rounded-sm border px-sm py-xs",
		{
			gray: "border-gray-300 text-gray-300",
			yellow: "border-yellow text-yellow",
		}[color],
		$$props.class
	)}
>
	<p class="text-[12px] font-bold sm:text-sm">{text}</p>
</div>
