<script>
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  let sortOption = '';

  function handleSortChange(event) {
      sortOption = event.target.value;
      dispatch('sortChange', sortOption);
  }

  function handleReset() {
      dispatch('reset');
  }
</script>

<select on:change={handleSortChange}>
     <option value="">Sort by Price</option>
     <option value="asc">Price: Low to High</option>
     <option value="desc">Price: High to Low</option>
</select>
    <button on:click={handleReset}>Reset</button>



  