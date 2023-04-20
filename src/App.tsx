import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bookmark from "./page/Bookmark";
import AddBookmark from "./page/AddBookmark";
import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from "react-chrome-extension-router";

function App() {
  const [addBookmark, setAddBookmark] = useState(false);

  return (
    <div className="App">
      {addBookmark ? (
        <AddBookmark setAddBookmark={setAddBookmark} />
      ) : (
        <Bookmark setAddBookmark={setAddBookmark} />
      )}
    </div>
  );
}

export default App;
