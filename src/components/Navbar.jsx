import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/bookLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="Book Logo" className="h-8 w-8 mr-2" />
            <p className="text-white font-bold text-xl">BOOK CENTER</p>
          </div>
          <ul className="flex gap-4">
            <li>
              <a
                href="/books"
                className="text-white hover:text-gray-300 transition duration-300 text-lg"
              >
                Books
              </a>
            </li>
            <li>
              <a
                href="/fav"
                className="text-white hover:text-gray-300 transition duration-300 text-lg"
              >
                Favorites
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
