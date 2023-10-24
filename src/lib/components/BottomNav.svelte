<script>
	import RejectIcon from '../assets/icons/reject.svg';
	import AddToListIcon from '../assets/icons/addToList.svg';
	import OpenIcon from '../assets/icons/open.svg';
	import RoundBtn from './RoundButton.svelte';
</script>

<div class="w-full flex items-center justify-center gap-xxl grow-0">
	<RoundBtn src={RejectIcon} alt="Reject Icon" link={'/'} size="md" />
	<RoundBtn src={OpenIcon} alt="Open Icon" link={'/'} size="sm" />
	<RoundBtn src={AddToListIcon} alt="Add Icon" link={'/'} size="md" />
</div>
