<script> 
  import { onMount } from 'svelte';
  import LoadingState from '../Components/LoadingState.svelte';
  import { Link } from 'svelte-routing';

  let product = null;
  let loading = true;
  let error = null;

  onMount(async () => {
      const url = window.location.pathname;
      const id = url.split('/').pop(); 

      try {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
           if (!response.ok) {
               throw new Error('Failed to fetch data');
            }
          product = await response.json();
      } catch (err) {
            error = err.message || 'An error occurred';
         } finally {
             loading = false;
         }
    });

  function getRatingStars(rate) {
    const totalStars = 5;
    const filledStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;
    return Array(totalStars).fill(false).map((_, index) => {
      if (index < filledStars) return 'filled';
      if (index === filledStars && hasHalfStar) return 'half';
      return 'empty';
    });
  }

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
               <img src="{product.image}" alt="product" class="product-image"/>
             </div>
          </div>
   
          <div class="info-block">
                <div class="product-title">{product.title}</div>
                <div class="product-category">{product.category}</div>
                <div class="product-description">{product.description}</div>

                <div class="rating"> 
                  <span class="rating-rate">{product.rating.rate}</span>
                    {#each getRatingStars(product.rating.rate) as star, index}
                       <svg 
                         class="rating-star {star}" 
                         xmlns="http://www.w3.org/2000/svg" 
                         fill="currentColor" 
                         viewBox="0 0 22 20"
                         style="width: 20px; height: 20px;" 
                         aria-hidden="true">
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                       </svg>
                    {/each}
                <div class="rating-text">
                  <span class="rating-count">{product.rating.count} ratings</span>
                </div>

          </div>
     </div>
  
      <div class="buy-block">
         <div class="product-price">$ {product.price}</div>
           <button>Add to cart</button>
      </div>
  </div>
        <Link to="/">Back to products</Link>
  {/if}
</main>

  

  
<style>

  .product-detail{
    display: flex;
    justify-content: center;
    margin: 10px;
    }

  .product-card{
    display: flex;
    border: 0px solid black;
    border-radius: 10px;
    width: 500px;
    height: 500px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    flex-direction: column;
    align-items: center; 
    text-align: center; 
    margin-top: 80px;
    margin-right: 10px;
    background-color: #e6d9d9;
    }

  .product-title {
    font-weight: bold;
    margin-top: 20px;
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
    border-radius: 10px;
    }

  .product-price {
    font-weight: bold;
    padding: 10px;
    margin-top: 20px;
    font-size: 1.2em;
    color: #262424;
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
    border-radius: 10px;
    width: 500px;
    height: 500px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    flex-direction: column;
    align-items: center; 
    text-align: center; 
    margin-top: 80px;
    margin-right: 10px;
    background-color: #e6d9d9;
    }

  .buy-block{
    display: flex;
    border-radius: 10px;
    width: 300px;
    height: 300px; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    flex-direction: column;
    align-items: center; 
    text-align: center; 
    margin-top: 80px;
    background-color: #e6d9d9;
    }

    .rating {
    display: flex;
    align-items: center;
    gap: 2px; 
    margin-top: 30px;
    
  }
  
  .rating-star {
    width: 20px;
    height: 20px;
    
  }
  
  .rating-star.filled {
    fill: gold;
  }
  
  .rating-star.half {
    fill: linear-gradient(to right, gold 50%, rgb(0, 0, 0) 50%);
  }
  
  .rating-star.empty {
    fill: rgb(0, 0, 0);
  }
  
  .rating-text {
    margin-top: 8px;
    font-size: 14px;
    text-align: center;
  }

  .rating-rate {
    display: block;
    font-size: 18px;
    font-weight: bold;
    margin-right: 20px;
  }

  .rating-count {
    display: block;
    font-size: 14px;
    color: gray;
    margin-left: 20px;
  }

</style>
