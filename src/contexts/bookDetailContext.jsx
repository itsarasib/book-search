import React, { useState, createContext } from "react";
import axios from "axios";
import bookCoverNotFound from "/bookCoverNotFound.jpg";

const BookDetailContext = createContext();

const BookDetailProvider = ({ children }) => {
  const [bookDetail, setBookDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBookDetail = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://openlibrary.org/works/${id}.json`
      );
      const data = response.data;
      if (data) {
        const {
          title,
          description,
          covers,
          subject_places,
          subject_people,
          first_publish_date,
          subjects,
          links,
        } = data;
        const filteredData = {
          title: title,
          description: description ? description.value : "No description found",
          cover: covers
            ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`
            : bookCoverNotFound,
          subject_places: subject_places
            ? subject_places.join(", ")
            : "No subject places found",
          subject_people: subject_people
            ? subject_people.join(", ")
            : "No subject people found",
          subjects: subjects ? subjects.join(", ") : "No subjects found",
          first_publish_date: first_publish_date,
          review_links: links,
        };
        setBookDetail(filteredData);
      } else {
        setBookDetail(null);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <BookDetailContext.Provider
      value={{ bookDetail, loading, fetchBookDetail }}
    >
      {children}
    </BookDetailContext.Provider>
  );
};

export { BookDetailContext, BookDetailProvider };
