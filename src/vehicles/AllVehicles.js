import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./AllVehicles.css";

import VehicleList from "./VehicleList";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const AllVehicles = () => {
  const [loadedVehicles, setLoadedVehicles] = useState();
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
      "Query String in Use Effect All Vehicles Component >>>",
      queryOptions
    );

    const getVehicles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/vehicles/allvehicles?${queryOptions}`
        );
        const responseData = await response.json();
        // console.log(responseData);
        if (responseData.status === "fail" || responseData.status === "error") {
          throw new Error(
            responseData.message || "Error While Fetching vehicles Data"
          );
        }
        setLoadedVehicles(responseData.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "error while fetching vehicles data");
        console.log("error while fetching vehicles data");
      }
    };
    getVehicles();
  }, [query]);

  const clearError = () => {
    setError(false);
  };
  return (
    <>
       <div id="vehicle_filter">
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
      <div id="vehicle_list_component">
        {!isLoading && loadedVehicles && <VehicleList items={loadedVehicles} />}
      </div>
    </>
  );
};

export default AllVehicles;
