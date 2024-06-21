// AdvancedNavbar.tsx
import React from "react";
import { Box, Flex, Image, Center, HStack } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import ColorModeSwitch from "../Main/ColorModeSwitch";
import ProfileMenu from "./ProfileMenu";

const NavBar: React.FC = () => {
  const location = useLocation();

  const linkStyles = (path: string) => ({
    fontWeight: location.pathname === path ? "bold" : "normal",
    color: location.pathname === path ? "#263F6C" : "black",
    textDecoration: location.pathname === path ? "underline" : "none",
  });

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
            <Image src={logo} boxSize="45px" />
            <Center color="#263F6C" fontSize="xl" fontFamily="cursive">
              Triplash
            </Center>
          </Flex>
        </Link>
      </Box>
      <HStack spacing={8} alignItems="center">
        <Link to="/FavouriteLists" style={linkStyles("/FavouriteLists")}>
          Favourites
        </Link>
        <Link to="/Bookings" style={linkStyles("/Bookings")}>
          Bookings
        </Link>
        <ProfileMenu />
      </HStack>
    </Flex>
  );
};

export default NavBar;
