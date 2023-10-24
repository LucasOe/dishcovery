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
		'rounded-full duration-150 bg-gray-500 hover:bg-[#383838] drop-shadow-xl hover:drop-shadow-sm',
		size === 'sm' && 'w-10 h-10 p-3',
		size === 'md' && 'w-14 h-14 p-4',
		$$props.class
	)}
>
	<img {src} {alt} class="w-full h-full" />
</a>
