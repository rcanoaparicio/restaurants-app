import React from "react";
import Product from './Product.js'
import { useLocation } from 'react-router-dom';

const Products = (props) => {
    const { state } = useLocation();

    const [catalog, setCatalog] = React.useState([]);
    const [query, setQuery] = React.useState('');

    React.useEffect(() => {
        // Populate the list of products of the restaurant
        fetch(`http://localhost:3001/restaurant/${state.restaurant}/catalog`)
            .then(res => res.json())
            .then(data => setCatalog(data.catalog))
    }, []);

    const handleQuery = (e) => {
        // Update text
        // When the query is changed, update the values in the list of products
        /**
         * TODO:    In order to avoid excessive calls to the server/database we could set a timeout. 
         *          Each time the value is changed, clear the previous timeout and create a new one.
         *          Only execute the call to the server if there's no change after X time.
         */
        setQuery(e.target.value)
        let url = `http://localhost:3001/restaurant/${state.restaurant}/catalog`;
        if (e.target.value.length > 0) url += `?query=${e.target.value}`
        fetch(url)
            .then(res => res.json())
            .then(data => setCatalog(data.catalog))
    }

    return (
        // List of products grouped by category
        <div className="Products">
            <input
                id="filter"
                onChange={handleQuery}
                value={query}
                placeholder="Filter by tag"
            />
            {catalog.map(category => {
                return <div>
                    <p className="category">{category.category}</p>
                    {category.products.map((product) => {
                        return <Product product={product}/>
                    })}
                </div>
            })}
        </div>
    );
}

export default Products;
