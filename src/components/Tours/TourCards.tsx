import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Text,
  Image,
  Flex,
  Icon,
  IconButton,
  Badge,
  Center,
  Heading,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { Server_Url } from "../Main/root";
import ToursFilters from "../Filter/toursFilters";
import TopRatedTours from "./TopRatedTours";
import RecommendedTours from "./RecommendedTours";
import useFavorite from "../Favourite/useFavourite";
import FavoriteModal from "../Favourite/FavouriteModal";
import FavouriteLists from "../Nav Bar/FavouriteLists";
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

const TourCards = () => {
  // const [tours, setTours] = useState<Tour[]>([]);
  const {
    tours,
    setTours,
    handleFavorite,
    isModalOpen,
    closeModal,
    selectedTour,
    toggleFavorite,
  } = useFavorite([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${Server_Url}/api/get-all-tours`);
        if (response.data.status === "success") {
          const tourData = response.data.data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const toursFormatted = tourData.map((tour: any) => ({
            id: tour._id,
            title: tour.title,
            image: tour.photos.length > 0 ? tour.photos[0] : "",
            city: tour.city,
            country: tour.country,
            price: tour.price,
            ratingsAverage: tour.ratingsAverage,
            faviorate: tour.faviorate,
            tourCategory: tour.tourCategory,
          }));
          setTours(toursFormatted);
          console.log(toursFormatted);
        } else {
          console.error("Error fetching tours:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, [setTours]);

  return (
    <>
      <Heading fontSize="xl" mb={6}>
        Top Rated
      </Heading>
      <TopRatedTours />
      <Heading fontSize="xl" mb={6}>
        For You
      </Heading>
      <RecommendedTours />
      <Heading fontSize="xl" mb={6}>
        All Tours
      </Heading>
      <ToursFilters />
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {tours.map((tour) => (
          <>
            <Box
              key={tour.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Box position="relative" display="inline-block">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  style={{ width: "100%", height: "auto" }}
                />

                <Box position="absolute" top="0" right="0" p="3">
                  <IconButton
                    aria-label="Favorite"
                    icon={
                      <FaHeart
                        color={
                          tour.faviorate ? "#FF3232" : "rgba(0, 0, 0, 0.2)"
                        }
                        size={18}
                      />
                    }
                    borderRadius={32}
                    onClick={() => handleFavorite(tour)}
                    bg={"white"}
                  />
                </Box>
                <Box position="absolute" top="0" left="0" p="4" pt={"5"}>
                  <Badge
                    w={"60px"}
                    h={6}
                    p={"3px"}
                    borderRadius={"5px"}
                    fontSize={13}
                    bg={"white"}
                    fontFamily={"sans-serif"}
                  >
                    <Center style={{ textTransform: "none" }}>
                      {tour.tourCategory === "public" ? "Public" : "Private"}
                    </Center>
                  </Badge>
                </Box>
              </Box>
              <Box p="6">
                <Box dir="flex" alignItems="baseline">
                  <Text fontWeight="semibold" fontSize="sm">
                    {tour.title}
                  </Text>
                </Box>
                <Flex mt="2" alignItems="center">
                  <Text fontSize="sm" color="gray.600">
                    {tour.city},{tour.country}
                  </Text>
                </Flex>
                <Flex mt="2" alignItems="center">
                  {[...Array(5)].map((_, index) => (
                    <Icon
                      key={index}
                      as={StarIcon}
                      color={
                        index < tour.ratingsAverage ? "yellow.400" : "gray.300"
                      }
                    />
                  ))}
                </Flex>
                <Text mt="2" fontSize="sm">
                  {tour.price}
                </Text>
              </Box>
            </Box>
          </>
        ))}
      </Grid>
      <FavoriteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        tour={selectedTour}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
};
export default TourCards;
