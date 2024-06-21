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
  Box,
  Spacer,
  CardHeader,
  Tag,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import ReactCountryFlag from "react-country-flag";
import React from "react";
import { Server_Url } from "../Main/root";
import TourGuideFilters from "../Filter/tourGuideFilter";
interface Language {
  _id: string;
  name: string;
  experience: string;
  countryCode: string;
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
const fallbackImageUrl =
  "https://static9.depositphotos.com/1000291/1170/i/450/depositphotos_11709956-stock-photo-tourist-travellers-with-map-in.jpg";

const TourGuideCards = () => {
  const [tourGuides, setTourGuides] = useState<TourGuide[]>([]);

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await axios.get(`${Server_Url}/api/get-all-guides`);
        const tourGuideData = response.data.data;
        console.log(response);
        if (Array.isArray(tourGuideData)) {
          const tourGuideDataFormatted = tourGuideData.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (tourGuide: any) => ({
              _id: tourGuide._id,
              firstname: tourGuide.user
                ? tourGuide.user.firstname || "Unknown"
                : "Unknown",
              lastname: tourGuide.user ? tourGuide.user.lastname || "" : "",
              identity_photo: tourGuide.identity_photo || "",
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
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {tourGuides.map((tourGuide) => (
          <Card
            key={tourGuide._id}
            width="100%"
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            cursor="pointer"
            boxShadow="lg"
            borderRadius="md"
            transition="transform 0.2s"
            _hover={{ transform: "scale(1.05)" }}
          >
            <Box width={{ base: "100%", sm: "150px" }} overflow="hidden">
              <Image
                objectFit="cover"
                width="100%"
                height="100%"
                src={tourGuide.identity_photo}
                alt={`${tourGuide.firstname} ${tourGuide.lastname}`}
                fallbackSrc={fallbackImageUrl}
              />
            </Box>

            <Stack flex="1" p={4}>
              <CardHeader mb={-8} mt={-4}>
                <Heading size="md" fontWeight={"12px"}>
                  {tourGuide.firstname} {tourGuide.lastname}
                </Heading>
              </CardHeader>
              <CardBody mt={-4} mb={-8}>
                <Text py="2">{tourGuide.guideIn.join(", ")}</Text>
                <Spacer />
                {/* <ul>
                  {tourGuide.languages.map((lang) => (
                    <li key={lang._id}>
                      {lang.name} - {lang.experience}
                    </li>
                  ))}
                </ul> */}
                <Flex flexWrap="wrap">
                  {tourGuide.languages.map((lang) => (
                    <Tag key={lang._id} mr={2} mb={2}>
                      <ReactCountryFlag
                        countryCode={lang.countryCode}
                        svg
                        style={{ marginRight: "5px" }}
                      />
                      {lang.name} - {lang.experience}
                    </Tag>
                  ))}
                </Flex>
              </CardBody>

              <CardFooter justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                  <Text fontWeight="bold">${tourGuide.hourPrice}/hr</Text>
                </Flex>
                <Spacer />
                <Flex alignItems="center">
                  <Icon as={StarIcon} color="yellow.400" />
                  <Text ml={1}>{tourGuide.rate}</Text>
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
