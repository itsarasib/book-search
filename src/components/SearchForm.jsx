import { SearchIcon } from "lucide-react";
import React, { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BookListsContext } from "@/contexts/bookListsContext";

const SearchForm = () => {
  const { setSearchTerm } = useContext(BookListsContext);
  const inputRef = useRef();
  const navigate = useNavigate();
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    const term = inputRef.current.value;
    setSearchTerm(term);
    addSearchTermToLocalStorage(term);
    inputRef.current.value = "";
    navigate(`/books?term=${term}&page=1`);
  };

  const addSearchTermToLocalStorage = (term) => {
    let updatedSearches = [term, ...recentSearches];
    updatedSearches = updatedSearches.slice(0, 6);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleRecentSearch = (term) => {
    setSearchTerm(term);
    navigate(`/books?term=${term}&page=1`);
  };

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="flex justify-center items-center gap-4"
      >
        <input
          type="text"
          placeholder="Search Books"
          className="border-2 border-gray-200 p-2 rounded-lg"
          ref={inputRef}
        />
        <button className="bg-blue-500 text-white p-2 rounded-lg">
          <SearchIcon />
        </button>
      </form>
      <div className="flex flex-col items-center">
        <div className="my-4">
          {recentSearches.map((term, index) => (
            <Button
              onClick={() => handleRecentSearch(term)}
              key={index}
              className="my-2 rounded-full px-8 bg-gray-200 mx-2 text-black hover:bg-gray-600 "
            >
              {term}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
