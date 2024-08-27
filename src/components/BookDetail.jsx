import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { BookDetailContext } from "@/contexts/bookDetailContext";
import Loader from "./Loader";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookDetail, loading, fetchBookDetail } =
    useContext(BookDetailContext);

  useEffect(() => {
    fetchBookDetail(id);
  }, []);

  const [favBooksId, setFavBooksId] = useState([]);
  const addToFavBookLocalStorage = (id) => {
    const updatedFavBooks = [...favBooksId, id];
    setFavBooksId(updatedFavBooks);
    localStorage.setItem("favBooks", JSON.stringify(updatedFavBooks));
  };

  const removeFromFavBookLocalStorage = (id) => {
    const updatedFavBooks = favBooksId.filter((bookId) => bookId !== id);
    setFavBooksId(updatedFavBooks);
    localStorage.setItem("favBooks", JSON.stringify(updatedFavBooks));
  };

  useEffect(() => {
    const savedFavBooks = JSON.parse(localStorage.getItem("favBooks"));
    if (savedFavBooks) {
      setFavBooksId(savedFavBooks);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-300 h-screen">
        {loading ? (
          <Loader />
        ) : (
          <div className="container md:px-28 mx-auto">
            <Button
              className="my-2 text-lg bg-gray-300 text-black p-0 hover:bg-white hover: transition duration-300 mb-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft />
              Back
            </Button>

            <div className="bg-slate-200 flex flex-col lg:flex-row items-center gap-10  py-4 px-10 rounded-xl">
              <div className="flex flex-col item-center gap-4">
                <img
                  src={bookDetail.cover}
                  alt={bookDetail.title}
                  className=" object-cover max-h-[600px] max-w-[400px] min-h-[450px] min-w-[300px]"
                />
                <Button
                  onClick={() => {
                    if (favBooksId.includes(id)) {
                      removeFromFavBookLocalStorage(id);
                    } else {
                      addToFavBookLocalStorage(id);
                    }
                  }}
                  className={`${
                    favBooksId.includes(id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-900 text-white hover:bg-blue-950"
                  } transition duration-300`}
                >
                  {favBooksId.includes(id)
                    ? "Remove from favorite books"
                    : "Add to favorite books"}
                </Button>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold mt-2 flex flex-row items-center gap-2">
                  {bookDetail.title}
                  {favBooksId.includes(id) && (
                    <Heart className="text-red-500" fill="red" />
                  )}
                </h2>
                <p className="text-lg">
                  <span className="font-semibold">Description: </span>
                  {bookDetail.description
                    ? bookDetail.description
                    : "No description found"}
                </p>
                <p className="text-lg ">
                  <span className="font-semibold">Subject Places:</span>{" "}
                  {bookDetail.subject_places}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Subjects People: </span>{" "}
                  {bookDetail.subject_people}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Subjects: </span>{" "}
                  {bookDetail.subjects}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">First Publish Date: </span>
                  {bookDetail.first_publish_date
                    ? bookDetail.first_publish_date
                    : "No publish date found"}
                </p>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">Review Links:</h3>
                  {bookDetail.review_links
                    ? bookDetail.review_links.map((link, index) => {
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-500"
                          >
                            {link.title}
                          </a>
                        );
                      })
                    : "No review links found"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookDetail;
