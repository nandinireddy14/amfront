import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/signup.jpg";
import { useContext, useState } from "react";

import { AuthContext } from "../context/auth-context";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";

const SignUp = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  let error = false;
  const [name, setName] = useState("");
  const [Mail, setMail] = useState("");
  const [Pass, setPass] = useState("");
  const [admin, setAdmin] = useState(true);
  const [ConfPass, setConfPass] = useState("");
  const [MailError, setMailError] = useState(false);
  const [PassError, setPassError] = useState(false);
  const [ConfPassError, setConfPassError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorModal, setErrorModal] = useState(null);

  async function saveUser(e) {
    e.preventDefault();
    if (/^[a-zA-Z0-9]+@gmail.com+$/.test(Mail)) {
      setMailError(false);
    } else {
      error = true;
      setMailError(true);
    }
    if (Pass.length >= 6) {
      if (Pass !== ConfPass) {
        setConfPassError(true);
        error = true;
      } else {
        setConfPassError(false);
      }
      setPassError(false);
    } else {
      error = true;
      setPassError(true);
      setConfPassError(true);
    }
    if (name.length < 1) {
      error = true;
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!nameError && !ConfPassError && !PassError && !MailError && !error) {
      // console.warn(name, Mail, Pass);
      let data = { name: name, email: Mail, password: Pass , admin: false};
      // console.log(data);
      try {
        setIsLoading(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();
        console.log("Response Data : ", responseData);
        console.log("Response Obj : ", response);
        if (responseData.status === "fail") {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        auth.login(responseData.data.user._id, responseData.token);
        navigate("/");
      } catch (err) {
        console.log("Error : ", err); 
        setErrorModal(err.message || "Something Went wrong while signing up!");
        setIsLoading(false);
      }
    } else {
      console.log("Error in Sign Up Form");
    }
  }

  const errorHandler = () => {
    setErrorModal(null);
  };

  return (
    <div className="background-img-signup">
      <form>
      <ErrorModal error={errorModal} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div id="container1">
        <div id="d1">
          <div id="signUp_block">
            <h1 id="S1">Sign up</h1>
            <div id="d2">
              <p id="S2">
                Already a member?{" "}
                <Link as={Link} to={"/login"} id="S3">
                  Sign in
                </Link>
              </p>
            </div>
            <br></br>
            <label>Name:</label>
            <br></br>
            <input
              type="text"
              className="inpt_SignUp"
              onChange={(e) => setName(e.target.value)}
              required
            />
            {nameError ? (
              <h6 className="Error_SignUp">⚠ Please provide a Name.</h6>
            ) : (
              <br></br>
            )}
            <br></br>
            <label>E-mail:</label>
            <br></br>
            <input
              type="email"
              className="inpt_SignUp"
              onChange={(e) => setMail(e.target.value)}
              required
            />
            {MailError ? (
              <h6 className="Error_SignUp">⚠ Please provide a valid Email.</h6>
            ) : (
              <br></br>
            )}
            <br></br>
            <label>Password:</label>
            <br></br>
            <input
              type="password"
              className="inpt_SignUp"
              onChange={(e) => setPass(e.target.value)}
              required
            />
            {PassError ? (
              <h6 className="Error_SignUp">
                ⚠ Please provide a password with at least 6 characters.
              </h6>
            ) : (
              <br></br>
            )}
            <br></br>
            <label>Confirm Password:</label>
            <br></br>
            <input
              type="password"
              className="inpt_SignUp"
              onChange={(e) => setConfPass(e.target.value)}
              required
            />
            {ConfPassError ? (
              <h6 className="Error_SignUp">
                ⚠ Please provide the same password above
              </h6>
            ) : (
              <br></br>
            )}
            <br></br>
            <button id="btn1" onClick={saveUser}>
              Submit
            </button>
            <p></p>
          </div>
        </div>
      </div>
    </form>
    </div>
  );
};
export default SignUp;
