import React, { useEffect, useState } from "react";
import { navTabs } from "../utils/tabs";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [selectedNav, setSelectedNav] = useState(() => {
    return localStorage.getItem("selectedNav") || "Dashboard";
  });
  useEffect(() => {
    localStorage.setItem("selectedNav", selectedNav);
  }, [selectedNav]);
  return (
    <nav className="flex items-center justify-between padding">
      <div>
        <h1 className="text-2xl font-bold">
          <span className="text-blue-500">Daher</span> For Trading
        </h1>
      </div>
      <ul className="flex items-center gap-3">
        {navTabs.map((tab, i) => (
          <li key={i}>
            <Link to={tab.path} onClick={() => setSelectedNav(tab.title)}>
              <div
                className={`${
                  selectedNav === tab.title
                    ? "text-blue-500 font-semibold"
                    : "text-black"
                }`}
              >
                {tab.title}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
