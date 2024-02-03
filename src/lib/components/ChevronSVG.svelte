<script>
	import { twMerge } from "tailwind-merge";

	export let isOpen = false;
</script>

<div class="size-10 overflow-hidden rounded-sm border-2 border-yellow bg-gray-900">
	<div class={twMerge("flex size-full items-center justify-center duration-150", isOpen && "rotate-180")}>
		<svg width="20" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M1 1L8.5 9L16 1" stroke="#FFC532" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</div>
</div>
