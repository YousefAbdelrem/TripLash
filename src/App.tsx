import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./App.css";
import NavBar from "./components/Main/NavBar";
import Home from "./components/Main/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
