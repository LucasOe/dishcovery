<script lang="ts">
	import { twMerge } from "tailwind-merge";

	export let text: string;
	export let color: "gray" | "yellow" = "gray";
</script>

<div
	class={twMerge(
		"rounded-sm border px-md py-xs",
		{
			gray: "border-gray-300 text-gray-300",
			yellow: "border-yellow text-yellow",
		}[color],
		$$props.class
	)}
>
	<p class="font-bold text-[12px] sm:text-sm">{text}</p>
</div>
