import React from "react";
import Restaurant from './Restaurant.js'

const Restaurants = (props) => {
    const [restaurants, setRestaurants] = React.useState([]);

    React.useEffect(() => {
        // Check if user has geolocation activated
        if (navigator.geolocation) {
            // Get the list of restaurants ordered by distance from our position
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position.coords.latitude, position.coords.longitude)
                fetch(`http://localhost:3001/restaurants?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`)
                    .then(res => res.json())
                    .then(data => setRestaurants(data.restaurants))
            })
        } 
        else {
            // Get the list of restaurants in any order
            console.log("no location")
            fetch("http://localhost:3001/restaurants")
                .then(res => res.json())
                .then(data => setRestaurants(data.restaurants))
        }
    }, []);

    return (
        // List of restaurants
        <div className="Restaurants">
            {restaurants.map(restaurant => <Restaurant restaurant={restaurant} key={restaurant.id}/>)}
        </div>
    );
}

export default Restaurants;
