export function pannable(node: HTMLElement) {
	let x: number;
	let y: number;

	function handleStart(event: MouseEvent | TouchEvent) {
		x = 'touches' in event ? event.touches[0].clientX : event.clientX;
		y = 'touches' in event ? event.touches[0].clientY : event.clientY;

		node.dispatchEvent(
			new CustomEvent("panstart", {
				detail: { x, y },
			})
		);

		window.addEventListener("mousemove", handleMove);
		window.addEventListener("mouseup", handleEnd);
		window.addEventListener("touchmove", handleMove);
		window.addEventListener("touchend", handleEnd);
	}

	function handleMove(event: MouseEvent | TouchEvent) {
		const dx = ('touches' in event ? event.touches[0].clientX : event.clientX) - x;
		const dy = ('touches' in event ? event.touches[0].clientY : event.clientY) - y;
		x = 'touches' in event ? event.touches[0].clientX : event.clientX;
		y = 'touches' in event ? event.touches[0].clientY : event.clientY;

		node.dispatchEvent(
			new CustomEvent("panmove", {
				detail: { x, y, dx, dy },
			})
		);
	}

	function handleEnd(event: MouseEvent | TouchEvent) {
		x = 'changedTouches' in event ? event.changedTouches[0].clientX : event.clientX;
		y = 'changedTouches' in event ? event.changedTouches[0].clientY : event.clientY;

		node.dispatchEvent(
			new CustomEvent("panend", {
				detail: { x, y },
			})
		);

		window.removeEventListener("mousemove", handleMove);
		window.removeEventListener("mouseup", handleEnd);
		window.removeEventListener("touchmove", handleMove);
		window.removeEventListener("touchend", handleEnd);
	}

	node.addEventListener("mousedown", handleStart);
	node.addEventListener("touchstart", handleStart);

	return {
		destroy() {
			node.removeEventListener("mousedown", handleStart);
			node.removeEventListener("touchstart", handleStart);
		},
	};
}
