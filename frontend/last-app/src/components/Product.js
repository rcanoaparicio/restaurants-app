import React from "react";

const  Product = (props) => {
  return (
    <div className="Product">
      <img src={props.product.image}/>
      <div>
        <p style={{textAlign: "left"}}>{props.product.name}</p>
        <p style={{textAlign: "right", fontWeight: "normal"}}>{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(props.product.price)}</p>
      </div>
    </div>
  );
}

export default Product;
