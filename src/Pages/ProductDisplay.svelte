<script>
  import LoadingState from '../Components/LoadingState.svelte';
  import Sorting from '../Components/Sorting.svelte';
  import CategoryFilter from '../Components/CategoryFilter.svelte';
  import { onMount } from 'svelte';
 

  let products = [];
  let filteredProducts = [];
  let loading = true;
  let error = null;
  let currentCategory = '';
  let sortOption = '';

  async function fetchProducts(category = '') {
      const url = category
          ? `https://fakestoreapi.com/products/category/${category}`
          : 'https://fakestoreapi.com/products';

      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error('Failed to fetch data');
          }
          products = await response.json();
          applyFilters();
      } catch (err) {
          error = err.message || 'An error occurred';
      } finally {
          loading = false;
      }
  }

  function applyFilters() {
      let filtered = [...products];

      if (sortOption === 'asc') {
          filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'desc') {
          filtered.sort((a, b) => b.price - a.price);
      }

      filteredProducts = filtered;
  }

  function handleCategoryChange(event) {
      currentCategory = event.detail;
      fetchProducts(currentCategory);
  }

  function handleSortChange(event) {
      sortOption = event.detail;
      applyFilters();
  }

  function handleReset() {
      currentCategory = '';
      sortOption = '';
      fetchProducts(); 
  }

  function handleProductClick(id) {
      window.location.href = `/product/${id}`; 
  }

  onMount(() => fetchProducts());
</script>

<main>
  {#if loading}
      <LoadingState />
  {:else if error}
      <p>Error: {error}</p>
  {:else}
      <Sorting on:sortChange={handleSortChange} on:reset={handleReset} />
      <CategoryFilter on:categoryChange={handleCategoryChange} />

      <div class="product-list">
          {#each filteredProducts as product}
              <div class="product-card" 
                  role="button"
                  on:click={() => handleProductClick(product.id)}
                  on:keypress={(e) => e.key === 'Enter' && handleProductClick(product.id)}
                  tabindex=0
                  aria-label={`View details for ${product.title}`}>

                  <div class="product-title">{product.title}</div>
                    <div class="product-image">
                       <img src="{product.image}" alt="{product.title}" class="product-image" />
                    </div>
                  <div class="product-price">$ {product.price}</div>
                  <div class="product-category">{product.category}</div>
              </div>
          {/each}
      </div>
  {/if}
</main>


<style>
  .product-list{
     display: flex;
     flex-wrap: wrap;
     gap: 16px;
     justify-content: center;
    }

  .product-card{
     display: flex;
     border: 1px solid black;
     border-radius: 10px;
     width: 350px;
     height: 500px;
     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
     transition: transform 0.2s;
     display: flex;
     flex-direction: column;
     align-items: center; 
     text-align: center; 
     margin-top: 80px;
    }

  .product-title {
    padding: 10px;
    font-size: 1.2em;
    margin-bottom: 10px;
    height: 60px;
    }

  .product-image {
    width: 200px;
    height: 300px;
    object-fit: contain;
    margin-bottom: 10px;
    }

  .product-price {
    font-size: 1.2em;
    color: #333;
    margin-bottom: 10px;
    }

  .product-category {
    font-size: 0.9em;
    color: #777;
    }

</style>