import React from "react";
import { Link } from "react-router-dom";

const Header = ({title, titleArr=[],link,btnText}) => {
  return (
    <div className="flex items-center justify-between bg-gray-100 padding rounded-md mb-3 flex-wrap">
      <h1 className="mb-2 md:mb-0">{title}:{titleArr}</h1>
      <Link to={link} className="btn-1">
        {btnText}
      </Link>
    </div>
  );
};

export default Header;
