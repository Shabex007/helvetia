import React from "react";
import Button from "../UI/Button";
import watchImage from "../../assets/hero.png";

const HeroSection = () => {
  return (
    <section className="w-full flex items-center justify-center">
      <div className="relative w-full max-w-[1300px] bg-[#f0f0f0] rounded-[40px] lg:rounded-[50px] px-[20px] py-[30px] lg:px-[clamp(24px,3vw,50px)] lg:py-[clamp(24px,3vw,50px)] my-[20px] mb-[50px] flex flex-col lg:flex-row justify-between items-center gap-[40px] overflow-hidden box-border">
        {/* Background text */}
        <div className="absolute left-0 bottom-[-10px] lg:bottom-[-25px] w-full text-center text-[#d0d0d0] font-extrabold uppercase pointer-events-none select-none whitespace-nowrap text-[clamp(28px,8vw,90px)] lg:text-[clamp(32px,9vw,110px)] z-0">
          ELEVATE YOUR STYLE
        </div>

        {/* Left headline */}
        <div className="z-10 text-[clamp(24px,2.5vw,40px)] font-extrabold leading-[1.3] text-center lg:text-left">
          <span className="text-black">SWISS</span>
          <br />
          <span className="text-[#d0d0d0] italic">
            LUXURY
            <br />
            TIMEPIECES
          </span>
        </div>

        {/* Right content */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-center gap-[30px] text-center lg:text-left z-10">
          <img
            src={watchImage}
            alt="Luxury Watch"
            className="w-[clamp(280px,40vw,574px)] h-auto object-contain"
          />
          <div className="flex flex-col gap-[24px] max-w-[350px] min-w-[180px] flex-[1_1_250px] items-center lg:items-start text-center lg:text-left">
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
