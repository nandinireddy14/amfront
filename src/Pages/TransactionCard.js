import React, { useEffect, useState } from "react";
// import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/auth-context";
import "./TransactionCard.css";
const TransactionCard = (props) => {
  const navigate = useNavigate();
  // console.log("in product card props.id >>>> ", props.id);
  //   const getDetailsHandler = () => {
  //     navigate(`/transactiondetails/${props.id}`);
  //   };
  // const auth = useContext(AuthContext);
  // console.log("User---->",auth.userId);


  const [sellerName, setSellerName] = useState();
  const [buyerName, setBuyerName] = useState();

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSellerName = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/${props.seller}`
        );
        const responseData = await response.json();
        console.log("Seller Name   >> ", responseData.data);
        setSellerName(responseData.data.name);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "error while getting name for user id");
      }
    };
    getSellerName();
  }, []);

  useEffect(() => {
    const getBuyerName = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/${props.buyer}`
        );
        const responseData = await response.json();
        console.log("Buyer Name   >> ", responseData.data);
        setBuyerName(responseData.data.name);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "error while getting name for user id");
      }
    };
    getBuyerName();
  }, []);


  return (

    <div id="contentt">
      <div className="cardt">
        <div className="trnsxnText">
          <div className="namet">
            <p><b>Dear User</b></p>
            <p><b> Payment Successful for {props.product}!!</b></p>
            <p><b>Seller:</b>{sellerName}</p>
            <p><b>Buyer:</b>{buyerName}</p>
            <p>of <b> Amount:{props.amount}</b></p>
            <p>with
            <b> RazorpayId:{props.razorpay_payment_id}</b></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TransactionCard;