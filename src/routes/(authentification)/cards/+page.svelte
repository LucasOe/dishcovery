<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
    import { pan } from 'svelte-gestures';

    let containerW = 500;
    let containerH = 500;
    let centerX = containerW/2;
    let centerY = containerH/2;

    let cardW = 100;
    let cardH = 100;

    let xStart = 0;
    let yStart = 0;
    let touchStarted = false;

    let xCoord = 0;
    let yCoord = 0;

    let threshhold = 150;
    let swipeDirection = 'none';

    let transformValue = `translate(170px, 170px)`

    function handlePan(event) {
        xCoord = event.detail.x - centerX
        yCoord = event.detail.y - centerY
        if (!touchStarted) {
            xStart = xCoord;
            yStart = yCoord;
            touchStarted = true;
        }
        transformValue = `translate(${event.detail.x - cardW/2}px, ${event.detail.y - cardH/2}px) rotate(${xCoord/15}deg)`
        if (xCoord - xStart > threshhold) {
            swipeDirection = 'right';
        } else if (xCoord - xStart < -threshhold) {
            swipeDirection = 'left';
        }
        else {
            swipeDirection = 'none'
        }
    }

    function handlePanEnd() {
        touchStarted = false;
        transformValue = `translate(${centerX- cardW/2}px, ${centerY- cardH/2}px)`
        xCoord = 0;
        yCoord = 0;
    }
</script>

<FadeIn>
<p>X Start: {xStart}</p>
<p>X Coordinate: {xCoord}</p>
<p>Y Coordinate: {yCoord}</p>
<p>Swipe Direction: {swipeDirection}</p>
<div use:pan={{delay: 0}} on:pan={handlePan} on:touchon:mouseup={handlePanEnd} on:touchend={handlePanEnd} class="bg-gray-300" style="width: {containerW}px; height: {containerH}px">
    <div class="bg-yellow rounded-2xl {!touchStarted && 'duration-300'}" style="height: {cardW}px; width: {cardH}px; transform: {transformValue}"></div>
</div>
</FadeIn>
