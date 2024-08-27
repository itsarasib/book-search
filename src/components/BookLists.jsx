import React, { useContext } from "react";
import BookListsCard from "./BookListsCard";
import CustomPagination from "./Pagination";
import Loader from "./Loader";
import { BookListsContext } from "@/contexts/bookListsContext";

const BookLists = () => {
  const { books, loading, bookListsTitle, totalPages } =
    useContext(BookListsContext);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-4">{bookListsTitle}</h1>
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookListsCard key={book.id} book={book} />
              ))}
            </div>

            {totalPages == 1 ? null : <CustomPagination />}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookLists;
