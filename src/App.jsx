import React from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import BookLists from "./components/BookLists";
import BookDetail from "./components/BookDetail";
import FavBooksPage from "./pages/FavBooksPage";
import { BookListsProvider } from "./contexts/bookListsContext";
import { BookDetailProvider } from "./contexts/bookDetailContext";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <BookListsProvider>
      <BookDetailProvider>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/books" element={<BookLists />} />
          </Route>
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/fav" element={<FavBooksPage />} />
        </Routes>
      </BookDetailProvider>
    </BookListsProvider>
  );
};

export default App;
