import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const BookListsContext = createContext();

const BookListsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("term") || "dune";
  const currentPage = parseInt(searchParams.get("page")) || 1;

  // const [searchTerm, setSearchTerm] = useState("dune");
  // const [currentPage, setCurrentPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookListsTitle, setBookListsTitle] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${searchTerm}&page=${currentPage}&limit=20`
      );
      const data = response.data;
      const { docs, numFound } = data;
      if (numFound === 0) {
        setBookListsTitle("No books found");
        setBooks([]);
        setTotalPages(0);
      } else {
        setBookListsTitle(`Found ${numFound} books`);
        const booksWithEssentialData = docs.map((book) => {
          return {
            id: book.key.replace("/works/", ""),
            title: book.title,
            author: book.author_name,
            cover_id: book.cover_i,
            publish_year: book.first_publish_year,
            edition_count: book.edition_count,
            pages: book.number_of_pages_median,
          };
        });
        setBooks(booksWithEssentialData);
        setTotalPages(Math.ceil(numFound / 20));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const updateSearchParams = (term, page = 1) => {
    setSearchParams({ term, page });
  };

  return (
    <BookListsContext.Provider
      value={{
        books,
        loading,
        currentPage,
        bookListsTitle,
        totalPages,
        searchTerm,
        setBookListsTitle,
        setSearchTerm: (term) => updateSearchParams(term, 1),
        setCurrentPage: (page) => updateSearchParams(searchTerm, page),
        fetchBooks,
      }}
    >
      {children}
    </BookListsContext.Provider>
  );
};

export { BookListsContext, BookListsProvider };
