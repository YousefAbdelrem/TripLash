import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import NavBar from "./components/Nav Bar/NavBar";
import Home from "./components/Main/Home";
import FavouriteLists from "./components/Nav Bar/FavouriteLists";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FavouriteLists" element={<FavouriteLists />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
