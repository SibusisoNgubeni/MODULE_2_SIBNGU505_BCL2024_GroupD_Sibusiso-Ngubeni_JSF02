<script>
  import { createEventDispatcher } from 'svelte';

    /**
   * Event dispatcher for emitting events to parent components.
   */
  const dispatch = createEventDispatcher();

    /** 
   * The currently selected sort option.
   * @type {string}
   */
  let sortOption = '';


   /**
   * Handles changes in the sort option dropdown selection.
   * Dispatches a 'sortChange' event with the selected sort option.
   */
  function handleSortChange(event) {
      sortOption = event.target.value;
      dispatch('sortChange', sortOption);
  }

  function handleReset() {
      dispatch('reset');
  }
</script>

<select class="sort" on:change={handleSortChange}>
     <option value="">Sort by Price</option>
     <option value="asc">Price: Low to High</option>
     <option value="desc">Price: High to Low</option>
</select>
    <button on:click={handleReset}>Reset</button>



  <style>

.sort{
  height: 40px;
  width: 150px;
  margin-left: 500px;
  margin-top: 20px;
  background-color: rgb(149, 239, 234);
  border-radius: 5px;
}

</style>
