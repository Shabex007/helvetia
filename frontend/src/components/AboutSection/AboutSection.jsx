import React from "react";
import Button from "../UI/Button";
import AboutImage1 from "../../assets/about1.jpg";
import AboutImage2 from "../../assets/about2.jpg";

const AboutSection = () => {
  return (
    <section className="w-full py-[50px] flex flex-col items-center gap-6 box-border">
      <div className="w-full max-w-[1300px] flex flex-wrap justify-between items-end gap-[40px]">
        {/* Left Column */}
        <div className="flex flex-col gap-8 flex-[1_1_60%] min-w-[300px] max-w-[861px]">
          <div className="flex flex-col gap-6">
            <h1 className="text-[clamp(35px,6vw,70px)] font-bold leading-[1.2] text-black">
              FINEST TIMEPIECES <br /> ALL IN ONE PLACE
            </h1>
            <p className="text-[clamp(14px,1.5vw,16px)] font-semibold text-black leading-[1.2] text-justify max-w-[500px]">
              We are a trusted destination for discerning clients seeking the
              world’s most esteemed Swiss timepieces. Our curated collection
              features only the finest luxury watches, chosen for their
              craftsmanship, rarity, and enduring elegance.
            </p>
            <Button
              text="Learn More"
              className="text-[#c6020d] text-[16px] font-semibold hover:text-black"
              iconRight="/src/assets/arrow.svg"
            />
          </div>
          <img
            src={AboutImage1}
            alt="Luxury Watch Horizontal"
            className="w-full max-w-[861px] h-auto rounded-[24px] transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8 flex-[1_1_35%] min-w-[280px] max-w-[367px]">
          <img
            src={AboutImage2}
            alt="Luxury Watch Vertical"
            className="w-full max-w-[367px] h-auto rounded-[24px] transition-transform duration-300 hover:scale-[1.02]"
          />
          <p className="text-[clamp(14px,1.5vw,16px)] font-semibold text-black leading-[1.2] text-justify">
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
