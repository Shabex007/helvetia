import React from "react";
import "./AboutSection.css";
import Button from "../Button/Button";
import AboutImage1 from "../../assets/about1.jpg";
import AboutImage2 from "../../assets/about2.jpg";

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-wrapper">
        <div className="about-left-column">
          <div className="content-block">
            <h1>
              FINEST TIMEPIECES <br /> ALL IN ONE PLACE
            </h1>
            <p className="description">
              We are a trusted destination for discerning clients seeking the
              world’s most esteemed Swiss timepieces. Our curated collection
              features only the finest luxury watches, chosen for their
              craftsmanship, rarity, and enduring elegance.
            </p>
            <Button className="learn-more" text="Learn More" />
          </div>
          <img
            className="main-image"
            src={AboutImage1}
            alt="Luxury Watch Horizontal"
          />
        </div>
        <div className="about-right-column">
          <img
            className="side-image"
            src={AboutImage2}
            alt="Luxury Watch Vertical"
          />
          <p>
            Whether you're a seasoned collector or making your first luxury
            purchase, we’re here to help you find the perfect watch—one that
            matches your style, marks your achievements, and holds its value for
            years to come.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
