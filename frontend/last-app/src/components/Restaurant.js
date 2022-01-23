import React from "react";
import { useNavigate } from 'react-router-dom';

const  Restaurant = (props) => {

  const navigate = useNavigate()

  const handleClick = () => {
    // Show the catalog of the restaurant
    navigate(
      "catalog", 
      {state: {restaurant: props.restaurant.id}}
    )
  }

  return (
    <div className="Restaurant" onClick={handleClick.bind(this)}>
      <img src={props.restaurant.image}/>
      <div>
        <p style={{textAlign: "left"}}>{props.restaurant.name}</p>
        {props.restaurant.open ? <p style={{color:"green"}}>Open</p> : <p style={{color:"red"}}>Closed</p>}
      </div>
    </div>
  );
}

export default Restaurant;
