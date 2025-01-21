import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth-context";

import LoadingSpinner from "../UIElements/LoadingSpinner";
import ErrorModal from "../UIElements/ErrorModal";
import SuccessModal from "../UIElements/SuccessModal";

import ImageSlider from "../ImageComponents/ImageSlider";

import "./NoticeDetails.css";


const NoticeDetails = () => {

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  console.log(auth)
  const { noticeId } = useParams("noticeId");
  console.log("In notice details >notice Id >>>", noticeId);
  const [loadedNotice, setLoadedNotice] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getNoticeDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/notices/${noticeId}`
        );
        const responseData = await response.json();
        console.log("Response Data >>>", responseData);
        if (responseData.status === "fail" || responseData.status === "error") {
          throw new Error("Given notice ID Is Not valid");
        }
        console.log(
          "In NoticeDetials >Response Data.data >>>",
          responseData.data
        );
        setLoadedNotice(responseData.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message || "Error While getting Notice Details By Id");
        console.log("Error While getting Notice Details By Id");
      }
    };
    getNoticeDetails();
  }, [noticeId]);

  const deleteNoticeHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/notices/${noticeId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const responseData = await response.json();
      console.log("in notice details response data >>>", responseData);
      if (responseData.status === "fail" || responseData.status === "error") {
        throw new Error(responseData.message || "Error While Deleting notice");
      }
      setIsLoading(false);
      setSuccess(true);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Error While Deleting notice");
    }
  };

  const updateClickHandler = () => {
    navigate(`/updatenotice/${noticeId}`);
  };
  const errorHandler = () => {
    setError(null);
  };

  const successHandler = () => {
    setSuccess(false);
    navigate("/mynotices");
  };
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

  return (
    <div id="notice_details_page">
      <h1 style={{ color:"black", }}>Detailed Description of Notice</h1>
      <div className="noticedetails-header"><h1>Notice Details</h1></div>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <SuccessModal
        success={success}
        successMessage="Notice Deleted Successfully!"
        onClear={successHandler}
      />
      {!isLoading && loadedNotice && (
        <div id="notice_details">
          <div className="notice_header">
            <h1>{loadedNotice.title}</h1>
          </div>
          {/* <div class="image_slider">
            <div style={containerStyles}>
              <ImageSlider
                slides={loadedNotice.images}
                prePath={`${process.env.REACT_APP_ASSET_URL}/img/notices`}
              />
            </div>
          </div> */}
          {/* <ul style={{ borderTop: "2px solid green", marginTop: "30px" }}> */}
          <ul className="details-background-notice">
            <li>
              <h4 className="notice-head">Notice Information : </h4>
              <div className="listing_information">
                {/* <div className="address">
                  <span>Farmer :</span>
                  <br></br>
                  <span className="answer">
                    {loadedNotice.author}
                  </span>
                </div>
                <br></br>

                <br></br>
                <div>
                  <label>Rent :</label>
                  <span className="answer">
                    {"   ₹"}
                    {loadedNotice.price}
                    {"/Hour"}
                  </span>
                </div> */}
                {/* <br></br>

                <br></br> */}
                <div className="listing_description">
                  Description :<br></br>
                  <span className="answer">{loadedNotice.description}</span>
                </div>
              </div>
            </li>
            {/* <li>
              <h4>Contact Information : </h4>
              <div className="listing_contact">
                <label>
                  Phone <i class="fa fa-phone" aria-hidden="true"></i> :{" "}
                  <span className="answer">{loadedNotice.phone}</span>
                </label>
                <br></br>
                <br></br>

                <label>
                  E-mail <i class="fa fa-envelope" aria-hidden="true"></i> :{" "}
                  <span className="answer">{loadedNotice.email} </span>
                </label>
                <br></br>
                <br></br>

              </div>
            </li> */}
            {/* auth.userId === loadedNotice.creator || */}
            {(auth.admin) && (
              <li>
                <h4 className="notice-head">Edit | Delete: </h4>

                <div className="owner_edit_delete">
                  <button onClick={updateClickHandler}>
                    Edit <i class="fa fa-edit"></i>
                  </button>
                  <br></br>
                  <br></br>
                  <button onClick={deleteNoticeHandler}>
                    {" "}
                    Delete <i class="fas fa-trash"></i>
                  </button>
                </div>
              </li>
            )}
          </ul>
          {/* {(auth.userId !== loadedNotice.creater) && (
            <div>
              <button class="buy-button">
                {" "}
                Buy <i class="fas fa-shopping-cart"></i>
              </button>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};
export default NoticeDetails;

<span></span>;