import React from "react";
import {
  Box,
  Grid,
  GridItem,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Outlet, Link } from "react-router-dom";
const AdminDashboard: React.FC = () => {
  return (
    <>
      <Box p={4}>
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem colSpan={1}>
            <Box bg="gray.100" p={4} borderRadius="md">
              <VStack spacing={4} align="stretch">
                <ChakraLink as={Link} to="users">
                  All Users
                </ChakraLink>
                <ChakraLink as={Link} to="tour-guides">
                  All Tour Guides
                </ChakraLink>
                <ChakraLink as={Link} to="tour-guide-applications">
                  Tour Guide Applications
                </ChakraLink>
                <ChakraLink as={Link} to="favourites">
                  All Favourite Lists
                </ChakraLink>
              </VStack>
            </Box>
          </GridItem>
          <GridItem colSpan={3}>
            <Box bg="white" p={4} borderRadius="md">
              <Outlet />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default AdminDashboard;
