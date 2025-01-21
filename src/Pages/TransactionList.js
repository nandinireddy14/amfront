import React from "react";
import TransactionCard from "./TransactionCard";
const TransactionList = (props) => {
  if (props.items.length === 0) {
    return <h1 style={{color:"black"}}>No Transaction !</h1>;
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
      {props.items.map((transaction) => (
        <TransactionCard
          seller={transaction.seller}
          buyer={transaction.buyer}
          amount={transaction.amount}
          product={transaction.product}
          razorpay_payment_id={transaction.razorpay_payment_id}
        />
      ))}
    </ul>
  );
};
export default TransactionList;
