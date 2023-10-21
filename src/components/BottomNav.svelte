<script>
	import RejectIcon from '../assets/icons/reject.svg';
	import AddToListIcon from '../assets/icons/addToList.svg';
	import OpenIcon from '../assets/icons/open.svg';
	import RoundBtn from './RoundBtn.svelte';
</script>

<div class="w-full flex items-center justify-center gap-xxl grow-0">
	<RoundBtn src={RejectIcon} alt="Reject Icon" link={'/'} padding={1.5} icWidth={2} additionalClasses="" />
	
	<RoundBtn src={OpenIcon} alt="Open Icon" link={'/'} padding={1} icWidth={1.5} additionalClasses="" />
	
	<RoundBtn src={AddToListIcon} alt="Add Icon" link={'/'} padding={1.5} icWidth={2} additionalClasses="" />
</div>
