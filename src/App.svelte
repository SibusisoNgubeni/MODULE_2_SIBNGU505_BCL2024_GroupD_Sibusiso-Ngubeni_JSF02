<script>
 
  import { Router, Route } from "svelte-routing";
  import DetailedProductView from "./Pages/DetailedProductView.svelte";
  import Header from "./Components/Header.svelte";
  import ProductDisplay from "./Pages/ProductDisplay.svelte";
 
</script>
<Header/>
<Router>
  <Route path="/1" component={DetailedProductView} />
 <Route path="/" component={ProductDisplay}/>


</Router>
  
  



<style>
 
</style>
