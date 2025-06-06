import React from "react";
import "./Button.css";
import arrowIcon from "../../assets/arrow.svg"; // Default right icon

const Button = ({
  text,
  onClick,
  iconLeft, // optional
  iconRight = arrowIcon, // default is arrow
  className = "",
  style = {},
  type = "button",
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      style={style}
      type={type}
    >
      {iconLeft && (
        <img src={iconLeft} alt="left icon" className="button-icon left" />
      )}
      <span className="button-text">{text}</span>
      {iconRight && (
        <img src={iconRight} alt="right icon" className="button-icon right" />
      )}
    </button>
  );
};

export default Button;
