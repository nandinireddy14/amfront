import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth-context";

import LoadingSpinner from "../UIElements/LoadingSpinner";
import ErrorModal from "../UIElements/ErrorModal";
import SuccessModal from "../UIElements/SuccessModal";

import ImageSlider from "../ImageComponents/ImageSlider";

import "./VehicleDetails.css";
import axios from "axios";


const VehicleDetails = () => {

  const checkoutHandler = async (amount) => {
    console.log("innseide :: ", amount);
    // const { data: { key } } = await axios.get("http://localhost:5000/api/getkey")
    const key = "rzp_test_4B0NYZua4ZFh1G";
    const { data: { order } } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/checkout`, {
      amount
    })
    console.log("Creater---------->", loadedVehicle.creater);
    const q = "";
    console.log("Order!!::::", order);
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "AGRI-MARKET",
      description: "RazorPay Payment Gateway",
      //image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: order.id,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999"
      },
      notes: {
        //"address": "Razorpay Corporate Office",
        seller: "asdef",
        buyer: "klabc"
      },
      callback_url: `${process.env.REACT_APP_BACKEND_URL}/paymentverification?seller=${loadedVehicle.creator}&buyer=${auth.userId}&amount=${loadedVehicle.price}&product=${loadedVehicle.vehiclename}`,
      theme: {
        "color": "#121212"
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  console.log(auth)
  const { vehicleId } = useParams("vehicleId");
  console.log("In vehicle details >Vehicle Id >>>", vehicleId);
  const [loadedVehicle, setLoadedVehicle] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getVehicleDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/vehicles/${vehicleId}`
        );
        const responseData = await response.json();
        console.log("Response Data >>>", responseData);
        if (responseData.status === "fail" || responseData.status === "error") {
          throw new Error("Given vehicle ID Is Not valid");
        }
        console.log(
          "In VehicleDetials >Response Data.data >>>",
          responseData.data
        );
        setLoadedVehicle(responseData.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Error While getting Vehicle Details By Id");
        console.log("Error While getting Vehicle Details By Id");
      }
    };
    getVehicleDetails();
  }, [vehicleId]);

  const deleteVehicleHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/vehicles/${vehicleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const responseData = await response.json();
      console.log("in vehicle details response data >>>", responseData);
      if (responseData.status === "fail" || responseData.status === "error") {
        throw new Error(responseData.message || "Error While Deleting vehicle");
      }
      setIsLoading(false);
      setSuccess(true);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Error While Deleting vehicle");
    }
  };

  const updateClickHandler = () => {
    navigate(`/updatevehicle/${vehicleId}`);
  };
  const errorHandler = () => {
    setError(null);
  };

  const successHandler = () => {
    setSuccess(false);
    navigate("/myvehicles");
  };
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

  const [inputText, setInputText] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 👇 Store the input value to local state
    setInputText(e.target.value);
  };

  return (
    <div id="vehicle_details_page">
      <div className="vehicledetails-header"><h1>Vehicle and Farmer Details</h1></div>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <SuccessModal
        success={success}
        successMessage="Vehicle Deleted Successfully!"
        onClear={successHandler}
      />
      {!isLoading && loadedVehicle && (
        <div id="vehicle_details">
          <div className="vehicle_header">
            <h1>{loadedVehicle.title}</h1>
          </div>
          <div class="image_slider">
            <div style={containerStyles}>
              <ImageSlider
                slides={loadedVehicle.images}
                prePath={`${process.env.REACT_APP_ASSET_URL}/img/vehicles`}
              />
            </div>
          </div>
          {/* <ul style={{ borderTop: "2px solid green", marginTop: "30px" }}> */}
          <ul className="details-backgroundv">
            <li>
              <h4>Vehicle Information : </h4>
              <div className="listing_information">
                <div className="address">
                  <span>Farmer :</span>
                  <br></br>
                  <span className="answer">
                    {loadedVehicle.author}
                  </span>
                </div>
                <br></br>
                <div>
                  <label>Rent :</label>
                  <span className="answer">
                    {"   ₹"}
                    {loadedVehicle.price}
                    {"/Hour"}
                  </span>
                </div>
                <br></br>
                <div className="listing_description">
                  Description :
                  <span className="answer">{loadedVehicle.description}</span>
                </div>
              </div>
            </li>
            <li>
              <h4>Contact Information : </h4>
              <div className="listing_contact">
                <label>
                  Phone <i class="fa fa-phone" aria-hidden="true"></i> :{" "}
                  <span className="answer">{loadedVehicle.phone}</span>
                </label>
                <br></br>
                <br></br>

                <label>
                  E-mail <i class="fa fa-envelope" aria-hidden="true"></i> :{" "}
                  <span className="answer">{loadedVehicle.email} </span>
                </label>
                <br></br>
                <br></br>
                <label>
                  Location <i className="fas fa-map-marker-alt" aria-hidden="true"></i> :{" "}
                  <span className="answer">{loadedVehicle.location} </span>
                </label>
                <br></br>
                <br></br>

                <label>
                  UPI :{" "}
                  <span className="answer">{loadedVehicle.upi} </span>
                </label>
                <br></br>
                <br></br>

              </div>
            </li>
            {(auth.userId === loadedVehicle.creator || auth.admin) && (
              <li>
                <h4>Edit | Delete: </h4>

                <div className="owner_edit_delete">
                  <button onClick={updateClickHandler} className="edit-buttonv">
                    Edit <i class="fa fa-edit"></i>
                  </button>
                  <br></br>
                  <br></br>
                  <button onClick={deleteVehicleHandler} className="delete-buttonv">
                    {" "}
                    Delete <i class="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            )}
          </ul>
          {(auth.userId !== loadedVehicle.creator) && (
            <div>
              <label style={{color:"black"}}>Rent:</label>
              <br></br>
              <br></br>
              <input
                type="number"
                className="inputUpload"
                name="hours"
                placeholder="Enter Number of Hours"
                onChange={handleChange} value={inputText}
                required
              />
              <br></br>
              <br></br>
              <button className="buy-buttonv" onClick={() => checkoutHandler((Number(inputText))*loadedVehicle.price)}>
                {" "}
                {/* {console.log("Input Text>>>",(Number(inputText)))} */}
                Pay Rent
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default VehicleDetails;

<span></span>;