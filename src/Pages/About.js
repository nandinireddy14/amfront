import React from "react";
import "./About.css";
import rakhi from "../assets/team_images/rakhi.jpeg";
import prince from "../assets/team_images/prince.jpg";
import haritheroy from "../assets/team_images/haritheroy.jpg";

const About = (props) => {
  return (
    <div id="about_id">
      <div class="about-section">
        <p style={{ fontFamily: "italic" }}>
        </p>
        <p style={{ fontSize: "200%" }}>
        </p>
      </div>
      <p style={{ textAlign: "center", color:"black"}}>Our team of Agri-Market!!! We the team have built this website for buying products.</p>
      <h2 style={{ textAlign: "center", color:"black"}}>Our Team</h2>
      <div class="row">
        <div class="column">
          <div class="cardab">
            <div class="container">
              <h2>Pradeep Reddy</h2>
              <p>pradeepreddyn3@gmail.com</p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="cardab">
            <div class="container">
              <h2>Pramod Ballepu</h2>
              <p>pramodballepu1@gmail.com</p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="cardab">
            <div class="container">
              <h2>Varun Prasad</h2>
              <p>varun97@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
