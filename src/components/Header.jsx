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
        className={` flex flex-col justify-center ${
          isHomePage ? "min-h-screen" : "min-h-[520px]"
        } bg-[url('header-bg.png')] bg-no-repeat bg-cover bg-center opacity-80 `}
      >
        <div className="container flex flex-col items-center gap-4 md:container md:mx-auto">
          <h2 className="text-white text-6xl">Find Your Book.</h2>
          <p className="text-white text-xl opacity-80">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            dolore, numquam nulla ipsa doloribus expedita, id porro magni quam
            quisquam facilis sint. Minima placeat excepturi dolore totam
            officiis voluptatem necessitatibus.
          </p>
          <SearchForm />
        </div>
      </div>
    </>
  );
};

export default Header;
