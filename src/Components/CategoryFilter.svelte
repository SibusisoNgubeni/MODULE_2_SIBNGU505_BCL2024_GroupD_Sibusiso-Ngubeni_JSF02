
<script>
    import { createEventDispatcher, onMount } from 'svelte';
    const dispatch = createEventDispatcher();

    let categories = [];
    let selectedCategory = '';

    onMount(async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        categories = [...new Set(products.map(product => product.category))];
    });

    function handleChange(event) {
        selectedCategory = event.target.value;
        dispatch('categoryChange', selectedCategory);
    }
</script>

<select on:change={handleChange}>
    <option value="">All Categories</option>
    {#each categories as category}
        <option value={category}>{category}</option>
    {/each}
</select>

<style>
    
</style>
