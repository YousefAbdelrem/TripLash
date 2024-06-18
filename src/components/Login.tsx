import React from "react";
import NavBar from "./NavBar";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Divider,
  AbsoluteCenter,
  HStack,
  Text,
  InputRightElement,
  IconButton,
  Link,
} from "@chakra-ui/react";
import apiClient from "../services/api-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Icon } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RiFlag2Line } from "react-icons/ri"; // Import icon for country flag
import FormContainer from "./formContainer";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
const schema = z.object({
  username: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password is not Valid" }).max(50),
});

type signUpData = z.infer<typeof schema>;

const SignIn = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const countries = [
    { name: "United States", code: "US", flag: FiEye },
    { name: "United Kingdom", code: "GB", flag: RiFlag2Line },
    { name: "Canada", code: "CA", flag: RiFlag2Line },
    // Add more countries as needed
  ];

  const inputBorder = {
    border: "1px solid",
    color: "black", // Ensure text color is black
    height: "50px",
    _placeholder: { color: "gray.400" }, // Placeholder color
    _focus: {
      borderColor: "blue.400", // Change border color on focus
      zIndex: 1,
    },
  };
  const labelStyle = {
    position: "absolute",
    top: "-13px",
    left: "10px",
    background: "white",
    paddingLeft: "5px",
    paddingRight: "5px",
    zIndex: 2,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signUpData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  return (
    <FormContainer>
      <form
        onSubmit={handleSubmit((data: signUpData) => {
          apiClient
            .post("login/", { ...data, language: "E" })
            .then((res) => {
              const token = res.data.token; // Assuming the token is returned in res.data.token
              localStorage.setItem("authToken", token); // Store the token securely
              console.log(res.data.status);
              navigate("/SignIn");
            })
            .catch((err) => console.log(err.response.data.status));
        })}
      >
        <Flex
          direction="column"
          gap="1rem"
          maxWidth="400px"
          alignSelf={"center"}
        >
          <Box mb="1rem">
            <NavBar />
          </Box>
          <Box textAlign="left">
            <Heading fontSize="22px" mb="20px">
              Welocme Back
            </Heading>
          </Box>
          <FormControl mb="24px">
            <FormLabel sx={labelStyle}> Email or Phone Number </FormLabel>
            <Input
              {...register("username")}
              id="username"
              type="text"
              sx={inputBorder}
            ></Input>
          </FormControl>
          <FormControl mb="24px">
            <FormLabel sx={labelStyle}> Password </FormLabel>
            <InputGroup size="md">
              <Input
                {...register("password")}
                id="password"
                type={show ? "text" : "password"}
                sx={inputBorder}
              ></Input>
              <InputRightElement width="4.5rem" height="100%">
                <IconButton
                  icon={show ? <FiEyeOff /> : <FiEye />} // Use conditional rendering to display different icons based on state
                  aria-label={show ? "Hide" : "Show"} // Set aria-label for accessibility
                  onClick={handleClick}
                  variant="ghost" // Use ghost variant for an icon-only button
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <RouterLink
            to="/ForgetPassword"
            style={{
              fontWeight: "semibold",
              textAlign: "left",
              textDecoration: "underline",
              paddingLeft: "10px",
            }}
          >
            Forget Password?
          </RouterLink>
          <Button
            height="48px"
            margin="0.5rem"
            bgColor="#4F90AE"
            color="white"
            type="submit"
          >
            Login
          </Button>
          <Box position="relative" padding="0.5rem">
            <Divider color="grey" border="1px" />
            <AbsoluteCenter bg="white" px="4">
              Or
            </AbsoluteCenter>
          </Box>
          <Box>
            <HStack justify="center" gap="1rem">
              <Icon as={FaFacebook} boxSize="30px" color="blue.500" />
              <Icon as={FaApple} boxSize="30px" color="" />
              <Icon as={FcGoogle} boxSize="30px" color="blue.500" />
            </HStack>
          </Box>
          <Box>
            <HStack justify="center" gap="">
              <Text paddingRight="5px">Already a Member?</Text>
              <RouterLink
                to="/SignIn"
                style={{
                  fontWeight: "600",
                  textAlign: "left",
                  borderColor: "currentColor",
                }}
              >
                Sign In
              </RouterLink>
            </HStack>
          </Box>
        </Flex>
      </form>
    </FormContainer>
  );
};

export default SignIn;
