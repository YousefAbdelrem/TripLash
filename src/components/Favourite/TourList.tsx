import React from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Flex,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import { FaHeart, FaEllipsisV, FaTrash } from "react-icons/fa";

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

interface TourListProps {
  tours: Tour[];
  listName: string;
  listId: string; // Add listId prop
  onToggleFavorite: (tour: Tour, listName: string) => void;
  onDeleteList: (listId: string) => void;
}

const TourList: React.FC<TourListProps> = ({
  tours,
  listName,
  listId,
  onToggleFavorite,
  onDeleteList,
}) => {
  const handleDeleteClick = () => {
    onDeleteList(listId);
  };

  return (
    <Box>
      <Flex justify="space-between" mb={4}>
        <Heading fontSize="xl" mb={6}>
          {listName}
        </Heading>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FaEllipsisV />}
            variant="ghost"
            aria-label="Options"
            css={{ position: "relative", right: 0 }}
          />
          <MenuList>
            <MenuItem>Rename list</MenuItem>
            <MenuItem onClick={handleDeleteClick}>Delete list</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
        {tours.map((tour) => (
          <Box
            key={tour._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
          >
            <Flex align="center" mb={2}>
              <Heading as="h3" size="md">
                {tour.title}
              </Heading>
              <Spacer />
              <IconButton
                icon={
                  <FaHeart
                    color={tour.faviorate ? "#FF3232" : "rgba(0, 0, 0, 0.2)"}
                  />
                }
                aria-label="Favorite"
                variant="ghost"
                onClick={() => onToggleFavorite(tour, listName)}
              />
            </Flex>
            <Image src={tour.image} alt={tour.title} mb={2} />
            <Text>Location: {tour.location}</Text>
            <Text>Price: £{tour.price}</Text>
            <Text>Average Rating: {tour.ratingsAverage}</Text>
            <Text>City: {tour.city}</Text>
            <Text>Country: {tour.country}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TourList;
