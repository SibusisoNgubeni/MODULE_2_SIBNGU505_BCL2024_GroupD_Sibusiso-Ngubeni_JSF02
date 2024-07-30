
<script>
    import { createEventDispatcher, onMount } from 'svelte';



     /** 
     * Event dispatcher for emitting events to parent components.
     */
    const dispatch = createEventDispatcher();

    let categories = [];
    let selectedCategory = '';

    onMount(async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        categories = [...new Set(products.map(product => product.category))];
    });

     /**
     * Handles changes in the category dropdown selection.
     * Dispatches a 'categoryChange' event with the selected category.
     */
    function handleChange(event) {
        selectedCategory = event.target.value;
        dispatch('categoryChange', selectedCategory);
    }
</script>

<select class="category-filter" on:change={handleChange}>
    <option value="">All Categories</option>
    {#each categories as category}
        <option value={category}>{category}</option>
    {/each}
</select>

<style>

.category-filter{
    height: 40px;
    width: 150px;
    margin-left: 50px;
    margin-top: 20px;
    background-color: rgb(149, 239, 234);
    border-radius: 5px;
}

</style>

