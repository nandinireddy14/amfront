import React from "react";
import "./Footer.css";

const Footer = (props) => {
  return (
    <footer id="footer">
      <div>
        <p className="footer-text">If you eat today thank a farmer.</p>
      </div>
      <ul>
        <div id="icon-container">
          <a href="https://twitter.com/HariTheRoy2">
            <div className="icon">
              <li>
                <i className="fab fa-twitter"></i>
              </li>
            </div>
          </a>
          <a href="https://www.instagram.com/hari_the_roy/">
            <div className="icon">
              <li>
                <i className="fab fa-instagram"></i>
              </li>
            </div>
          </a>
          <a href="https://www.facebook.com/">
            <div className="icon">
              <li>
                <i className="fab fa-facebook-f"></i>
              </li>
            </div>
          </a>
          <a href="https://mail.google.com/mail/u/0/#inbox">
            <div className="icon">
              <li>
                <i className="far fa-envelope"></i>
              </li>
            </div>
          </a>
        </div>
      </ul>
      <p>&copy; 2024, Agri-Market</p>
    </footer>
  );
};
export default Footer;