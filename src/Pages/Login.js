import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

import ErrorModal from "../UIElements/ErrorModal";
import LoadingSpinner from "../UIElements/LoadingSpinner";
import { AuthContext } from "../context/auth-context";

import login from "../assets/images/login.jpg";

const Login = (props) => {
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      // console.log("response : " + response);
      // console.log("Response Data : " + responseData);
      // console.log("Response Data : " + responseData.status);
      // console.log("Response Data : " + responseData.token);
      if (responseData.status === "fail" || !response.ok) {
        throw new Error(responseData.message);
      }
      //console.log(responseData)
      auth.login(responseData.userId, responseData.token,null, responseData.admin);

      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Error While Loging");
      console.log("Error in fetching user data");
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
    <div className="bi">
    <div id="container2">
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div style={{ display: "flex" }}>
        <div>
          <b>
            <h1 id="Sih">Login</h1>
          </b>
          <p className="S1">
            Don't have an account ?{" "}
            <Link to={"/signup"} id="snv">
              {" "}
              SignUp{" "}
            </Link>
          </p>
          <form onSubmit={loginHandler}>
            <div style={{ paddingTop: "10px" }}>
              <label>E-mail:</label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="inpT"
                onChange={(e) => setEmail(e.target.value)}
              />
              <br></br>
              <br></br>
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="inpT"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br></br>
              <Link id="FPP" as={Link} to={"/forgotpassword"}>
                Forgot Password?
              </Link>
              <br></br>
              <button type="submit" className="buttonSig">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </React.Fragment>
  );
};
export default Login;
