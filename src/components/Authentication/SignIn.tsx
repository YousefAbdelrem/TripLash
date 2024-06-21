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
  InputLeftAddon,
  Spacer,
  InputGroup,
  Divider,
  AbsoluteCenter,
  HStack,
  Text,
  InputRightElement,
  IconButton,
  InputLeftElement,
  Select,
  Img,
  Link,
} from "@chakra-ui/react";
import apiClient from "../../services/api-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Icon } from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RiFlag2Line } from "react-icons/ri"; // Import icon for country flag
import { useNavigate } from "react-router-dom";
import FormContainer from "./formContainer";
import { Link as RouterLink } from "react-router-dom";

const schema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  mobile: z.string().min(10),
  password: z
    .string()
    .min(6, { message: "Enter Min password 6 characters at least" })
    .max(50),
});

type signUpData = z.infer<typeof schema>;

const SignIn = () => {
  const navigate = useNavigate();
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
    color: "grey",
    height: "50px",
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

  return (
    <FormContainer>
      <form
        onSubmit={handleSubmit((data: signUpData) => {
          apiClient
            .post("signUp/", { ...data, language: "E" })
            .then((res) => {
              const token = res.data.token; // Assuming the token is returned in res.data.token
              localStorage.setItem("authToken", token); // Store the token securely
              console.log(res.data.status);
              navigate("/");
            })
            .catch((err) => console.log(err.response.data.status));
        })}
      >
        <Flex direction="column" gap="1rem" maxWidth="1024px">
          <Box mb="1rem">
            <NavBar />
          </Box>
          <Box textAlign="left">
            <Heading fontSize="22px" mb="20px">
              Join to unlock the best of TripLash
            </Heading>
          </Box>
          <FormControl mb="24px">
            <FormLabel sx={labelStyle}> Name </FormLabel>
            <Input
              {...register("name")}
              id="name"
              type="text"
              sx={inputBorder}
            ></Input>
          </FormControl>
          <FormControl mb="24px">
            <FormLabel sx={labelStyle}> Email </FormLabel>
            <Input
              {...register("email")}
              id="Email"
              type="text"
              sx={inputBorder}
            ></Input>
          </FormControl>
          <FormControl mb="24px" display="flex">
            <InputGroup>
              <Select
                placeholder="Select Country"
                height="50px"
                width="40%"
                mr="0.4rem"
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    <Flex alignItems="center">
                      <Icon size="2rem" as={FiEyeOff} mr="0.5rem" />{" "}
                      {country.name}
                    </Flex>
                  </option>
                ))}
              </Select>
              <Input
                {...register("mobile")}
                id="mobile"
                type="number"
                sx={inputBorder}
                placeholder="Phone Number"
                width="70vw"
              ></Input>
            </InputGroup>
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
          <Button
            height="48px"
            margin="0.5rem"
            bgColor="#4F90AE"
            color="white"
            type="submit"
          >
            Sign Up
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
                to="/Login"
                style={{
                  fontWeight: "600",
                  textAlign: "left",
                  borderColor: "currentColor",
                }}
              >
                Login
              </RouterLink>
            </HStack>
          </Box>
        </Flex>
      </form>
    </FormContainer>
  );
};

export default SignIn;
