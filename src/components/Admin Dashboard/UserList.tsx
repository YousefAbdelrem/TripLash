import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
  Button,
  Flex,
  Select,
} from "@chakra-ui/react";
import { Server_Url } from "../Main/root";
import { User } from "./Types/User";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";

const AllUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(7);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!authContext || !authContext.token) {
        console.error("Auth context or token is not available");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${Server_Url}/api/get-all-users`, {
          headers: { Authorization: `Bearer ${authContext.token}` },
        });
        console.log(response.data.status);
        setUsers(response.data.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      <Box overflowX="auto" maxH="calc(95vh - 150px)">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                # Users
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                ID
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                First Name
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Email
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Mobile
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                User Types
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Language
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Created At
              </Th>
              <Th position="sticky" top={0} zIndex={2} bg={"white"}>
                Updated At
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentUsers.map((user, index) => (
              <Tr key={user._id}>
                <Td>{indexOfFirstUser + index + 1}</Td>

                <Td>{user._id}</Td>
                <Td>{`${user.firstname} ${user.lastname}`}</Td>
                <Td>{user.email}</Td>
                <Td>{user.mobile}</Td>
                <Td>{user.user_types.join(", ")}</Td>
                <Td>{user.language}</Td>
                <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
                <Td>{new Date(user.updatedAt).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Flex mt={4} justifyContent="space-between" alignItems="center">
        <Button
          onClick={() => paginate(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Select
          value={currentPage}
          onChange={(e) => paginate(Number(e.target.value))}
          width="auto"
          variant="filled"
        >
          {Array.from(
            { length: Math.ceil(users.length / usersPerPage) },
            (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            )
          )}
        </Select>
        <Button
          onClick={() => paginate(currentPage + 1)}
          isDisabled={currentPage === Math.ceil(users.length / usersPerPage)}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default AllUsers;
