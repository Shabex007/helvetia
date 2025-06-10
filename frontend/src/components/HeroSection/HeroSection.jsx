import React from "react";
import "./HeroSection.css";
import Button from "../Button/Button";
import watchImage from "../../assets/hero.png"; //
import arrowIcon from "../../assets/arrow.svg"; //

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-box">
        <div className="hero-background-text">ELEVATE YOUR STYLE</div>

        <div className="hero-left-text">
          <span className="bold-text">SWISS</span>
          <br />
          <span className="italic-light-text">
            LUXURY
            <br />
            TIMEPIECES
          </span>
        </div>

        <div className="hero-main-content">
          <img
            src={watchImage}
            alt="Luxury Watch"
            className="hero-watch-image"
          />

          <div className="hero-description-box">
            <p>
              At Helvetia we curate the finest selection of Swiss luxury
              timepieces, renowned for their precision, craftsmanship, and
              timeless elegance.
            </p>
            <Button text="Start Shopping" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
