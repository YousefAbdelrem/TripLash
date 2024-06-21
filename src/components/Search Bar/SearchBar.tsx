import React from "react";
import { Button, InputGroup, Box, Flex, Center } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import CalenderSearchInput from "./CalenderSearchInput";
import PlaceSearchInput from "./PlaceSearchInput";

const SearchBar: React.FC = () => {
  return (
    <Center zIndex={"999"} position="relative">
      <Flex flexWrap="wrap" alignItems="center" mb={6}>
        <Box
          width={"700px"}
          style={{ border: "1px solid rgba(0,0,.1,0.2)", borderRadius: "32px" }}
          justifyContent="center"
          alignItems="center"
          display="inline-block"
        >
          <InputGroup width="auto" borderRadius="3xl" h="56px">
            <PlaceSearchInput placeholder={"Where to?"} />

            <CalenderSearchInput placeholder={"Start Date"} />
            <CalenderSearchInput placeholder={"End Date"} />

            <Button
              bg="#4f90ae"
              color={"white"}
              borderRadius="3xl"
              _hover={{ bg: "gray.100", color: "#4f90ae" }}
              m={2}
              h={10}
              w={12}
            >
              <SearchIcon h={6} />
            </Button>
          </InputGroup>
        </Box>
      </Flex>
    </Center>
  );
};

export default SearchBar;
