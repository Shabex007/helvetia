import React from "react";
import "./NewsletterSection.css";
import craft from "../../assets/craft.png";

const NewsletterSection = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-column">
        <div className="left-column">
          <img className="news-img" src={craft} alt="Watch Graphic" />
        </div>
        <div className="news-right-column">
          <div className="newsletter-card">
            <div className="headline-card">
              Subscribe to Our Newsletter for More Information
            </div>

            <div className="form-card">
              <p className="description">
                Get all updates about our store.
                <br />
                Just subscribe and get all news instantly.
              </p>

              <form
                className="newsletter-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Subscribed!");
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="email-input"
                  required
                />
                <button type="submit" className="submit-button">
                  <div className="arrow-icon" />
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
