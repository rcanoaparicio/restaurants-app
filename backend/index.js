const express = require('express')
const cors = require('cors')
const fs = require('fs')

const app = express()
const port = 3001

const data = JSON.parse(fs.readFileSync("./restaurants.json"))

/**
 * Returns the list of restaurants
 * @return {[Restaurant]} List of restaurants
 */
const getRestaurantsList = () => {
    return data.restaurants.map(restaurant => {
        return {
            id: restaurant.id,
            name: restaurant.name,
            image: restaurant.image,
            open: restaurant.open
        }
    })
} 

/**
 * Returns the list of restaurants ordered by distance from the origin point
 * @param {flaot} latitude Latitude of the origin position
 * @param {flaot} longitude Longitude of the origin position
 * @return {[Restaurant]} List of restaurants ordered by distance
 */
const getRestaurantsListOrdered = (latitude, longitude) => {

    return data.restaurants.sort((a, b) => {
        let distance_a = Math.sqrt(Math.pow(a.latitude-latitude, 2), Math.pow(a.longitude-longitude, 2))
        let distance_b = Math.sqrt(Math.pow(b.latitude-latitude, 2), Math.pow(b.longitude-longitude, 2))
        return distance_a - distance_b
    }).map(restaurant => {
        return {
            id: restaurant.id,
            name: restaurant.name,
            image: restaurant.image,
            open: restaurant.open
        }
    })

} 

/**
 * Returns the catalog of a given restaurant
 * @param {int} restaurant_id ID of the restaurant
 * @return {Catalog} Catalog object
 */
const getRestaurantCatalog = (restaurant_id) => {

    for (let i = 0; i < data.restaurants.length; i++) {
        if (data.restaurants[i].id == restaurant_id) return data.restaurants[i].catalog
    }
    return []
}

/**
 * Returns the catalog of a given restaurant filtered by a query
 * @param {int} restaurant_id ID of the restaurant
 * @param {string} query Filter query
 * @return {Catalog} Catalog object
 */
const getRestaurantCatalogByQuery = (restaurant_id, query) => {
    let restaurant_catalog = getRestaurantCatalog(restaurant_id)
    let final_catalog = []
    for (let i = 0; i < restaurant_catalog.length; i++) {
        if (restaurant_catalog[i].category.toLowerCase().includes(query.toLowerCase())) {
            final_catalog.push(restaurant_catalog[i])
            continue
        }

        let products = restaurant_catalog[i].products.filter(product => {
            return product.name.toLowerCase().includes(query.toLowerCase())
        })

        if (products.length > 0) {
            final_catalog.push({
                category: restaurant_catalog[i].category,
                products: products
            })
        }
    }

    return final_catalog
}


app.use(cors())


/**
 * @GET {/restaurants} Returns the list of all restaurants
 * @response {JSON} Code 200, List of all restaurants
 */
app.get('/restaurants', (req, res) => {
    let list = []

    if (!req.query.latitude || !req.query.longitude) {
        list = getRestaurantsList()
    }
    else {
        list = getRestaurantsListOrdered(req.query.latitude, req.query.longitude)
    }

    res.status(200).send(JSON.stringify({restaurants: list}))
});

/**
 * @GET {/restaurant/:id/catalog} Returns the catalog for a given restaurant
 * @param {int} id Restaurant identifier
 * @response {JSON} Code 200, Catalog of the restaurant
 * @response {JSON} Code 404, Restaurant not found
 */
app.get('/restaurant/:id/catalog', (req, res) => {
    const restaurant_id = req.params.id;
    
    if (data.restaurants.filter(restaurant => restaurant.id == restaurant_id) == 0) {
        res.status(404).send(JSON.stringify({catalog: []}))
        return
    }

    let list = []
    if (!req.query.query)
        list = getRestaurantCatalog(restaurant_id)
    else
        list = getRestaurantCatalogByQuery(restaurant_id, req.query.query)
    
    res.status(200).send(JSON.stringify({catalog: list}))
});


app.listen(port, () => console.log(`Server listening on port ${port}!`))
module.exports = {getRestaurantsList, getRestaurantsListOrdered, getRestaurantCatalog, getRestaurantCatalogByQuery};