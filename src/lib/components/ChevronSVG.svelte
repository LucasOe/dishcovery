<script>
	import { twMerge } from "tailwind-merge";

    export let isOpen = false;
</script>

<svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
    <defs>
        <style>
            .cls-1 {
                stroke-linecap:round;
                stroke-linejoin:round;
            }
        </style>
    </defs>
    <rect class="fill-gray-900 stroke-2 stroke-yellow" x="1" y="1" width="43" height="43" rx="13" ry="13"/>
    <g transform={`rotate(${isOpen ? '180' : '0'}, 22.5, 22.5)`}>
        <path class={twMerge("cls-1 fill-none stroke-2 stroke-yellow duration-150")} d="m14,20l8,8,8-8" />
    </g>
</svg>

