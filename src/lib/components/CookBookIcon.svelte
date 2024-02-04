<script lang="ts">
	import { twMerge } from "tailwind-merge";
	import RedHeart from "$lib/assets/icons/red_heart.svg";
	import { swipeDirection } from "$lib/functions/stores.js";
	import { Direction } from "$types/card.types.js";

	let likeIsAnimating = false;

	$: {
		if ($swipeDirection === Direction.Right) {
			likeIsAnimating = true;
			setTimeout(() => {
				likeIsAnimating = false;
			}, 800);
		}
	}
</script>

<svg
	class={twMerge("nav-icon overflow-visible")}
	width="26"
	height="26"
	viewBox="0 0 26 26"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		class={likeIsAnimating ? "hat-animation" : ""}
		d="M6.76 20.3043V17.7802C6.76 17.4454 6.48854 17.1739 6.15368 17.1739C3.30738 17.1739 1 14.8665 1 12.0202V11.409C1 8.9604 2.64005 6.8152 5.00298 6.1731L6.45759 5.77783C6.64652 5.72649 6.79731 5.58414 6.85942 5.39846C7.73837 2.77117 10.1986 1 12.969 1H13.6899C16.3213 1 18.6001 2.82654 19.1729 5.39482C19.2142 5.57983 19.3545 5.72677 19.5374 5.77648L20.997 6.1731C23.3599 6.8152 25 8.9604 25 11.409V12.0202C25 14.8665 22.6926 17.1739 19.8463 17.1739C19.5115 17.1739 19.24 17.4454 19.24 17.7802V20.3043M6.76 20.3043V23C6.76 24.1046 7.65543 25 8.76 25H17.24C18.3446 25 19.24 24.1046 19.24 23V20.3043M6.76 20.3043H19.24"
		stroke="#7d7c7c"
		stroke-width="2"
	/>
</svg>
<img
	src={RedHeart}
	class={twMerge(`absolute left-0 top-0 opacity-0`, likeIsAnimating ? "heart-animation" : "")}
	alt="Herz"
/>

<style>
	.nav-icon path {
		transition: stroke 150ms;
	}
	.nav-icon:hover path {
		stroke: #ffc532;
	}

	.heart-animation {
		animation: heart 0.8s infinite;
	}

	@keyframes heart {
		0% {
			opacity: 0;
			transform: scale(0.3);
		}
		50% {
			opacity: 1;
			transform: scale(1.2);
		}
		100% {
			opacity: 0;
			transform: scale(0.3);
		}
	}

	.hat-animation {
		animation: hat 0.8s infinite;
	}

	@keyframes hat {
		0% {
			stroke: #7d7c7c;
			transform: scale(1);
			transform-origin: center;
		}
		50% {
			stroke: #ffc532;
			transform: scale(1.2);
			transform-origin: center;
		}
		100% {
			stroke: #7d7c7c;
			transform: scale(1);
			transform-origin: center;
		}
	}
</style>
