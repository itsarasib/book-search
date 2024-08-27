import React, { useEffect, useState } from "react";
import axios from "axios";
import bookCoverNotFound from "/bookCoverNotFound.jpg";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const FavBooksCard = () => {
  const [favBooksId, setFavBooksId] = useState([]);
  const [booksDetails, setBooksDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavBooks = JSON.parse(localStorage.getItem("favBooks"));
    if (savedFavBooks) {
      setFavBooksId(savedFavBooks);
    }
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const detailsPromises = favBooksId.map(async (id) => {
        try {
          const response = await axios.get(
            `https://openlibrary.org/works/${id}.json`
          );
          const data = response.data;
          return {
            title: data.title,
            cover: data.covers
              ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
              : bookCoverNotFound,
          };
        } catch (error) {
          console.log(error);
        }
      });

      // Promise.all() is a method in JavaScript that takes an array of promises (in this case, detailsPromises) and returns a single promise that resolves when all of the promises in the array have resolved.
      const details = await Promise.all(detailsPromises);
      setBooksDetails(details);
      setLoading(false);
    };

    fetchDetails();
  }, [favBooksId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-center my-4">
            Favourite Books
          </h1>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {booksDetails.map((book, index) => (
                <div
                  key={index}
                  className="flex flex-col border border-gray-400 p-4 rounded-lg hover:shadow-2xl cursor-pointer items-center"
                  onClick={() => navigate(`/books/${favBooksId[index]}`)}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="h-[300px] w-[200px] object-cover"
                  />
                  <h2 className="text-xl font-bold mt-2">{book.title}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FavBooksCard;
