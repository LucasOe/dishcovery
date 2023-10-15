<script>
    import TestImg from "../assets/img/test-img.jpg"
	import Tag from "./Tag.svelte";
    import ClockIcon from "../assets/icons/clock.svg";
    import DifficultyIcon from "../assets/icons/difficulty.svg";
    import EuroIcon from "../assets/icons/euro.svg";
    const TestImgSrc = TestImg;

    let recipyTime = 5;
    let difficulty = "einfach";
</script>


<div 
    class="card relative w-full bg-gray-900 rounded-xl shadow-shadow overflow-hidden flex items-end" 
    style="background-image: url({TestImgSrc}); background-size: cover; background-position: center; background-repeat: no-repeat, repeat;"
>

    <!-- Card Infos -->
    <div class="flex flex-col z-10 p-lg gap-sm">

        <!-- stars -->

        <!-- header -->
        <h1 class="font-header text-light text-fs-header">Recipe Name</h1>

        <!-- tags, this is shitty, should be dynamic somehow with the super duper base -->
        <div class="flex flex-row gap-sm">
            <Tag>
                schnell
            </Tag>
            <Tag>
                toll
            </Tag>
            <Tag>
                lecker
            </Tag>
        </div>

        <!-- infos (time, difficulty, price), needs to be dynamic as well lul -->
        <div class="flex flex-row gap-md">
            <div class="flex flex-row gap-xs">
                <img class="w-5 h-5" src={ClockIcon} />
                <p>{recipyTime} Min.</p>
            </div>
            <div class="flex flex-row gap-xs">
                <img class="w-5 h-5" src={DifficultyIcon} />
                <p>{difficulty}</p>
            </div>
            <div class="flex flex-row gap-xs">
                <img class="w-5 h-5" src={EuroIcon} />
                <img class="w-5 h-5" src={EuroIcon} />
            </div>
        </div>

    </div>

    <!-- linear gradient fade for info content -->
    <div class="fade absolute w-full h-full top-0 left-0 z-0"></div>

</div>


<style>
    /* heights are weird, i wanna fill to content but it wont let me, pls help */
    .card { 
        min-height: 550px;
    }
    .fade {
        background: linear-gradient(180deg, rgba(66, 66, 66, 0.00) 50%, rgba(43, 42, 42, 0.88) 65%, rgba(43, 42, 42, 0.95) 75%, #212121 85%, #212121 100%);
    }
</style>