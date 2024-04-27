import { HStack, Image , Text} from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack justifyContent="space-between" height='3rem' padding="10px">
      <Image src={logo} boxSize='65px' ></Image>
      <ColorModeSwitch></ColorModeSwitch>
    </HStack>
  )
};

export default NavBar;
