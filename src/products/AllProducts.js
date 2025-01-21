import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./AllProducts.css";

import ProductList from "./ProductList";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const AllProducts = () => {
  const [loadedProducts, setLoadedProducts] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [query, setQuery] = useState();


  useEffect(() => {
    let queryOptions = "";
    
   

    if (query && query.length > 2) {
      queryOptions += `q=${query}`;
    }

    console.log(
      "Query String in Use Effect All Products Component >>>",
      queryOptions
    );

    const getProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/products/allproducts?${queryOptions}`
        );
        const responseData = await response.json();
        // console.log(responseData);
        if (responseData.status === "fail" || responseData.status === "error") {
          throw new Error(
            responseData.message || "Error While Fetching products Data"
          );
        }
        setLoadedProducts(responseData.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "error while fetching products data");
        console.log("error while fetching products data");
      }
    };
    getProducts();
  }, [query]);

  const clearError = () => {
    setError(false);
  };
  return (
    <>
       <div id="product_filter">
        <div className="query_div">
          <form>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </form>
        </div>
      </div> 
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div id="product_list_component">
        {!isLoading && loadedProducts && <ProductList items={loadedProducts} />}
      </div>
    </>
  );
};

export default AllProducts;
