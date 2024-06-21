import React, { useState, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { Server_Url } from "../Main/root";
import { AuthContext } from "../Authentication/AuthContext";

interface NewListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onListCreated: (listName: string) => void;
}

const NewListModal: React.FC<NewListModalProps> = ({
  isOpen,
  onClose,
  onListCreated,
}) => {
  const [newListName, setNewListName] = useState("");
  const authContext = useContext(AuthContext);

  const handleAddNewList = async () => {
    if (newListName.trim() !== "" && authContext && authContext.token) {
      try {
        const response = await axios.post(
          `${Server_Url}/api/create-list`,
          {
            name: newListName,
          },
          {
            headers: { Authorization: `Bearer ${authContext.token}` },
          }
        );
        onListCreated(response.data.list.name);
        setNewListName("");
        onClose();
      } catch (error) {
        console.error("Error adding new list:", error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New List</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <Input
              placeholder="New List Name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleAddNewList}>Add List</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewListModal;
