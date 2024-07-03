import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/logo.svg";
// import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent="center" height="3rem" padding="10px">
      <Image src={logo} boxSize="65px"></Image>
    </HStack>
  );
};

export default NavBar;
