import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Image,
  Flex,
  Icon,
  IconButton,
  Badge,
  Center,
  HStack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import { Server_Url } from "../Main/root";
import React from "react";
import useFavorite from "../Favourite/useFavourite";
import FavoriteModal from "../Favourite/FavouriteModal";

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

const TopRatedTours = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    tours,
    setTours,
    handleFavorite,
    isModalOpen,
    closeModal,
    selectedTour,
    toggleFavorite,
  } = useFavorite([]);

  const scroll = (scrollOffset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(`${Server_Url}/api/get-all-tours`);
        if (response.data.status === "success") {
          const tourData = response.data.data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const toursFormatted = tourData.map((tour: any) => ({
            _id: tour._id,
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
    <Box position="relative" width="full" overflow="hidden">
      <Box
        ref={containerRef}
        display="flex"
        overflowX="scroll"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
      >
        <HStack spacing={4} p={4}>
          {tours.map((tour) => (
            <Box
              key={tour._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              width="250px"
              flexShrink={0}
              bg="white"
              boxShadow="md"
              cursor="pointer"
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.05)" }}
            >
              <Box position="relative">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  width="100%"
                  height="200px"
                  objectFit="cover"
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
                    bg="white"
                  />
                </Box>
                <Box position="absolute" top="0" left="0" p="4" pt="5">
                  <Badge
                    w="60px"
                    h={6}
                    p="3px"
                    borderRadius="5px"
                    fontSize={13}
                    bg="white"
                    fontFamily="sans-serif"
                  >
                    <Center style={{ textTransform: "none" }}>
                      {tour.tourCategory === "public" ? "Public" : "Private"}
                    </Center>
                  </Badge>
                </Box>
              </Box>
              <Box p="4">
                <Box display="flex" alignItems="baseline">
                  <Text fontWeight="semibold" fontSize="sm">
                    {tour.title}
                  </Text>
                </Box>
                <Flex mt="2" alignItems="center">
                  <Text fontSize="sm" color="gray.600">
                    {tour.city}, {tour.country}
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
          ))}
        </HStack>
      </Box>
      <Box position="absolute" top="50%" transform="translateY(-50%)" left="0">
        <IconButton
          aria-label="Scroll Left"
          icon={<FaChevronLeft />}
          onClick={() => scroll(-200)}
          bg="white"
          borderRadius="full"
          boxShadow="md"
        />
      </Box>
      <Box position="absolute" top="50%" transform="translateY(-50%)" right="0">
        <IconButton
          aria-label="Scroll Right"
          icon={<FaChevronRight />}
          onClick={() => scroll(200)}
          bg="white"
          borderRadius="full"
          boxShadow="md"
        />
      </Box>
      <FavoriteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        tour={selectedTour}
        onToggleFavorite={toggleFavorite}
      />
    </Box>
  );
};

export default TopRatedTours;
