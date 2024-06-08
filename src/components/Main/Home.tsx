import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
// import Accordions from "./Accordions";
// import Cardv from "./Card";
// import TourCards from "./TourCards";
import SearchBar from "../Search Bar/SearchBar";
import Navi from "./Title-With-Icon";
import TourCards from "../Tours/TourCards";
// import TourGuideCards from "./TourGuideCards";

const Home = () => {
  return (
    <>
      <ChakraProvider>
        <SearchBar />
        <Navi />
      </ChakraProvider>
    </>
  );
};

export default Home;
