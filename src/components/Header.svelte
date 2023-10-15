<script>
    import AddIcon from "../assets/icons/add.svg";
    import FilterIcon from "../assets/icons/filter.svg";
    import RecipeIcon from "../assets/icons/recipes.svg";

    let tabs = [
        {name: "Kochbuch", link: "#recipes", icon: RecipeIcon},
        {name: "Add new", link: "#add", icon: AddIcon},
        {name: "filter", link: "#filter:", icon: FilterIcon},
        {name: "profile", link: "#profile", icon: AddIcon},
    ];
</script>

<header>
    <!-- Navigation bar -->
    <div class="flex flex-row justify-around font-default duration-200 py-10">
        {#each tabs as tab, index}
            <a href={tab.link} class="duration-200">
                <img class="w-6 h-6" src={tab.icon} />
            </a>
        {/each}
    </div>
</header>

<!-- Header left side (Recipes, Add new)
        <div class="flex flex-row w-full">
            <p>X</p>
            <p>+</p>
        </div>

        <div class="flex flex-row">
            <p>=</p>
            <div></div>
        </div> -->