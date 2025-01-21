import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import SuccessModal from "../UIElements/SuccessModal";

import ImageSlider from "../ImageComponents/ImageSlider";

import { AuthContext } from "../context/auth-context";

const UpdateNotice = () => {
  const auth = useContext(AuthContext);

  const { noticeId } = useParams();

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [slides, setSlides] = useState([]);

  const [form, setForm] = useState({
    noticename: "",
    
    // author: "",
    // price: "",
   
    description: "",
  
    // email: "",
    // phone: "",
    // images: "",
  });

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/notices/${noticeId}`
        );
        const responseData = await response.json();
        console.log("Response >> ", response);
        console.log("ResponseData >> ", responseData);
        console.log("ResponseData notice>> ", responseData.data);
        setForm(responseData.data);
        setForm((state) => {
          return { ...state, images: "" };
        });
       
        setSlides(responseData.data.images);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(
          err.message ||
            "Error in UpdateNotice Page while fetching Notice Deatils by id"
        );
        console.log(
          "Error in UpdateNotice Page while fetching Notice Deatils by id"
        );
      }
    };
    fetchNotice();
  }, [noticeId]);

  const updateNoticeHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("noticename", form.noticename);
    
    // formData.append("author", form.author);
    // formData.append("price",form.price);
    
    formData.append("description", form.description);
   
    // formData.append("email", form.email);
    // formData.append("phone", form.phone);
    // formData.append("creator", auth.userId);

    // if (form.images) {
    //   // which means to update images
    //   for (const file of form.images) {
    //     formData.append("images", file);
    //   }
    // }
    try {
      setIsLoading(true);
      console.log("form>>", form);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/notices/${noticeId}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const responseData = await response.json();
      console.log("Response Data : ", responseData);
      if (responseData.status === "error" || responseData.status === "fail") {
        throw new Error(
          responseData.message || "error while updating notice by id"
        );
      }
      setIsLoading(false);
      setSuccess(true);
    } catch (err) {
      console.log("Error : ", err);
      setIsLoading(false);
      setError(err.message || "Error While Creating New notice");
    }
  };

  const onFormChangeHandler = (e) => {
    const { value, name, type, files } = e.target;
    setForm((state) => ({
      ...state,
      [name]: type === "file" ? files : value,
    }));
  };

  const errorHandler = () => {
    setError(null);
  };

  const successHandler = () => {
    setSuccess(false);
    navigate("/");
  };

  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };

  return (
    <div id="background-update-notice">
      <ErrorModal error={error} onClear={errorHandler} />
      <SuccessModal
        success={success}
        successMessage="notice Details Updated Successfully!"
        onClear={successHandler}
      />
      {isLoading && <LoadingSpinner asOverlay />}

      {/* <div style={{ paddingBottom: "30px" }}>
        <h3>Previously Uploaded Images: </h3>
        <div style={containerStyles}>
          <ImageSlider
            slides={slides}
            prePath={`${process.env.REACT_APP_ASSET_URL}/img/notices`}
          />
        </div>
      </div> */}

      <form
        onSubmit={updateNoticeHandler}
        id="addnewnotice"
        enctype="multipart/form-data"
      >
        <h3 id="head" style={{color:"black"}}>Update Notice</h3>
        <div id="Upload">
          {/* <br></br>
          <span id="imgUpload" style={{color:"black"}}>Update images Here :</span>
          <br></br>
          <br></br>
          <input
            type="file"
            className="file"
            accept=".jpg,.png,.jpeg"
            name="images"
            onChange={onFormChangeHandler}
            multiple
          /> */}
          <h5 style={{color:"black"}}>Notice Information:</h5>
          <hr style={{ color: "orange" }}></hr>
          <label style={{color:"black"}}>Noticename:</label>
          <br></br>
          <br></br>
          <input
            type="text"
            name="noticename"
            className="inputUpload"
            onChange={onFormChangeHandler}
            placeholder="Enter noticename"
            required
            value={form.noticename}
          />
          <br></br>
          <br></br>
          <div id="flex_div">
          </div> 
          {/* <br></br>
          <br></br>
          <label style={{color:"black"}}>Rent:</label>
          <br></br>
          <br></br>
          <input
            type="number"
            className="inputUpload"
            name="price"
            onChange={onFormChangeHandler}
            placeholder="Enter Rent for Hour"
            required
            value={form.price}
          /> */}
          <br></br>
          <label style={{color:"black"}}>Description about your Notice:</label>
          <br></br>
          <br></br>
          <input
            type="text"
            className="inputUpload"
            name="description"
            onChange={onFormChangeHandler}
            placeholder="Enter Description"
            required
            value={form.description}
          />
          {/* <br></br>
         
          <br></br> 
          <h5 style={{color:"black"}}>Contact:</h5>
          <hr style={{ color: "orange" }}></hr>
          <label style={{color:"black"}}>E-mail:</label>
          <br></br>
          <br></br>
          <input
            type="email"
            className="inputUpload"
            name="email"
            onChange={onFormChangeHandler}
            placeholder="email@email.com"
            required
            value={form.email}
          />
          <br></br>
          <br></br>
          <label style={{color:"black"}}>Phone:</label>
          <br></br>
          <br></br>
          <input
            type="tel"
            className="inputUpload"
            name="phone"
            onChange={onFormChangeHandler}
            placeholder="Enter Phone Number"
            required
            value={form.phone}
          />
          <br></br>
          <br></br> */}
          <button className="SubmitUpload">Post</button>
          <br></br>
          <br></br>
        </div>
      </form>
    </div>
  );
};
export default UpdateNotice;
