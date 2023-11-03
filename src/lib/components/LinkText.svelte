<script lang="ts">
	export let link: string;
	export let title: string = "link";
	export let textColor: string = "text-gray-300";
</script>

<a href={link} {title} class="font-bold {textColor}"><slot /></a>
