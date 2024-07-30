# **Svelte E-Commerce Project**

## **Overview**

A dynamic e-commerce web application that i built with Svelte. The application fetches data from an API and incorporates user interactions, such as selecting categories, sorting products, and viewing detailed product information.

## **Features**

1. Product Listing: Displays a list of products fetched from an API.
2. Category Filtering: Allows users to filter products based on categories.
3. Sorting: Users can sort products by price in ascending or descending order.
4. Product Details: Click on a product to view detailed information.

## **Usage**

### **Home Page**
  - Displays a list of products.
  - Users can filter products by category and sort them by price.
  - Clicking on a product navigates to the detailed product view.

### **Product Detail Page**
  - Shows detailed information about the selected product.
  - Users can navigate back to the product list, with previously applied filters preserved.

### **Code Snippets**

## **Applying Filters and Sorting**

 ```
     function applyFilters() {
      let filtered = [...products];

      if (sortOption === 'asc') {
          filtered.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'desc') {
          filtered.sort((a, b) => b.price - a.price);
      }

      filteredProducts = filtered;
  }
```

## **Fetch products based on the selected category and update the products list.**
   
   ```
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
  ```