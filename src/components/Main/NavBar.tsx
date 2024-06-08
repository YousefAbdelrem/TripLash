// AdvancedNavbar.tsx
import React from "react";
import { Box, Flex, Spacer, Image, Center } from "@chakra-ui/react";
// import { HamburgerIcon } from "@chakra-ui/icons";

import logo from "../assets/logo.png";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar: React.FC = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      color="black"
    >
      <Box>
        <Flex>
          <Image src={logo} boxSize="45px" />
          <Center color={"#263F6C"} fontSize={"xl"} fontFamily={"cursive"}>
            Triplash
          </Center>
        </Flex>
      </Box>
      <Spacer />
      <ColorModeSwitch />
    </Flex>
  );
};

export default NavBar;
