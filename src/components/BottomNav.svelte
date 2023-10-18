<script>
	import RejectIcon from '../assets/icons/reject.svg';
	import AddToListIcon from '../assets/icons/addToList.svg';
	import OpenIcon from '../assets/icons/open.svg';
</script>

<div class="w-full flex items-center justify-around">
	<a href={'/'} class="p-6 rounded-full bg-gray-500">
		<img alt="Reject" class="min-w-8 w-8 min-h-8 h-8" src={RejectIcon} />
	</a>
	<a href={'/'} class="p-5 rounded-full bg-gray-500">
		<img alt="Open" class="min-w-5 w-5 min-h-5 h-5" src={OpenIcon} />
	</a>
	<a href={'/'} class="p-6 rounded-full bg-gray-500">
		<img alt="Add To List" class="min-w-8 w-8 min-h-8 h-8" src={AddToListIcon} />
	</a>
</div>
