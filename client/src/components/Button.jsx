import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  const classes = props.primary ? "border border-primary" : "bg-primary";
  const sizeClasses = props.big ? "px-9 py-3" : "px-4 py-1";
  const isSubmit = props.submit ? "submit" : "";
  return (
    <>
      {!props.link && (
        <button
          className={`${classes} ${sizeClasses} rounded-full text-white text-xl ${props.className}`}
          type={isSubmit}
        >
          {props.text}
        </button>
      )}
      {props.link && (
        <Link
          className={`${classes} px-4 py-1 rounded-full text-white text-xl ${props.className}`}
          to={props.to}
        >
          {props.text}
        </Link>
      )}
    </>
  );
};

export default Button;
