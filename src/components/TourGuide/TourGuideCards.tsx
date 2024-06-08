import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Text,
  Image,
  Flex,
  Icon,
  Heading,
  Card,
  CardBody,
  CardFooter,
  Stack,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";
import { Server_Url } from "../Main/root";
import TourGuideFilters from "../Filter/tourGuideFilter";
interface Language {
  _id: string;
  name: string;
  experience: string;
}
interface TourGuide {
  _id: string;
  firstname: string;
  lastname: string;
  identity_photo: string;
  languages: Language[];
  rate: number;
  hourPrice: number;
  guideIn: string[];
}

const TourGuideCards = () => {
  const [tourGuides, setTourGuides] = useState<TourGuide[]>([]);

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await axios.get(`${Server_Url}/api/get-all-guides`);
        const tourGuideData = response.data;
        if (Array.isArray(tourGuideData)) {
          const tourGuideDataFormatted = tourGuideData.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (tourGuide: any) => ({
              _id: tourGuide._id,
              firstname: tourGuide.user.firstname || "Unknown",
              lastname: tourGuide.user.lastname || "",
              identity_photo: tourGuide.identity_photo || "",
              // "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
              location: tourGuide.location || "Unknown",
              price: tourGuide.dayPrice || 0,
              rate: tourGuide.rate || 0,
              hourPrice: tourGuide.hourPrice || 0,
              guideIn: tourGuide.guideIn || [],
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              languages: tourGuide.languages || [],
            })
          );
          setTourGuides(tourGuideDataFormatted);
          console.log(
            "Tour guides fetched successfully:",
            tourGuideDataFormatted
          );
        } else {
          ("");
        }
      } catch (error) {
        console.error("Error fetching tour guides:", error);
      }
    };

    fetchTourGuides();
  }, []);

  return (
    <>
      <Heading fontSize="xl" mb={6}>
        For You
      </Heading>
      <TourGuideFilters />
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {tourGuides.map((tourGuide) => (
          <Card
            key={tourGuide._id}
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            cursor="pointer"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "150px" }}
              src={tourGuide.identity_photo}
              alt={tourGuide.firstname}
            />

            <Stack>
              <CardBody>
                <Heading size="sm">
                  {tourGuide.firstname} {tourGuide.lastname}
                </Heading>
                <Text py="2">{tourGuide.guideIn.join(", ")}</Text>
                <ul>
                  {tourGuide.languages.map((lang) => (
                    <li key={lang._id}>
                      {lang.name} - {lang.experience}
                    </li>
                  ))}
                </ul>
              </CardBody>

              <CardFooter justifyContent={"space-between"}>
                <Flex>
                  <Text>{tourGuide.hourPrice}</Text>
                </Flex>
                <Flex mt="2" alignItems="center">
                  {[...Array(5)].map((_, index) => (
                    <Icon
                      key={index}
                      as={StarIcon}
                      color={index < tourGuide.rate ? "yellow.400" : "gray.300"}
                    />
                  ))}
                </Flex>
              </CardFooter>
            </Stack>
          </Card>
        ))}
      </Grid>
    </>
  );
};
export default TourGuideCards;
