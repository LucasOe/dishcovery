<script>
    let tabs = [
        {name: "Kochbuch", link: "#recipes"},
        {name: "Add new", link: "#add"},
        {name: "filter", link: "#filter:"},
        {name: "profile", link: "#profile"},

    ]
</script>

<header>
    <!-- Navigation bar -->
    <div class="flex flex-row justify-around font-default">
        <!-- Header left side (Recipes, Add new) -->
        <div class="flex flex-row w-full">
            <p>X</p>
            <p>+</p>
        </div>

        <!-- Header right side (Filter, Profile) -->
        <div class="flex flex-row">
            <p>=</p>
            <div></div>
        </div>
    </div>
</header>