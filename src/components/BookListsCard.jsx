import React from "react";
import { useNavigate } from "react-router-dom";
import bookCoverNotFound from "/bookCoverNotFound.jpg";

const BookListsCard = ({ book }) => {
  const navigate = useNavigate();
  const handleCardOnClick = () => {
    navigate(`/books/${book.id}`);
  };
  return (
    <div
      key={book.id}
      className="flex flex-col border border-gray-400 p-4 rounded-lg hover:shadow-2xl cursor-pointer"
      onClick={handleCardOnClick}
    >
      <img
        src={
          book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
            : bookCoverNotFound
        }
        alt={book.title}
        className="h-[300px] w-[200px] self-center"
      />
      <h2 className="text-lg font-bold mt-2 self-center">{book.title}</h2>
      <p className="text-base">
        <span className="font-bold">Author:</span>{" "}
        {book.author ? book.author : "N/A"}
      </p>
      <p className="text-base">
        <span className="font-bold">Publish Year:</span>{" "}
        {book.publish_year ? book.publish_year : "N/A"}
      </p>
      <p className="text-base">
        <span className="font-bold">Edition Count:</span>{" "}
        {book.edition_count ? book.edition_count : "N/A"}
      </p>
      <p className="text-base">
        <span className="font-bold">Pages:</span>{" "}
        {book.pages ? book.pages : "N/A"}
      </p>
    </div>
  );
};

export default BookListsCard;
