const index = require('./index')
const https = require('https')
const fetch = require('node-fetch')

describe('Retreive data functions', () => {
    test("getRestaurantsList should return the list of restaurants", () => {
        let expected = JSON.stringify({list: [
            {
                "id": 1,
                "name": "Restaurante A",
                "image": "https://elitetraveler.com/wp-content/uploads/2007/02/Caelis_Barcelona_alta2A0200-1-730x450.jpg",
                "open": true
            },
            {
                "id": 2,
                "name": "Restaurante B",
                "image": "https://media-cdn.tripadvisor.com/media/photo-s/1c/1c/2f/22/centonze-restaurant.jpg",
                "open": true
            },
            {
                "id": 3,
                "name": "Restaurante C",
                "image": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Restaurant_N%C3%A4sinneula.jpg",
                "open": false
            },
            {
                "id": 4,
                "name": "Restaurante D",
                "image": "https://www.therooftopguide.com/rooftop-news/Bilder/rooftop-restaurant-barcelona-mood-rooftop-bar.jpg",
                "open": true
            },
            {
                "id": 5,
                "name": "Restaurante E",
                "image": "https://pea-7f65.kxcdn.com/img/image_db/best_restaurants_barcelona_cinc_sentits_dining_room-942.jpg",
                "open": false
            }
        ]})

        let have = JSON.stringify({list: index.getRestaurantsList()})
 
        expect(expected).toBe(have)
    })

    test("getRestaurantsListOrdered should return the list of restaurants ordered by distance", () => {
        let expected = JSON.stringify({list: [
            {
                "id": 3,
                "name": "Restaurante C",
                "image": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Restaurant_N%C3%A4sinneula.jpg",
                "open": false
            },
            {
                "id": 1,
                "name": "Restaurante A",
                "image": "https://elitetraveler.com/wp-content/uploads/2007/02/Caelis_Barcelona_alta2A0200-1-730x450.jpg",
                "open": true
            },
            {
                "id": 2,
                "name": "Restaurante B",
                "image": "https://media-cdn.tripadvisor.com/media/photo-s/1c/1c/2f/22/centonze-restaurant.jpg",
                "open": true
            },
            {
                "id": 4,
                "name": "Restaurante D",
                "image": "https://www.therooftopguide.com/rooftop-news/Bilder/rooftop-restaurant-barcelona-mood-rooftop-bar.jpg",
                "open": true
            },
            {
                "id": 5,
                "name": "Restaurante E",
                "image": "https://pea-7f65.kxcdn.com/img/image_db/best_restaurants_barcelona_cinc_sentits_dining_room-942.jpg",
                "open": false
            }
        ]})

        let have = JSON.stringify({list: index.getRestaurantsListOrdered(41.490553687004606, 2.359068939088839)})
 
        expect(expected).toBe(have)
    })

    test("getRestaurantCatalog should return a given restaurant's catalog", () => {
        let expected = JSON.stringify({list: [
            {
                "category": "entrantes",
                "products": [
                    {
                        "name": "producto b",
                        "description": "no tan bonita descripción",
                        "image": "https://www.mylatinatable.com/wp-content/uploads/2018/04/Tostadas-4.jpg",
                        "price": 2.25
                    }
                ]
            },
            {
                "category": "principales",
                "products": [
                    {
                        "name": "producto b",
                        "description": "no tan bonita descripción",
                        "image": "https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2019/05/tortilla-espa%C3%B1ola.jpg",
                        "price": 2.25
                    },
                    {
                        "name": "producto c",
                        "description": "pésima descripción",
                        "image": "https://www.maricruzavalos.com/wp-content/uploads/2014/07/mexican-tortillas-recipe.jpg",
                        "price": 2.25
                    }
                ]
            }
        ]})

        let have = JSON.stringify({list: index.getRestaurantCatalog(4)})
 
        expect(expected).toBe(have)
    })

    test("getRestaurantCatalogByQuery should return a given restaurant's catalog (only those products that match the query)", () => {
        let expected = JSON.stringify({list: [
            {
                "category": "entrantes",
                "products": [
                    {
                        "name": "producto a",
                        "description": "bonita descripción",
                        "image": "https://images.ecestaticos.com/RBNI_AeePMFItQJFdT4EU-ryIdo=/73x0:2632x1802/992x700/filters:fill(white):format(JPG)/f.elconfidencial.com%2Foriginal%2F8dd%2F4ba%2F414%2F8dd4ba414c94c4d2a12a2e85d0ec2a3f.jpg",
                        "price": 0.5
                    }
                ]
            },
            {
                "category": "principales",
                "products": [
                    {
                        "name": "producto entrante c",
                        "description": "pésima descripción",
                        "image": "https://www.maricruzavalos.com/wp-content/uploads/2014/07/mexican-tortillas-recipe.jpg",
                        "price": 2.25
                    }
                ]
            }
        ]})

        let have = JSON.stringify({list: index.getRestaurantCatalogByQuery(2, "entrante")})
 
        expect(expected).toBe(have)
    })
})

describe('Calls to the API', () => {
    test("GET /restaurants?latitude=XX&longitude=YY should return the list of restaurants ordered by distance", async () => {
        let expected = JSON.stringify({restaurants: [
            {
                "id": 3,
                "name": "Restaurante C",
                "image": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Restaurant_N%C3%A4sinneula.jpg",
                "open": false
            },
            {
                "id": 1,
                "name": "Restaurante A",
                "image": "https://elitetraveler.com/wp-content/uploads/2007/02/Caelis_Barcelona_alta2A0200-1-730x450.jpg",
                "open": true
            },
            {
                "id": 2,
                "name": "Restaurante B",
                "image": "https://media-cdn.tripadvisor.com/media/photo-s/1c/1c/2f/22/centonze-restaurant.jpg",
                "open": true
            },
            {
                "id": 4,
                "name": "Restaurante D",
                "image": "https://www.therooftopguide.com/rooftop-news/Bilder/rooftop-restaurant-barcelona-mood-rooftop-bar.jpg",
                "open": true
            },
            {
                "id": 5,
                "name": "Restaurante E",
                "image": "https://pea-7f65.kxcdn.com/img/image_db/best_restaurants_barcelona_cinc_sentits_dining_room-942.jpg",
                "open": false
            }
        ]})

        const res = await fetch(`http://localhost:3001/restaurants`)
        const have = await res.json()
 
        expect(expected).toBe(JSON.stringify(have))
    })

    test("GET /restaurant/:id/catalog should return the catalog of the restaurant identified by id", async () => {
        let expected = JSON.stringify({catalog: [
            {
                "category": "entrantes",
                "products": [
                    {
                        "name": "producto a",
                        "description": "bonita descripción",
                        "image": "https://images.ecestaticos.com/RBNI_AeePMFItQJFdT4EU-ryIdo=/73x0:2632x1802/992x700/filters:fill(white):format(JPG)/f.elconfidencial.com%2Foriginal%2F8dd%2F4ba%2F414%2F8dd4ba414c94c4d2a12a2e85d0ec2a3f.jpg",
                        "price": 0.5
                    },
                    {
                        "name": "producto b",
                        "description": "no tan bonita descripción",
                        "image": "https://www.mylatinatable.com/wp-content/uploads/2018/04/Tostadas-4.jpg",
                        "price": 2.25
                    }
                ]
            },
            {
                "category": "principales",
                "products": [
                    {
                        "name": "producto a",
                        "description": "bonita descripción",
                        "image": "https://dam.cocinafacil.com.mx/wp-content/uploads/2019/02/tostada-mariscos.png",
                        "price": 0.5
                    }
                ]
            }
        ]})

        const res = await fetch(`http://localhost:3001/restaurant/5/catalog`)
        const have = await res.json()
 
        expect(expected).toBe(JSON.stringify(have))
    })

    test("GET /restaurant/:id/catalog should return 404 error message if there's no restaurant with the given id", async () => {
        let expected = 404

        const res = await fetch(`http://localhost:3001/restaurant/9/catalog`)
        const have = res.status
        console.log(have)
 
        expect(expected).toBe(have)
    })
})