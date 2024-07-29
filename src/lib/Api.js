 function FetchAllProducts() {
    let data = null;
    let loading = true;
    let error = null;

    const fetchData = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            data = await response.json();
        } catch (err) {
            error = err.message || 'An error occurred';
        } finally {
            loading = false;
            render();
        }
    };

    const render = () => {
        const container = document.getElementById('product-list');

        if (loading) {
            container.innerHTML = '<p>Loading...</p>';
            return;
        }

        if (error) {
            container.innerHTML = `<p>Error: ${error}</p>`;
            return;
        }

        const productList = data.map(product => `<li>${product.title}</li>`).join('');
        container.innerHTML = `<ul>${productList}</ul>`;
    };
    fetchData();
}

export default FetchAllProducts;