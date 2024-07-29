<script>
  import { Link } from 'svelte-routing';


    import LoadingState from '../Components/LoadingState.svelte';
    import { onMount } from 'svelte';
  
    let data = null;
    let loading = true;
    let error = null;
    const productId = 2; 
  
    onMount(async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        data = await response.json();
      } catch (err) {
        error = err.message || 'An error occurred';
      } finally {
        const LoadingTimeout = setTimeout(() => {
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
      <div class="product-detail">
        <div class="product-card">
          <div class="product-image">
            <img src="{data.image}" alt="product" class="product-image"/>
          </div>
        </div>

          <div class="info-block">
            <div class="product-title">{data.title}</div>
            <div class="product-category">{data.category}</div>
            <div class="product-description">{data.description}</div>
            <div class="rating"> Rating: {data.rating.rate} Count: {data.rating.count}</div>
          </div>

          <div class="buy-block">
            <div class="product-price">$ {data.price}</div>
            <button>Add to cart</button>
          </div>
        </div>

      
    {/if}
    <Link to="/">Bac to products</Link>
</main>
  
<style>
    .product-detail{
        display: flex;
        justify-content: center;
    }

    .product-card{
        display: flex;
        border: 1px solid black;
        border-radius: 10px;
        width: 500px;
        height: 500px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
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
    width: 400px;
    height: 500px;
    object-fit: contain;
    margin-bottom: 10px;
    }

   .product-price {
    font-size: 1.2em;
    color: #333;
    margin-bottom: 10px;
    }

   .product-category {
    font-size: 20px;
    color: #535353;
    margin-bottom: 20px;
    }

    .product-description{
      font-size: 18px;
      color: #000000;
      margin-bottom: 20px;
    }
    
    .info-block{
      display: flex;
        border: 0px solid black;
        border-radius: 10px;
        width: 500px;
        height: 500px; /* Adjusted from 7000px */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        flex-direction: column;
        align-items: center; 
        text-align: center; 
        margin-top: 80px;
    }

    .buy-block{
      display: flex;
        border: 0px solid black;
        border-radius: 10px;
        width: 300px;
        height: 300px; /* Adjusted from 7000px */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        flex-direction: column;
        align-items: center; 
        text-align: center; 
        margin-top: 80px;
    }

</style>
