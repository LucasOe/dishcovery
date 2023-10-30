<script lang="ts">
	import RejectIcon from "$lib/assets/icons/reject.svg";
	import AddToListIcon from "$lib/assets/icons/addToList.svg";
	import OpenIcon from "$lib/assets/icons/open.svg";
	import RoundButton from "$lib/components/RoundButton.svelte";
</script>

<div class="flex items-center justify-center gap-xxl">
	<RoundButton src={RejectIcon} alt="Reject Icon" link={"/"} size="md" />
	<RoundButton src={OpenIcon} alt="Open Icon" link={"/"} size="sm" />
	<RoundButton src={AddToListIcon} alt="Add Icon" link={"/"} size="md" />
</div>
