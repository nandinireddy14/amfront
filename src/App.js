import "./App.css";
import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import MainNavigation from "./Navigation/MainNavigation";

import Home from "./Home";
import Footer from "./Footer";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import AddNewProduct from "./products/AddNewProduct";


import MyAccount from "./Pages/MyAccount";


import { AuthContext } from "./context/auth-context";
import MyProducts from "./products/MyProducts";
import MyVehicles from "./vehicles/MyVehicles";
import MyNotices from "./notices/MyNotices"
import MyTransactions from "./Pages/MyTransactions";

import ProductCard from "./products/ProductCard";
import UpdateProduct from "./products/UpdateProduct";
import UpdateVehicle from "./vehicles/UpdateVehicle";
import UpdateNotice from "./notices/UpdateNotice";
import ProductDetails from "./products/ProductDetails";
import NoticeDetails from "./notices/NoticeDetails";
import VehicleDetails from "./vehicles/VehicleDetails";

import UpdatePassword from "./Pages/UpdatePassword";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import AllProducts from "./products/AllProducts";

import AddNewVehicle from "./vehicles/AddNewVehicle";
import AllVehicles from "./vehicles/AllVehicles";

import AddNewNotice from "./notices/AddNewNotice";
import AllNotices from "./notices/AllNotices";
import PaymentSuccess from "./Pages/PaymentSuccess";

let logoutTimer;

function App() {
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [admin, setAdmin] = useState(null);


  const login = useCallback((uid, token, expirationDate, admin) => {
    
    setToken(token);
    setUserId(uid);
    setAdmin(admin)
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // one hour
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        admin: admin,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
    window.location.href= `${process.env.REACT_APP_FRONTEND_URL}`;
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration),
        storedData.admin
      );
    }
  }, [login]);

  let routes;
  if(admin){
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/about" element={<About />} />
        <Route path="/addnewproduct" element={<AddNewProduct />} />
        <Route path="/addnewvehicle" element={<AddNewVehicle />} />
        <Route path="/addnewnotice" element={<AddNewNotice />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/myproducts" element={<MyProducts/>}/>
        <Route path="/myvehicles" element={<MyVehicles/>}/>
        <Route path="/mynotices" element={<MyNotices/>}/>
        <Route path="/updateproduct/:productId" element={<UpdateProduct />} />
        <Route path="/updatevehicle/:vehicleId" element={<UpdateVehicle />} />
        <Route path="/updatenotice/:noticeId" element={<UpdateNotice />} />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
        <Route path="/noticedetails/:noticeId" element={<NoticeDetails />} />
        <Route path="/vehicledetails/:vehicleId" element={<VehicleDetails />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/allvehicles" element={<AllVehicles />} />
        <Route path="/allnotices" element={<AllNotices />} />
        <Route path="*" element={<Home/>} />
      </Routes>
    );
  }
  else if(token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />}/>
        <Route path="/about" element={<About />} />
        <Route path="/addnewproduct" element={<AddNewProduct />} />
        <Route path="/addnewvehicle" element={<AddNewVehicle />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/myproducts" element={<MyProducts/>}/>
        <Route path="/myvehicles" element={<MyVehicles/>}/>
        <Route path="/mytransactions" element={<MyTransactions/>}/>
        <Route path="/updateproduct/:productId" element={<UpdateProduct />} />
        <Route path="/updatevehicle/:vehicleId" element={<UpdateVehicle />} />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
        <Route path="/vehicledetails/:vehicleId" element={<VehicleDetails />} />
        <Route path="/noticedetails/:noticeId" element={<NoticeDetails />} />
        <Route path="/updatepassword" element={<UpdatePassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/allvehicles" element={<AllVehicles />} />
        <Route path="/allnotices" element={<AllNotices />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess/>}></Route>
        <Route path="*" element={<Home/>} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contactus" element={<ContactUs />} />
        
        <Route path="/testproductcard" element={<ProductCard />} />
        <Route path="/productdetails/:productId" element={<ProductDetails />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess/>}></Route>
        <Route
          path="*"  element={<h1> Hello hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
            <br></br>
            <p>sdfsd</p>
            <div>Heee</div>
          </h1>}/>
          
      </Routes>
      
    );
  }

  return (
    
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        admin: admin,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <nav id="mainnavigation">
          <MainNavigation />
        </nav>
        {routes}
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}
export default App;