import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AddNewNotice.css";
import ErrorModal from "../UIElements/ErrorModal";
import SuccessModal from "../UIElements/SuccessModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { AuthContext } from "../context/auth-context";

const AddNewNotice = () => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    noticename: "",
    // author:"",
    // price : "",
    description: "",
    // images: "",
    // email: "",
    // phone: "",
    // creator : ""
  });

  const onFormChangeHandler = (e) => {
    const { value, name, type, files } = e.target;
    setForm((state) => ({
      ...state,
      [name]: type === "file" ? files : value,
    }));
  };

  const addNewNoticeHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(form)
    formData.append("noticename",form.noticename);
    // formData.append("author",form.author);
    // formData.append("price",form.price);
    formData.append("description",form.description);
    // formData.append("email",form.email);
    // formData.append("phone",form.phone);
    // formData.append("creator",form.creator);
    // for (const file of form.images) {
    //   formData.append("images", file);
    // }
    console.log("form data >>>",formData);
    const ok = true;
    if (ok){try { 
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/notices/addnewnotice`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const responseData = await response.json();
      console.log("Response Data : ", responseData);
      // console.log("test");
      setIsLoading(false);
      setSuccess(true);
    } catch (err) {
      console.log("Error : ", err);
      setIsLoading(false);
      setError(err.message || "Error While Creating New Notice");
    }
    console.log("end");}
  };

  const errorHandler = () => {
    setError(null);
  };

  const successHandler = () => {
    setSuccess(false);
    navigate("/");
  };

  return (
    <div id="addnewnotice_id">
      <ErrorModal error={error} onClear={errorHandler} />
      <SuccessModal
        success={success}
        successMessage="New Notice Uploaded!"
        onClear={successHandler}
      />
      {isLoading && <LoadingSpinner asOverlay />}
      <form
        onSubmit={addNewNoticeHandler}
        id="addnewnotice"
        enctype="multipart/form-data"
      >
        {/* <h3 id="head">New Listing</h3> */}
        <div id="Upload">
          <br></br>
          {/* <span id="imgUpload">Notice images:</span>
          <br></br>
          <br></br>
          <input
            type="file"
            className="file"
            accept=".jpg,.png,.jpeg"
            required
            name="images"
            onChange={onFormChangeHandler}
            multiple
          /> */}
          <h5> Notice Details:</h5>
          <hr style={{ color: "orange" }}></hr>
          <label>Notice Date:</label>
          <br></br>
          <br></br>
          <input
            type="text"
            name="noticename"
            className="inputUpload"
            onChange={onFormChangeHandler}
            placeholder="Enter Date"
            required
          />
          <br></br>
          <br></br>
          <div id="flex_div">
            
          
          </div>
          
          
          {/* <label>Rent:</label>
          <br></br>
          <br></br>
          <input
            type="number"
            className="inputUpload"
            name="price"
            onChange={onFormChangeHandler}
            placeholder="Enter Rent for Hour"
            required
          />
          <br></br>
          <br></br>
          <label>Farmer:</label>
          <br></br>
          <br></br>
          <input
            type="text"
            className="inputUpload"
            name="author"
            onChange={onFormChangeHandler}
            placeholder="Farmer"
            required
          />

          <br></br>
          <br></br>
          <br></br> */}
          <label>Notice Description:</label>
          <br></br>
          <br></br>
          <input
            type="text"
            className="inputUpload"
            name="description"
            onChange={onFormChangeHandler}
            placeholder="Enter Description "
            required
          />
          <br></br>
          <br></br>
          <br></br>
          {/* <h5>Contact:</h5>
          <hr style={{ color: "orange" }}></hr>
          <label>E-mail:</label>
          <br></br>
          <br></br>
          <input
            type="email"
            className="inputUpload"
            name="email"
            onChange={onFormChangeHandler}
            placeholder="email@email.com"
            required
          />
          <br></br>
          <br></br>
          <label>Phone:</label>
          <br></br>
          <br></br>
          <input
            type="tel"
            className="inputUpload"
            name="phone"
            onChange={onFormChangeHandler}
            placeholder="Enter Phone Number"
            required
          /> */}
          <br></br>
          <br></br>
          <button className="SubmitUpload">Post</button>
          <br></br>
          <br></br>
        </div>
      </form>
    </div>
  );
};

export default AddNewNotice;
