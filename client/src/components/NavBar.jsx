import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";

import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";

const NavBar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showNav, setShowNav] = useState(false);

  const classes = isLoggedIn ? "justify-between w-full" : "";

  const clickHandler = () => {
    console.log("siwma");
    setShowNav((prevstate) => !prevstate);
  };

  return (
    <nav className="fixed top-0 bg-dark-blue w-full h-16 flex px-8 justify-center">
      <div
        className={`flex items-center text-4xl font-bold text-white ${classes}`}
      >
        <Link to="/" className="flex items-center">
          <img src={logo} className="w-12 mr-2 rounded-md" />
          ToDoList
        </Link>
        {isLoggedIn && <FiMenu size={48} onClick={clickHandler} />}
        {isLoggedIn &&
          showNav &&
          ReactDOM.createPortal(
            <div className="absolute left-0 top-0 h-screen w-screen z-100 bg-dark-blue">
              <FiX
                className="absolute right-3 top-3"
                size={36}
                color="white"
                onClick={clickHandler}
              />
              <ul className="flex justify-center items-center text-white text-4xl font-bold flex-col gap-y-10 h-full">
                <li>Monday</li>
                <li>Tuesday</li>
                <li>Wednesday</li>
                <li>Thursday</li>
                <li>Friday</li>
                <li>Saturday</li>
                <li>Sunday</li>
              </ul>
            </div>,
            document.getElementById("navbar")
          )}
      </div>
    </nav>
  );
};

export default NavBar;
