<script lang="ts">
    export let name: string = "checkbox";
    export let label: string = "Label"
</script>

<div class="inline-flex items-center">
    <div class="relative flex items-center rounded-full cursor-pointer">
        <input
                type="checkbox"
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 checked:border-yellow transition-all"
                id={name}
        />
        <div class="absolute text-gray-300 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 peer-checked:text-yellow">
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
            >
                <path
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                ></path>
            </svg>
        </div>
    </div>
    <label
            class="relative flex items-center p-3 rounded-full cursor-pointer font-bold text-gray-300"
            for={name}
    >
        {label}
    </label>
</div>
