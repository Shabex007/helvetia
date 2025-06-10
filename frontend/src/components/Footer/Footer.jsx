import React from "react";
import { useNavigate } from "react-router-dom";
import FooterLink from "../UI/FooterLink";
import FooterPolicyLink from "../UI/FooterPolicyLink";
import SocialIcon from "../UI/SocialIcon";

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
    <footer className="w-full py-[30px] flex flex-col items-center box-border">
      <div className="w-full max-w-[1300px] bg-[#f0f0f0] rounded-[24px] px-[clamp(20px,6vw,70px)] py-[50px] my-[50px] flex flex-col gap-6 box-border">
        <hr className="h-[2px] w-full bg-[#d0d0d0] border-none" />

        {/* Logo + Social */}
        <div className="flex justify-center items-center">
          <div className="flex items-center justify-between w-full max-w-[1200px] gap-[40px] flex-wrap">
            <img
              src={logo}
              alt="Helvetia Logo"
              className="h-6 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div className="w-[2px] h-[74px] bg-[#d0d0d0] hidden sm:block" />
            <div className="flex items-center gap-6">
              <SocialIcon icon={linkedin} alt="LinkedIn" />
              <SocialIcon icon={instagram} alt="Instagram" />
              <SocialIcon icon={youtube} alt="YouTube" />
              <SocialIcon icon={x} alt="X" />
              <SocialIcon icon={facebook} alt="Facebook" />
              <SocialIcon icon={pinterest} alt="Pinterest" />
            </div>
          </div>
        </div>

        <hr className="h-[2px] w-full bg-[#d0d0d0] border-none" />

        {/* Footer Links */}
        <div className="w-full max-w-[1200px] flex justify-between flex-wrap gap-[40px] pt-[20px]">
          {/* First column: heading only */}
          <div className="flex flex-col gap-3 min-w-[150px]">
            <h6 className="font-montserrat text-[13px]  font-bold uppercase text-black m-0">
              Find a Store
            </h6>
            <h6 className="font-montserrat text-[13px]  font-bold uppercase text-black m-0">
              Helvetia Journal
            </h6>
            <h6 className="font-montserrat text-[13px]  font-bold uppercase text-black m-0">
              Become a Member
            </h6>
            <h6 className="font-montserrat text-[13px] font-bold uppercase text-black m-0">
              Feedback
            </h6>
            <h6 className="font-montserrat text-[13px] font-bold uppercase text-black m-0">
              Promo Codes
            </h6>
          </div>

          {/* Rest columns: heading + links */}
          <div className="flex flex-col gap-3 min-w-[150px]">
            <h6 className="font-montserrat text-[13px]  font-bold uppercase text-black m-0">
              About Helvetia
            </h6>
            <FooterLink>News</FooterLink>
            <FooterLink>Careers</FooterLink>
            <FooterLink>Investors</FooterLink>
            <FooterLink>Sustainability</FooterLink>
          </div>
          <div className="flex flex-col gap-3 min-w-[150px]">
            <h6 className="font-montserrat text-[13px]  font-bold uppercase text-black m-0">
              Services
            </h6>
            <FooterLink>Maintenance</FooterLink>
            <FooterLink>Restoration</FooterLink>
            <FooterLink>Repair</FooterLink>
          </div>
          <div className="flex flex-col gap-3 min-w-[150px]">
            <h6 className="font-montserrat text-[13px]  font-bold uppercase text-black m-0">
              Get Help
            </h6>
            <FooterLink>Order Status</FooterLink>
            <FooterLink>Shipping and Delivery</FooterLink>
            <FooterLink>Returns</FooterLink>
            <FooterLink>Payment Options</FooterLink>
            <FooterLink>Contact Us</FooterLink>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="w-full bg-white border border-[#d0d0d0] rounded-[8px] px-6 py-3 flex justify-between items-center flex-wrap gap-4 sm:flex-row sm:items-start">
          <div className="flex items-center gap-3 flex-wrap text-[13px] font-medium text-black">
            <img src={indiaIcon} alt="India" className="w-[14px] h-[14px]" />
            <span>India</span>
            <span>© 2024 Helvetia, Inc. All Rights Reserved</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <FooterPolicyLink>Guides</FooterPolicyLink>
            <FooterPolicyLink>Terms of Use</FooterPolicyLink>
            <FooterPolicyLink>Terms of Sale</FooterPolicyLink>
            <FooterPolicyLink>Company Details</FooterPolicyLink>
            <FooterPolicyLink>Privacy & Cookie Policy</FooterPolicyLink>
            <FooterPolicyLink>Cookie Settings</FooterPolicyLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
