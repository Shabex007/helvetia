import { useNavigate } from "react-router-dom";
import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.svg";
import indiaIcon from "../../assets/india.svg";
import linkedin from "../../assets/social/linkedin.svg";
import instagram from "../../assets/social/instagram.svg";
import youtube from "../../assets/social/youtube.svg";
import x from "../../assets/social/x.svg";
import facebook from "../../assets/social/facebook.svg";
import pinterest from "../../assets/social/pinterest.svg";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">
        <hr className="footer-line" />

        <div className="footer-top">
          <div className="footer-logo-social">
            <img
              src={logo}
              alt="Helvetia Logo"
              className="footer-logo"
              onClick={() => navigate("/")}
            />
            <div className="footer-divider" />
            <div className="footer-social">
              <img src={linkedin} alt="LinkedIn" />
              <img src={instagram} alt="Instagram" />
              <img src={youtube} alt="YouTube" />
              <img src={x} alt="X" />
              <img src={facebook} alt="Facebook" />
              <img src={pinterest} alt="Pinterest" />
            </div>
          </div>
        </div>

        <hr className="footer-line" />

        <div className="footer-links">
          <div className="footer-column">
            <h4>Find a Store</h4>
            <p>Helvetia Journal</p>
            <p>Become a Member</p>
            <p>Feedback</p>
            <p>Promo Codes</p>
          </div>
          <div className="footer-column">
            <h4>About Helvetia</h4>
            <p>News</p>
            <p>Careers</p>
            <p>Investors</p>
            <p>Sustainability</p>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <p>Maintenance</p>
            <p>Restoration</p>
            <p>Repair</p>
          </div>
          <div className="footer-column">
            <h4>Get Help</h4>
            <p>Order Status</p>
            <p>Shipping and Delivery</p>
            <p>Returns</p>
            <p>Payment Options</p>
            <p>Contact Us</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-location">
            <img src={indiaIcon} alt="India" className="footer-india-icon" />
            <span>India</span>
            <span className="footer-copyright">
              © 2024 Helvetia, Inc. All Rights Reserved
            </span>
          </div>
          <div className="footer-policy-links">
            <span>Guides</span>
            <span>Terms of Use</span>
            <span>Terms of Sale</span>
            <span>Company Details</span>
            <span>Privacy & Cookie Policy</span>
            <span>Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
