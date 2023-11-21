<script lang="ts">
	import FadeIn from "$lib/components/FadeIn.svelte";
    import { pan } from 'svelte-gestures';


    let xStart = 0;
    let yStart = 0;
    let touchStarted = false;

    let xCoord = 0;
    let yCoord = 0;
    let swipeDirection = '';

    function handlePan(event) {
        xCoord = event.detail.x;
        yCoord = event.detail.y;
        if (!touchStarted) {
            xStart = xCoord;
            yStart = yCoord;
            touchStarted = true;
        }
        if (xCoord - xStart > 200) {
            swipeDirection = 'right';
        } else if (xCoord - xStart < -200) {
            swipeDirection = 'left';
        }
    }

    function handlePanEnd() {
        touchStarted = false;
    }
</script>

<FadeIn>
<p>X Start: {xStart}</p>
<p>X Coordinate: {xCoord}</p>
<p>Y Coordinate: {yCoord}</p>
<p>Swipe Direction: {swipeDirection}</p>
<div use:pan={{delay: 0}} on:pan={handlePan} on:mouseup={handlePanEnd} style="width: 500px; height: 500px; background-color: blue;">
    <div style="width: 100px; height: 100px; background-color: red"></div>
</div>
</FadeIn>
