// AdvancedNavbar.tsx
import React from "react";
import {
  Box,
  Flex,
  Spacer,
  Image,
  Center,
  HStack,
  IconButton,
  Link,
} from "@chakra-ui/react";

import logo from "../../assets/logo.png";
import ColorModeSwitch from "../Main/ColorModeSwitch";
import { TbUserCog } from "react-icons/tb";
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
        <Flex>
          <Image src={logo} boxSize="45px" />
          <Center color={"#263F6C"} fontSize={"xl"} fontFamily={"cursive"}>
            Triplash
          </Center>
        </Flex>
      </Box>
      <Spacer />
      <HStack spacing={8} alignItems="center">
        <Link href="/bookings">Bookings</Link>
        <Link href="/favorites">Favorites</Link>
        <ProfileMenu />
      </HStack>
      {/* <ColorModeSwitch /> */}
    </Flex>
  );
};

export default NavBar;
