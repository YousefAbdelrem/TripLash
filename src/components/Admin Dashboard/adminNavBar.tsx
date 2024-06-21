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
import ProfileMenu from "../Nav Bar/ProfileMenu";

const AdminNavBar: React.FC = () => {
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
        <Link to="/AdminDashboard">
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
        <ProfileMenu />
      </HStack>
    </Flex>
  );
};

export default AdminNavBar;
