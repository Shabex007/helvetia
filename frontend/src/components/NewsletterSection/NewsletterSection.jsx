import React from "react";
import craft from "../../assets/craft.png";

const NewsletterSection = () => {
  return (
    <section
      className="w-full max-w-[1300px] min-h-[650px] mx-auto bg-cover bg-center bg-no-repeat rounded-[24px] overflow-hidden"
      style={{ backgroundImage: `url('/src/assets/newsbg.jpeg')` }}
    >
      <div className="w-full min-h-[650px] flex flex-wrap lg:flex-nowrap justify-between items-start px-[50px] py-[50px] gap-8 box-border">
        {/* Left Column: Image */}
        <div className="w-full lg:w-auto flex justify-start">
          <img
            src={craft}
            alt="Watch Graphic"
            className="w-[470px] h-[470px] transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Right Column: Form Card */}
        <div className="w-full lg:w-auto flex flex-col justify-end">
          <div className="flex flex-col gap-5 max-w-[310px] w-full">
            {/* Headline */}
            <div className="bg-white rounded-[18px] outline-1 outline-[#d0d0d0] px-5 py-4 font-montserrat">
              <h5 className=" text-black text-[18px] font-semibold text-center">
                {" "}
                Subscribe to Our Newsletter for More Information
              </h5>
            </div>

            {/* Form */}
            <div className="bg-white rounded-[18px] outline-1 outline-[#d0d0d0] px-5 py-5 flex flex-col gap-5">
              <p className="text-[#696969] text-[16px] font-semibold text-justify font-montserrat">
                Get all updates about our store.
                <br />
                Just subscribe and get all news instantly.
              </p>

              <form
                className="flex overflow-hidden rounded-lg bg-[#d0d0d0] outline-2 outline-[#d0d0d0]"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Subscribed!");
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-white text-black text-[14px] font-medium font-montserrat px-[18px] py-[14px] outline-none border-none"
                />
                <button
                  type="submit"
                  className="bg-white px-[15px] py-[16px] flex items-center justify-center group cursor-pointer"
                  aria-label="Submit email"
                >
                  {/* Arrow icon created with Tailwind + CSS clip-path */}
                  <img
                    src=""
                    className="w-[9px] h-[16px] bg-black group-hover:bg-[#a20009] transition-all clip-arrow"
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
