import React from "react";
import ProductCard from "./ProductCard";
const ProductList = (props) => {
  if (props.items.length === 0) {
    return <h1>No Product !</h1>;
  }
  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        listStyle: "none",
        margin: "auto",
      }}
    >
      {props.items.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          productname={product.productname}
          author={product.author}
          price={product.price}
          description={product.description}
         
          email={product.email}
          phone={product.phone}
          images={product.images}
          location={product.location}
          upi={product.upi}
          creator={product.creator}
        />
      ))}
    </ul>
  );
};
export default ProductList;
