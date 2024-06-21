import React, { useContext, useEffect, useState } from "react";
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
  Button,
  Image,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import { AuthContext } from "../Authentication/AuthContext";
import TourList from "../Favourite/TourList";
import NewListModal from "../Favourite/NewListModal";

interface List {
  _id: string;
  name: string;
  user: string;
  tours: string[];
  __v: number;
}

interface Tour {
  _id: string;
  title: string;
  image: string;
  location: string;
  price: number;
  ratingsAverage: number;
  faviorate: boolean;
  tourCategory: string;
  city: string;
  country: string;
}

const FavouriteLists = () => {
  const [lists, setLists] = useState<List[]>([]);
  const [selectedList, setSelectedList] = useState<List | null>(null);
  const [selectedTours, setSelectedTours] = useState<Tour[]>([]);
  const [favoriteLists, setFavoriteLists] = useState<string[]>([]);

  const [isNewListModalOpen, setIsNewListModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");

  const authContext = useContext(AuthContext);

  const handleOpenNewListModal = () => {
    setIsNewListModalOpen(true);
  };

  const handleCloseNewListModal = () => {
    setIsNewListModalOpen(false);
  };

  useEffect(() => {
    const fetchLists = async () => {
      if (!authContext || !authContext.token) {
        console.error("No auth token found");
        return;
      }
      try {
        const response = await axios.get(`${Server_Url}/api/get-user-lists`, {
          headers: { Authorization: `Bearer ${authContext.token}` },
        });
        const listNames = response.data.data.lists.map(
          (list: any) => list.name
        );
        setFavoriteLists(listNames);
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
  }, [authContext]);

  const handleToggleFavorite = async (tour: Tour, listName: string) => {
    try {
      if (!authContext || !authContext.token) return;

      const response = await axios.post(
        `${Server_Url}/api/update-list/662efcd27cde4b7520938a65`,
        {
          tourId: tour._id,
          listName,
        },
        {
          headers: { Authorization: `Bearer ${authContext.token}` },
        }
      );

      if (response.data.success) {
        setLists((prevLists) =>
          prevLists.map((list) =>
            list.name === listName
              ? {
                  ...list,
                  tours: list.tours.some((t) => t === tour._id)
                    ? list.tours.filter((t) => t !== tour._id)
                    : [...list.tours, tour._id],
                }
              : list
          )
        );
      } else {
        console.error("Failed to toggle favorite:", response.data.message);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  async function handleDeleteList(listId: string): Promise<void> {
    try {
      const response = await axios.delete(
        `${Server_Url}/api/update-list/${listId}`,
        {
          // headers: { Authorization: `Bearer ${authContext.token}` },
        }
      );
      if (response.data.success) {
        setLists((prevLists) =>
          prevLists.filter((list) => list._id !== listId)
        );
      } else {
        console.error("Failed to delete list:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting list:", error);
    }
  }
  const handleListClick = async (list: List) => {
    try {
      if (!authContext || !authContext.token) return;

      const response = await axios.get(
        `${Server_Url}/api/get-list/${list._id}`,
        {
          headers: { Authorization: `Bearer ${authContext.token}` },
        }
      );

      if (response.data.status === "success" && response.data.list) {
        setSelectedList(response.data.list);

        if (Array.isArray(response.data.list.tours)) {
          setSelectedTours(response.data.list.tours);
        } else {
          console.error("Invalid tours data format:", response.data.list.tours);
        }
      } else {
        console.error("Failed to fetch list details:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching list details:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "favoriteLists",
      JSON.stringify(lists.map((list) => list.name))
    );
  }, [lists]);

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.xl" py={8}>
        <Flex justify="space-between" mb={4}>
          {!selectedList ? (
            <>
              <Heading fontSize="xl" mb={6}>
                Your Favourite Lists
              </Heading>
              <Button
                onClick={handleOpenNewListModal}
                disabled={
                  !newListName.trim() || !authContext || !authContext.token
                }
              >
                Add New List
              </Button>
            </>
          ) : null}
          <NewListModal
            isOpen={isNewListModalOpen}
            onClose={handleCloseNewListModal}
            onListCreated={(listName: string) => {
              setLists((prevLists) => [
                ...prevLists,
                { _id: "", name: listName, user: "", tours: [], __v: 0 },
              ]);
            }}
          />
        </Flex>
        {!selectedList ? (
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
                onClick={() => handleListClick(list)}
                cursor="pointer"
              >
                <Heading as="h2" size="md" mb={2}>
                  {list.name}
                </Heading>
                <Text>{list.tours.length} tours</Text>
                {selectedTours.length > 0 && (
                  <Image
                    src={selectedTours[0].image}
                    alt={selectedTours[0].title}
                    mb={2}
                  />
                )}
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <TourList
            tours={selectedTours}
            listName={selectedList.name}
            listId={selectedList._id}
            onToggleFavorite={handleToggleFavorite}
            onDeleteList={handleDeleteList}
          />
        )}
      </Container>
    </ChakraProvider>
  );
};

export default FavouriteLists;
