import React, { useEffect, useState } from "react";
import axios from "axios";
import { Server_Url } from "../Main/root";
import {
  ChakraProvider,
  theme,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Box,
} from "@chakra-ui/react";

interface List {
  _id: string;
  name: string;
  user: string;
  tours: string[];
  __v: number;
}

const FavouriteLists = () => {
  const [lists, setLists] = useState<List[]>([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get(`${Server_Url}/api/get-all-lists`);
        console.log("API response:", response.data);

        if (response.data && Array.isArray(response.data.data.lists)) {
          setLists(response.data.data.lists);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl" py={8}>
        <Heading fontSize="xl" mb={6}>
          Your Favourite Lists
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
          {lists.map((list) => (
            <Box
              key={list._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              boxShadow="sm"
              _hover={{ boxShadow: "md" }}
            >
              <Heading as="h2" size="md" mb={2}>
                {list.name}
              </Heading>
              <Text>Number of Tours: {list.tours.length}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </ChakraProvider>
  );
};

export default FavouriteLists;
