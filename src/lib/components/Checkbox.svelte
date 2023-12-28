<script lang="ts">
	export let name: string = "checkbox";
	export let label: string = "Label";
</script>

<div class="inline-flex items-center">
	<div class="relative flex cursor-pointer items-center rounded-full">
		<input
			type="checkbox"
			class="before:content[''] size-5 peer relative cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-yellow"
			id={name}
		/>
		<div
			class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-300 opacity-0 transition-opacity peer-checked:text-yellow peer-checked:opacity-100"
		>
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
				/>
			</svg>
		</div>
	</div>
	<label class="relative flex cursor-pointer items-center rounded-full p-3 font-bold text-gray-300" for={name}>
		{label}
	</label>
</div>
