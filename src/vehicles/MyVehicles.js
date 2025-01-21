import { useState, useEffect, useContext } from "react";

import "./MyVehicles.css";
import VehicleCard from "./VehicleCard";
import VehicleList from "./VehicleList";
import { AuthContext } from "../context/auth-context";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const MyVehicles = () => {
  const auth = useContext(AuthContext);

  const [loadedVehicles, setLoadedVehicles] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/vehicles/vehicles/${auth.userId}`
        );
        const responseData = await response.json();
        console.log("loadedVehicles >> ", responseData.data.vehicles);
        setLoadedVehicles(responseData.data.vehicles);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "error while getting vehicles by user id");
        console.log("Error while retrieving");
      }
    };
    getVehicles();
  }, [auth.userId]);

  const clearError = () => {
    setError(false);
  };

  return (
    <>
      <div style={{ marginTop: "100px" }}></div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedVehicles && <VehicleList items={loadedVehicles} />}
    </>
  );
};

export default MyVehicles;
