import React from "react";
import VehicleCard from "./VehicleCard";
const VehicleList = (props) => {
  if (props.items.length === 0) {
    return <h1>No Vehicle !</h1>;
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
      {props.items.map((vehicle) => (
        <VehicleCard
          key={vehicle._id}
          id={vehicle._id}
          vehiclename={vehicle.vehiclename}
          author={vehicle.author}
          price={vehicle.price}
          description={vehicle.description}
         
          email={vehicle.email}
          phone={vehicle.phone}
          location={vehicle.location}
          upi={vehicle.upi}
          images={vehicle.images}
          creator={vehicle.creator}
        />
      ))}
    </ul>
  );
};
export default VehicleList;
