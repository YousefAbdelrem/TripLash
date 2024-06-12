import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  // FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  ChakraProvider,
  VStack,
  Grid,
  theme,
} from "@chakra-ui/react";

type LoginProps = {
  onLogin: (username: string, password: string) => void;
};
const Login = ({ onLogin }: LoginProps) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();
    onLogin(username, password);
    try {
      const response = await fetch("http://54.242.169.193:9000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Redirect the user to another page on successful login
        window.location.href = "./";
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred while logging in");
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <div>
            <h2>Login</h2>
            {error && <div>{error}</div>}
            <VStack spacing={8}>
              <form onSubmit={login}>
                <Stack spacing="6">
                  <FormControl id="email">
                    <FormLabel>Email:</FormLabel>
                    <Input
                      type="email"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Password:</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    fontSize="md"
                  >
                    Login
                  </Button>
                </Stack>
              </form>
            </VStack>
          </div>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

export default Login;
