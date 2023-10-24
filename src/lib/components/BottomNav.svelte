<script lang="ts">
	import RejectIcon from '$lib/assets/icons/reject.svg';
	import AddToListIcon from '$lib/assets/icons/addToList.svg';
	import OpenIcon from '$lib/assets/icons/open.svg';
	import RoundBtn from '$lib/components/RoundButton.svelte';
</script>

<div class="flex w-full grow-0 items-center justify-center gap-xxl">
	<RoundBtn src={RejectIcon} alt="Reject Icon" link={'/'} size="md" />
	<RoundBtn src={OpenIcon} alt="Open Icon" link={'/'} size="sm" />
	<RoundBtn src={AddToListIcon} alt="Add Icon" link={'/'} size="md" />
</div>
