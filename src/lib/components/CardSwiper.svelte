<script lang="ts">
    import { pan } from 'svelte-gestures';

    let cardW;
    let cardH;

    let xStart = 0;
    let yStart = 0;

    let xCoord = 0;
    let yCoord = 0;

    let threshhold = 150;
    let touchStarted = false;

    enum direction {
        none,
        left,
        right,
        up
    }
    let swipeDirection = direction.none;

    let transformValue = `translate(0px, 0px)`
    let scale
    let rotation

    function handlePan(event) {

        xCoord = event.detail.x
        yCoord = event.detail.y

        if (!touchStarted) {
            xStart = xCoord;
            yStart = yCoord;
            touchStarted = true;
        }
        scale = 1 + Math.abs((xCoord-xStart)/(cardW*15))
        rotation = (xCoord-xStart)/30 + "deg";
        transformValue = `translate(${xCoord - xStart}px, ${yCoord - yStart}px) rotate(${rotation}) scale(${scale})`

        if (xCoord - xStart > threshhold) {
            swipeDirection = direction.right;
        }
        else if (xCoord - xStart < -threshhold) {
            swipeDirection = direction.left;
        }
        else {
            swipeDirection = direction.none
        }
    }

    function handlePanEnd() {
        swipeDirection = direction.none
        touchStarted = false;
        transformValue = `translate(0px, 0px)`
        xCoord = 0;
        yCoord = 0;
    }
</script>


<style>
    .transition-transform-slow {
        transition: all 300ms, transform 250ms;
    }
    .transition-transform-instant {
        transition: all 300ms, transform 0s;
    }
</style>

<div use:pan={{delay: 0}} on:pan={handlePan} on:mouseup={handlePanEnd} on:touchend={handlePanEnd} class="flex-auto">
    <div class="overflow-hidden h-full {!touchStarted ? 'transition-transform-slow' : 'transition-transform-instant'} {swipeDirection === direction.none ? 'bg-gray-900 border-gray-900 shadow-gray' : swipeDirection === direction.right ? 'border-yellow bg-yellow shadow-yellow' : ' border-red bg-red shadow-red'}  border-2 rounded-xl relative flex" bind:offsetHeight={cardH} bind:offsetWidth={cardW} style="transform: {transformValue}">
        <slot/>
        <div class="absolute h-full w-full bg-gradient-to-b from-transparent from-50% to-gray-900"></div>
    </div>
</div>
