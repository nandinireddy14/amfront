import { useState, useEffect, useContext } from "react";

// // import "./MyProducts.css";
// import TransactionCard from "./TransactionCard";
import TransactionList from "./TransactionList";
import { AuthContext } from "../context/auth-context";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const MyTransactions = () => {
  const auth = useContext(AuthContext);
  
  const [loadedTransactions, setLoadedTransactions] = useState();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/transactions/${auth.userId}`
        );
        const responseData = await response.json();
        console.log("loadedTransactions >> ", responseData.data);
        setLoadedTransactions(responseData.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "error while getting transactions by user id");
        console.log("Error while retrieving");
      }
    };
    getTransactions();
  }, [auth.userId]);

  const clearError = () => {
    setError(false);
  };

  return (
    <div style={{ marginTop: "100px", marginBottom: "100px" }}>
      <h2 style={{color:"black", marginLeft:"80px"}}>Your Payment History:</h2>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      {!isLoading && loadedTransactions && <TransactionList items={loadedTransactions} />}
    </div>
  );
};

export default MyTransactions;
