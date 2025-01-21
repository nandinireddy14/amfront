import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  console.log("auth ::: ",auth);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact="true">
          {" "}
          Home
        </NavLink>
      </li>
      {auth.admin && (
        <li>
          <NavLink to="/addnewnotice"> Add New Notice</NavLink>
        </li>
      )}
      {!auth.admin && auth.isLoggedIn && (
        <li>
          <NavLink to={`/myproducts`}> My Products</NavLink>
        </li>
      )}
      {!auth.admin && auth.isLoggedIn && (
        <li>
          <NavLink to="/addnewproduct"> Add Product</NavLink>
        </li>
      )}
      {!auth.admin && auth.isLoggedIn && (
        <li>
          <NavLink to={`/myvehicles`}>My Vehicles</NavLink>
        </li>
      )}
      {!auth.admin && auth.isLoggedIn && (
        <li>
          <NavLink to="/addnewvehicle">Add Vehicle</NavLink>
        </li>
      )}
      {!auth.admin && auth.isLoggedIn && (
        <li>
          <NavLink to={`/mytransactions`}>Payments</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/myaccount`}> My Account</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login"> Login </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/signup"> Signup </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/about" exact="true">
          {" "}
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contactus" exact="true">
          {" "}
          Contact Us
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Log Out</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;