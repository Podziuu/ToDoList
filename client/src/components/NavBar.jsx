import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import { changeDay } from "../store/ui-slice";
import { logout } from "../store/auth-slice";

import { FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.png";
import Button from "./Button";

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const NavBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentDay = useSelector(state => state.ui.day);
  const [showNav, setShowNav] = useState(false);

  const classes = isLoggedIn ? "justify-between w-full" : "";

  const clickHandler = () => {
    setShowNav((prevstate) => !prevstate);
  };

  const clickDay = (e) => {
    dispatch(changeDay({ day: e.target.innerText }));
  };

  const combined = (e) => {
    clickDay(e);
    clickHandler();
  }

  const logoutUser = () => {
    dispatch(logout());
  }

  return (
    <nav className="fixed top-0 bg-dark-blue w-full h-16 flex px-8 justify-center">
      <div
        className={`flex items-center text-4xl font-bold text-white ${classes}`}
      >
        <Link to="/" className="flex items-center">
          <img src={logo} className="w-12 mr-2 rounded-md" />
          ToDoList
        </Link>
        {(isLoggedIn && !showNav) && (
          <FiMenu size={48} onClick={clickHandler} className="lg:hidden" />
        )}
        {(isLoggedIn && showNav) &&
          ReactDOM.createPortal(
            <div
              className="absolute left-0 top-0 h-screen w-screen z-100 bg-dark-blue z-50"
          //    onClick={clickHandler}
            >
              <FiX
                className="absolute right-3 top-3 cursor-pointer"
                size={36}
                color="white"
                onClick={clickHandler}
              />
              <ul className="flex justify-center items-center text-white text-4xl font-bold flex-col gap-y-10 h-full">
                {WEEKDAYS.map(day => {
                  return <li onClick={combined} key={day} className="cursor-pointer">{day}</li>
                })}
              </ul>
            </div>,
            document.getElementById("navbar")
          )}
        {isLoggedIn && <ul className="hidden lg:flex justify-between w-3/5 items-center text-white font-normal text-xl h-full">
          {WEEKDAYS.map(day => {
                  return <li onClick={clickDay} key={day} className={`cursor-pointer ${currentDay == day ? 'underline underline-offset-8 decoration-primary' : ''}`}>{day}</li>
          })}
          {/* <li onClick={clickDay}>Monday</li>
          <li onClick={clickDay}>Tuesday</li>
          <li onClick={clickDay}>Wednesday</li>
          <li onClick={clickDay}>Thursday</li>
          <li onClick={clickDay}>Friday</li>
          <li onClick={clickDay}>Saturday</li>
          <li onClick={clickDay}>Sunday</li> */}
        </ul>}
        {isLoggedIn && <Button className="hidden lg:block" text="Log out" onClick={logoutUser} />}
      </div>
    </nav>
  );
};

export default NavBar;
