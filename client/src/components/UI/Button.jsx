import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  const classes = props.primary ? "border border-primary" : "bg-primary";
  return (
    <>
      {!props.link && (
        <button
          className={`${classes} px-4 py-1 rounded-full text-white text-xl ${props.className}`}
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
