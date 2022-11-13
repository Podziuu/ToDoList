import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <nav className="fixed top-0 bg-dark-blue w-full h-16 flex px-4 justify-center">
      <div className="flex items-center text-4xl font-bold text-white">
        <Link to="/" className="flex">
          <img src={logo} className="w-12 mr-2 rounded-md" />
          ToDoList
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
