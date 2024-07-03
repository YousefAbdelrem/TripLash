import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Stack,
  HStack,
  Button,
  Flex,
  Badge,
  useColorModeValue,
  IconButton,
  Collapse,
} from "@chakra-ui/react";
import apiClient from "../../services/api-client";
import { useLocation } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon, StarIcon } from "@chakra-ui/icons";
import tourContainer from "./tourContainer";
import NavBar from "../Nav Bar/NavBar";

const Tour = () => {
  const reviews = [
    {
      id: 1,
      name: "Lucifer Quigley",
      date: "Wed Aug 16 2023",
      rating: 4,
      comment:
        "Quod et ea iusto eveniet voluptatem blanditiis. Natus libero aut.",
      avatar:
        "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
      images: [
        "https://cdn.pixabay.com/photo/2024/03/11/12/43/leaf-8626541_640.jpg",
        "https://cdn.pixabay.com/photo/2024/03/07/15/57/houses-8618837_640.jpg",
        "https://cdn.pixabay.com/photo/2024/02/21/15/09/people-8587897_640.jpg",
      ],
    },
    {
      id: 2,
      name: "Jone wike",
      date: "Wed Aug 16 2023",
      rating: 5,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore rerum perspiciatis, ducimus facere aperiam deleniti. Ab, harum dolor obcaecati temporibus tempora a magnam incidunt est fuga sequi, ad nobis.",
      avatar:
        "https://cdn.pixabay.com/photo/2024/02/04/04/11/fashion-8551487_1280.jpg",
      images: [
        "https://cdn.pixabay.com/photo/2024/03/11/12/43/leaf-8626541_640.jpg",
        "https://cdn.pixabay.com/photo/2024/03/07/15/57/houses-8618837_640.jpg",
        "https://cdn.pixabay.com/photo/2024/02/21/15/09/people-8587897_640.jpg",
      ],
    },
    {
      id: 3,
      name: "Peaky Blinders",
      date: "Wed Aug 16 2023",
      rating: 3,
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore rerum perspiciatis, ducimus facere aperiam deleniti. Ab, harum dolor obcaecati temporibus tempora a magnam incidunt est fuga sequi, ad nobis.",
      avatar:
        "https://cdn.pixabay.com/photo/2024/03/24/17/10/background-8653526_640.jpg",
      images: [
        "https://cdn.pixabay.com/photo/2024/03/11/12/43/leaf-8626541_640.jpg",
        "https://cdn.pixabay.com/photo/2024/03/07/15/57/houses-8618837_640.jpg",
        "https://cdn.pixabay.com/photo/2024/02/21/15/09/people-8587897_640.jpg",
      ],
    },
    // Add more reviews as needed
  ];
  const [selectedTourType, setSelectedTourType] = useState<string | null>(null);

  const handleBadgeClick = (type: string) => {
    setSelectedTourType(type);
  };

  const selectedBgColor = useColorModeValue("blue.500", "blue.300");
  const selectedTextColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const tourTypes = [
    "Bus Tour",
    "Day Trip",
    "Walking Tour",
    "Food & Drink",
    "Bike Tour",
    "Cruises",
  ];

  const location = useLocation();
  const { tour } = location.state || {};

  if (!tour) {
    return <div>No tour data available</div>;
  }
  const [selectedTour, setSelectedTour] = useState<{
    photos: any;
    title: string;
  } | null>(null);
  const [isDay1Open, setIsDay1Open] = useState(false);
  const [isDay2Open, setIsDay2Open] = useState(false);

  useEffect(() => {
    apiClient
      .get("/get-all-tours")
      .then((res) => {
        const foundTour = res.data.data.find((tours) => tours._id === tour._id);
        setSelectedTour(foundTour);
      })
      .catch((error) => {
        console.error("Error fetching tours:", error);
      });
  }, [tour._id]);

  if (!selectedTour) {
    return <div>Loading...</div>;
  }
  console.log(selectedTour);

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      bg={{ base: "white", sm: "grey.100" }}
    >
      <Box
        maxW="1190px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="lg"
        p={4}
        bg="white"
      >
        <Image
          src={selectedTour.photos[1]} // You can replace this with the image path
          alt="Pyramids of Giza"
          w="full"
          h={{ base: "200px", md: "600px" }}
          objectFit="cover"
          borderRadius={"1.5rem"}
        />
        <Box p={4}>
          <Stack spacing={4}>
            <Box>
              <Text fontWeight="bold" fontSize="xl" isTruncated>
                {selectedTour.title}
              </Text>
              <Text fontSize="md" color="gray.500">
                Guided By: Johnny Erdman
              </Text>
            </Box>
            6
            <Box
              borderTop={"1px"}
              borderBottom={"1px"}
              paddingTop="1rem"
              paddingBottom="1rem"
            >
              <Flex align="center" justify="space-between">
                <Text
                  fontSize="2xl"
                  color="#4F90AE"
                  fontWeight="bold"
                  paddingBottom={"1rem"}
                >
                  $20{" "}
                  <Text color="black" fontWeight="bold">
                    per person{" "}
                  </Text>
                </Text>
                <Button
                  backgroundColor="#4F90AE"
                  textColor="white"
                  size="lg"
                  borderRadius={9}
                >
                  Check Availability
                </Button>
              </Flex>
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  Description
                </Text>
                <Text fontSize="sm" color="gray.700">
                  Interested in introducing Egypt in depth to the enthusiast
                  tourists who love exploring and learning about ancient and
                  modern Egypt, my goal is to showcase the real Egypt through
                  ...
                </Text>
              </Box>
            </Box>
            <Box borderBottom={"1px"} paddingBottom="1rem">
              <Text fontWeight="bold" fontSize="lg">
                Tour Duration
              </Text>
              <Text>8 Hours</Text>
            </Box>
            <Box borderBottom="1px" paddingBottom="1rem">
              <Text fontWeight="bold" fontSize="lg" paddingBottom="1rem">
                Tour Type
              </Text>
              <HStack spacing={5} wrap="wrap">
                {tourTypes.map((type) => (
                  <Badge
                    key={type}
                    onClick={() => handleBadgeClick(type)}
                    cursor="pointer"
                    borderRadius="full"
                    px={4}
                    py={2}
                    border="1px"
                    borderColor={borderColor}
                    bg={
                      selectedTourType === type
                        ? selectedBgColor
                        : "transparent"
                    }
                    color={
                      selectedTourType === type ? selectedTextColor : "inherit"
                    }
                    _hover={{
                      bg:
                        selectedTourType === type
                          ? selectedBgColor
                          : "gray.100",
                    }}
                  >
                    {type}
                  </Badge>
                ))}
              </HStack>
            </Box>
            <Box borderBottom={"1px"} paddingBottom="1rem">
              <Text fontWeight="bold" fontSize="lg" marginBottom="0.5rem">
                Itinerary
              </Text>
              <Box>
                <Flex
                  align="center"
                  onClick={() => setIsDay1Open(!isDay1Open)}
                  cursor="pointer"
                >
                  <Text paddingLeft="1rem" fontSize="lg" fontWeight="bold">
                    Day 1
                  </Text>
                  <IconButton
                    aria-label="Expand Day 1"
                    icon={isDay1Open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    variant="ghost"
                  />
                </Flex>
                <Collapse in={isDay1Open} animateOpacity>
                  <Text pl="1rem">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit facere praesentium voluptatum id quibusdam
                    odit nesciunt pariatur fugiat obcaecati ipsum quia, facilis
                    aperiam nam? Ut deserunt aliquid omnis laborum at?
                  </Text>
                </Collapse>
              </Box>
              <Box mt={4}>
                <Flex
                  align="center"
                  onClick={() => setIsDay2Open(!isDay2Open)}
                  cursor="pointer"
                >
                  <Text paddingLeft="1rem" fontSize="lg" fontWeight="bold">
                    Day 2
                  </Text>
                  <IconButton
                    aria-label="Expand Day 2"
                    icon={isDay2Open ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    variant="ghost"
                  />
                </Flex>
                <Collapse in={isDay2Open} animateOpacity>
                  <Text pl="1rem">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Reprehenderit facere praesentium voluptatum id quibusdam
                    odit nesciunt pariatur fugiat obcaecati ipsum quia, facilis
                    aperiam nam? Ut deserunt aliquid omnis laborum at?
                  </Text>
                </Collapse>
              </Box>
            </Box>
            <Box borderBottom="1px" paddingBottom="1rem">
              <Text fontWeight="bold" fontSize="lg">
                Meeting Point
              </Text>
              <Text fontSize="md" fontWeight={"400"}>
                {selectedTour.meetingPoint.description}
              </Text>
            </Box>
            <Box borderBottom="1px" paddingBottom="1rem">
              <Text fontWeight="bold" fontSize="lg">
                What's Included
              </Text>
              <Text>Transportation, Entry Fees, Guide</Text>
            </Box>
            <Box borderBottom={"1px"} paddingBottom="1rem">
              <Text fontWeight="bold" fontSize="lg">
                What's Included
              </Text>
              <Text>Transportation, Entry Fees, Guide</Text>
            </Box>
            <Box borderBottom={"1px"} paddingBottom="1rem">
              <Text fontWeight="bold" fontSize="lg">
                What's Excluded
              </Text>
              <Text>Personal Expenses, Souvenirs, Food, Drinks, Snacks</Text>
            </Box>
            <Box borderBottom={"1px"} paddingBottom="1rem">
              <HStack justifyContent="space-between" marginBottom="1rem">
                <HStack>
                  <Text fontWeight="bold" fontSize="lg">
                    Reviews
                  </Text>
                  <Text fontSize="lg" color="gray.600">
                    4.5
                  </Text>
                  <StarIcon color="blue.500" />
                </HStack>
                <Button variant="link" colorScheme="blue">
                  write a review
                </Button>
              </HStack>
              <Stack spacing={3}>
                {reviews.map((review) => (
                  <Box
                    key={review.id}
                    p={4}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <HStack alignItems="flex-start">
                      <Image
                        borderRadius="full"
                        boxSize="50px"
                        src={review.avatar}
                        alt={review.name}
                      />
                      <Stack spacing={1} flex="1">
                        <HStack justifyContent="space-between">
                          <Box>
                            <Text fontWeight="bold">{review.name}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {review.date}
                            </Text>
                          </Box>
                          <HStack>
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                color={
                                  i < review.rating ? "blue.500" : "gray.300"
                                }
                              />
                            ))}
                          </HStack>
                        </HStack>
                        <Text mt={2}>{review.comment}</Text>
                        <HStack spacing={2} mt={2}>
                          {review.images.map((src, index) => (
                            <Image
                              key={index}
                              boxSize="50px"
                              borderRadius="md"
                              src={src}
                              alt={`Review ${index + 1}`}
                            />
                          ))}
                        </HStack>
                      </Stack>
                    </HStack>
                  </Box>
                ))}
                <Button variant="link" colorScheme="blue">
                  See all 20 Reviews
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Tour;
