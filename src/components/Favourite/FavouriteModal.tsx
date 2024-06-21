import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  HStack,
  Checkbox,
  Box,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { Server_Url } from "../Main/root";
import { AuthContext } from "../Authentication/AuthContext";
import NewListModal from "./NewListModal";

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

interface FavoriteList {
  name: string;
  tours: Tour[];
}

interface FavoriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: Tour | null;
  onToggleFavorite: (tour: Tour, listName: string) => void;
}

const FavoriteModal: React.FC<FavoriteModalProps> = ({
  isOpen,
  onClose,
  tour,
  onToggleFavorite,
}) => {
  const [favoriteLists, setFavoriteLists] = useState<FavoriteList[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const {
    isOpen: isNewListModalOpen,
    onOpen: onOpenNewListModal,
    onClose: onCloseNewListModal,
  } = useDisclosure();

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchFavoriteLists = async () => {
      if (!authContext || !authContext.token) return;
      try {
        const response = await axios.get(`${Server_Url}/api/get-user-lists`, {
          headers: { Authorization: `Bearer ${authContext.token}` },
        });
        const lists = response.data.data.lists.map((list: any) => ({
          name: list.name,
          tours: list.tours,
        }));
        setFavoriteLists(lists);
      } catch (error) {
        console.error("Error fetching favorite lists:", error);
      }
    };

    fetchFavoriteLists();
  }, [authContext]);

  useEffect(() => {
    if (tour) {
      setSelectedList(tour.faviorate ? "My Favorite List" : null);
    }
  }, [tour]);

  const handleCheckboxChange = (listName: string) => {
    setSelectedList(listName);
    if (tour) {
      onToggleFavorite(tour, listName);
    }
  };

  const handleListCreated = (listName: string) => {
    setFavoriteLists((prev) => [...prev, { name: listName, tours: [] }]);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              cursor="pointer"
              onClick={onClose}
              color="blue.500"
              fontSize="20px"
              fontWeight="bold"
            >
              &times;
            </Box>
            <Text>Select a list</Text>
            <Text
              color="blue.500"
              cursor="pointer"
              onClick={onOpenNewListModal}
              fontSize={"m"}
            >
              New list
            </Text>
          </ModalHeader>
          <ModalBody>
            <VStack spacing={4} align="stretch" overflowY="auto" maxH="300px">
              {favoriteLists.map((list, index) => (
                <HStack key={index} spacing={4} justify="space-between">
                  <HStack spacing={4}>
                    <Box
                      boxSize="40px"
                      bg={!list.tours.length ? "gray.200" : "transparent"}
                    >
                      {list.tours.length > 0 && (
                        <Image
                          src={list.tours[0].image}
                          alt={list.name}
                          boxSize="40px"
                          objectFit="cover"
                        />
                      )}
                    </Box>
                    <Text>{list.name}</Text>
                  </HStack>
                  <Checkbox
                    isChecked={selectedList === list.name}
                    onChange={() => handleCheckboxChange(list.name)}
                  />
                </HStack>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
      <NewListModal
        isOpen={isNewListModalOpen}
        onClose={onCloseNewListModal}
        onListCreated={handleListCreated}
      />
    </>
  );
};

export default FavoriteModal;
