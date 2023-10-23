<script>
	/**
	 * @type {string}
	 */
	export let src;
	/**
	 * @type {string}
	 */
	export let alt;
	/**
	 * @type {string}
	 */
	export let link;
	/**
	 * @type {any}
	 */
	export let padding;
	/**
	 * @type {any}
	 */
	export let icWidth;
	let icHeight = icWidth;

	/**
	 * @type {any}
	 */
	export let additionalClasses;
</script>

<a
	href={link}
	class="btn rounded-full duration-150 bg-gray-500 hover:bg-[#383838] drop-shadow-xl hover:drop-shadow-sm {additionalClasses}"
	style="--btn-padding:{padding}rem;"
>
	<img {alt} class="btn-ic" {src} style="--ic-width:{icWidth}rem; --ic-height:{icHeight}rem;" />
</a>

<style>
	.btn {
		padding: var(--btn-padding);
	}
	.btn-ic {
		min-width: var(--ic-width);
		min-height: var(--btn-height);
		width: var(--ic-width);
		height: var(--btn-height);
	}
</style>
