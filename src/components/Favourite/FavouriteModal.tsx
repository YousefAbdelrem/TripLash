import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Input,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import axios from "axios";
import { Server_Url } from "../Main/root";

interface Tour {
  id: string;
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
  const [newListName, setNewListName] = useState("");
  const [favoriteLists, setFavoriteLists] = useState<string[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavoriteLists = async () => {
      try {
        const response = await axios.get(`${Server_Url}/api/get-user-lists`);
        setFavoriteLists(response.data.data.lists);
      } catch (error) {
        console.error("Error fetching favorite lists:", error);
      }
    };

    fetchFavoriteLists();
  }, []);

  useEffect(() => {
    if (tour) {
      setSelectedList(tour.faviorate ? "My Favorite List" : null);
    }
  }, [tour]);

  const handleAddNewList = async () => {
    if (newListName.trim() !== "") {
      try {
        const response = await axios.post(`${Server_Url}/api/create-List`, {
          name: newListName,
        });
        setFavoriteLists([...favoriteLists, response.data.list]);
        setNewListName("");
      } catch (error) {
        console.error("Error adding new list:", error);
      }
    }
  };

  const handleCheckboxChange = (listName: string) => {
    setSelectedList(listName);
    if (tour) {
      onToggleFavorite(tour, listName);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Favorite List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {favoriteLists.map((listName, index) => (
              <Checkbox
                key={index}
                isChecked={listName === selectedList}
                onChange={() => handleCheckboxChange(listName)}
              >
                {listName}
              </Checkbox>
            ))}

            <HStack spacing={2}>
              <Input
                placeholder="New List Name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
              <Button onClick={handleAddNewList}>New List</Button>
            </HStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FavoriteModal;
