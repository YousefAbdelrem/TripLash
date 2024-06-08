import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import SearchBar from "../Search Bar/SearchBar";
import Navi from "./Title-With-Icon";

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
