import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import "./Home.css";

const Home = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [query, setQuery] = useState();
  const searchSubmit = (e) => {
    e.preventDefault();
    navigate(`/allproducts?q=${query}`);
  };

  return (
    <React.Fragment>
      <div className="bi">
        <div className="home-info">
          <div className="home-text">
            <h1>Agriculture with a new Skill.!</h1>
            <p style={{ marginLeft: "80px" }}>
              You can Buy and sell the products here!!!!
            </p>
          </div>
          <div>

            {auth.token &&
              <div className="allitems" style={{ marginLeft: "110px"}}>

                
                  <Link className="allprod" style={{ textDecoration: 'none', color: 'black' }} to="/allproducts" state={{ fontWeight: "bold" }}>
                    <div className="inner-text">
                        <p>Click Here for All Products</p>
                    </div>
                  </Link>

              
                  <Link className="allvehi" style={{ textDecoration: 'none', color: 'black' }} to="/allvehicles" state={{ fontWeight: "bold" }}>
                    <div className="inner-text">
                      <p>Click Here for All Vehicles</p>
                    </div>
                  </Link>

                  <Link className="allnoti" style={{ textDecoration: 'none', color: 'black' }} to="/allnotices" state={{ fontWeight: "bold" }}>
                    <div className="inner-text">
                      <p>Click Here for Notices</p>
                    </div>
                  </Link>
              </div>}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Home;
