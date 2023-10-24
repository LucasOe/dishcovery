<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let src: string;
	export let alt: string;
	export let link: string;
	export let size: 'sm' | 'md' = 'md';
</script>

<a
	href={link}
	{...$$props}
	class={twMerge(
		'rounded-full bg-gray-500 drop-shadow-xl duration-150 hover:bg-[#383838] hover:drop-shadow-sm',
		size === 'sm' && 'h-10 w-10 p-3',
		size === 'md' && 'h-14 w-14 p-4',
		$$props.class
	)}
>
	<img {src} {alt} class="h-full w-full" />
</a>
