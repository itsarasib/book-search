import React from "react";
import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Check path
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Navbar />
      <div
        className={`relative flex flex-col justify-center ${
          isHomePage ? "min-h-screen" : "min-h-[520px]"
        } opacity-80`}
      >
        {/* Background Image */}
        <img
          src="src/assets/headerBg.png"
          alt="Header Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content overlay */}
        <div className="relative z-10 container flex flex-col items-center gap-4 md:container md:mx-auto">
          <h2 className="text-white text-6xl">Find Your Book.</h2>
          <p className="text-white text-xl opacity-80">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            dolore, numquam nulla ipsa doloribus expedita, id porro magni quam
            quisquam facilis sint. Minima placeat excepturi dolore totam
            officiis voluptatem necessitatibus.
          </p>
          <SearchForm />
        </div>

        {/* Optional background overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
    </>
  );
};

export default Header;
