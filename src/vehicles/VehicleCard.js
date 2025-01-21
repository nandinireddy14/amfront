import React from "react";
import { useNavigate } from "react-router-dom";
import "./VehicleCard.css";
const VehicleCard = (props) => {
  const navigate = useNavigate();
  // console.log("in vehicle card props.id >>>> ", props.id);
  const getDetailsHandler = () => {
    navigate(`/vehicledetails/${props.id}`);
  };
  return (
    <li style={{ padding: "20px 20px" }}>
      <div id="containerv">
        <div class="cardv">
          <img
            src={`${process.env.REACT_APP_ASSET_URL}/img/vehicles/${props.images[0]}`}
            alt={`${props.images[0]}`}
          />
          <div class="card__detailsv">
            {/* <span class="tag">{props.vehicle_type}</span> */}

            <div class="namev">{props.vehiclename} </div>

            <div id="rentv">
            <span style={{ fontSize: "20px", color: "black" }}>
              ₹{props.price}
            </span>
            <span style={{ color: "darkgrey" }}>/Hour</span>
            </div>

            <div id="locationp"><i className="fas fa-map-marker-alt"></i> {props.location} </div>
            <button style={{ marginTop: "30px" }} onClick={getDetailsHandler}>
              Vehicle Details
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
export default VehicleCard;
