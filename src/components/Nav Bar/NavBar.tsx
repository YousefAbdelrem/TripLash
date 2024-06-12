// AdvancedNavbar.tsx
import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Image,
  Center,
  HStack,
  // Link,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import ColorModeSwitch from "../Main/ColorModeSwitch";
import ProfileMenu from "./ProfileMenu";
const NavBar: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem 8rem"
      color="black"
    >
      <Box>
        <Link to="/">
          <Flex align="center">
            {" "}
            <Image src={logo} boxSize="45px" />
            <Center color="#263F6C" fontSize="xl" fontFamily="cursive">
              Triplash
            </Center>
          </Flex>
        </Link>
      </Box>
      <HStack spacing={8} alignItems="center">
        <Link to="/FavouriteLists">Favourites</Link>
        <Link to="/Bookings">Bookings</Link>
        <ProfileMenu />
      </HStack>
    </Flex>
  );
};

export default NavBar;

{
  /* <ColorModeSwitch /> */
}
