import React, { useState } from "react";
import {
  Box,
  Center,
  Container,
  Flex,
  HStack,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import TourIcon from "@mui/icons-material/Tour";
import TourCards from "../Tours/TourCards";
import TourGuideCards from "../TourGuide/TourGuideCards";

interface TitleWithIconProps {
  title: string;
  icon: React.ElementType;
  onClick: () => void;
  isSelected: boolean;
}

const TitleWithIcon: React.FC<TitleWithIconProps> = ({
  title,
  icon,
  onClick,
  isSelected,
}) => {
  return (
    <Flex
      flexWrap="wrap"
      alignItems="center"
      position="relative"
      mt={8}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Box
        border="2px solid"
        borderColor="gray.100"
        borderRadius="xl"
        w={"200px"}
        h={"64px"}
        shadow={isSelected ? "md" : "none"}
      >
        <Box position="absolute" left="-15px" top="8px">
          <Center>
            <Box bg="#4f90ae" borderRadius="full" p={3}>
              <Center>
                <Icon as={icon} boxSize={6} color="white" />
              </Center>
            </Box>
          </Center>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Center>
            <Heading as="h2" size="md" margin="18px" ml="32px">
              {title}
            </Heading>
          </Center>
        </Box>
      </Box>
    </Flex>
  );
};

const Navi = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>("Tours");
  return (
    <Box>
      <center>
        <HStack spacing={"8%"} wrap="wrap" justifyContent="center">
          <TitleWithIcon
            title="Tours"
            icon={TourIcon}
            onClick={() => setSelectedComponent("Tours")}
            isSelected={selectedComponent === "Tours"}
          />
          <TitleWithIcon
            title="Tour Guides"
            icon={FaUser}
            onClick={() => setSelectedComponent("Tour Guides")}
            isSelected={selectedComponent === "Tour Guides"}
          />
        </HStack>
      </center>
      <Container maxW="container.xl" mt={8}>
        <Box>{selectedComponent === "Tours" && <TourCards />}</Box>
      </Container>
      <Container maxW="container.xl" mt={8}>
        <Box>{selectedComponent === "Tour Guides" && <TourGuideCards />}</Box>
      </Container>
    </Box>
  );
};

export default Navi;
