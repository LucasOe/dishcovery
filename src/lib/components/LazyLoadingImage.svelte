<script lang="ts">
    import {twMerge} from "tailwind-merge";

    export let src: string;

    let imageLoaded = false;

    $: {
        console.log(imageLoaded)
    }
</script>

<img
        src={src}
        class="transition-image h-full w-full  bg-gray-500 object-cover"
        alt=""
        on:load={() => imageLoaded = true}/>
<div
        class={twMerge(
            `absolute z-10 top-0 left-0 w-full h-full bg-gradient-to-r from-yellow to-red animation-loading duration-300 pointer-events-none opacity-1`,
            imageLoaded ? " opacity-0" : "")}>
</div>


<style >
    .animation-loading {
        animation: loading 2s linear infinite;
        background: linear-gradient(100deg, #2c2c2c 0%, #2c2c2c 35%, #3c3c3c 42.5%,  #2c2c2c 50%, #2c2c2c 85%, #3c3c3c 92.5%, #2c2c2c 100%);
        background-size: 220% 200%;
    }

    @keyframes loading {
        0% {
            background-position: 0 50%;
        }
        100% {
            background-position: 100% 50%;
        }
    }
</style>
