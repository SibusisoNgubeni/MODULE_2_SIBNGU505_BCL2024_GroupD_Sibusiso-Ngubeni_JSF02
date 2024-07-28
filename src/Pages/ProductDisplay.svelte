<script>
  
  import LoadingState from '../Components/LoadingState.svelte';
    import Sorting from '../Components/Sorting.svelte';
    import { onMount } from 'svelte';
  
    let data = null;
    let loading = true;
    let error = null;
  
    
    onMount(async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        data = await response.json();
      } catch (err) {
        error = err.message || 'An error occurred';
      } finally {
        const hideLoadingTimeout = setTimeout(() => {
        loading = false;
      }, 2500);
      }
    });
  </script>
  
  <main>
    {#if loading}
      <LoadingState/>
    {:else if error}
      <p>Error: {error}</p>
    {:else}
     <Sorting/>
    <div class="product-list">
        {#each data as product}
       
         <div class="product-card">
          <div class="product-title">{product.title}</div>
          <div class="product-image"><img src="{product.image}" alt="product" class="product-image"/></div>
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