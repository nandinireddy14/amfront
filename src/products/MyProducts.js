import { useState, useEffect, useContext } from "react";

import "./MyProducts.css";
import ProductCard from "./ProductCard";
import ProductList from "./ProductList";
import { AuthContext } from "../context/auth-context";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const MyProducts = () => {
  const auth = useContext(AuthContext);

  const [loadedProducts, setLoadedProducts] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/products/products/${auth.userId}`
        );
        const responseData = await response.json();
        console.log("loadedProducts >> ", responseData.data.products);
        setLoadedProducts(responseData.data.products);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "error while getting products by user id");
        console.log("Error while retrieving");
      }
    };
    getProducts();
  }, [auth.userId]);

  const clearError = () => {
    setError(false);
  };

  return (
    <>
      <div style={{ marginTop: "100px" }}></div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedProducts && <ProductList items={loadedProducts} />}
    </>
  );
};

export default MyProducts;
