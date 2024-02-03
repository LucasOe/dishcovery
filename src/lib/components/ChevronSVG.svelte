<script>
	import { twMerge } from "tailwind-merge";

    export let isOpen = false;
</script>



<div class="border-2 border-yellow size-10 rounded-sm bg-gray-900 overflow-hidden">
    <div class={twMerge("duration-150 flex items-center justify-center size-full", isOpen && "rotate-180")}>
        <svg width="20" height="10" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L8.5 9L16 1" stroke="#FFC532" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
    
</div>

