import React, { useState } from "react";
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
  Select,
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
import OTPVerification from "./OTPVerification";

 
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }).optional(),
});
type signUpData = z.infer<typeof schema>;

const ForgetPassowrd = () => {
  const navigate = useNavigate();

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
      zIndex: -1,
    },
  };
  const labelStyle = {
    position: "absolute",
    top: "-13px",
    left: "10px",
    background: "white",
    paddingLeft: "5px",
    paddingRight: "5px",
    zIndex: 1,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<signUpData>({ resolver: zodResolver(schema) });

  const [email, setEmail] = useState("empty");
  return (
    <FormContainer>
      <form
        onSubmit={handleSubmit((data: signUpData) => {
          apiClient
            .post("send-verification-code/", data)
            .then((res) => {
              console.log(res.data.status);
              setEmail(data.email);
              navigate("/OTPVerification", { state: { email: data.email } });
            })
            .catch((err) => console.log(err.response.data.status));
        })}
      >
        <Flex
          direction="column"
          gap="1.5rem"
          
        >
          <Box mb="1rem">
            <NavBar />
          </Box>
          <Box textAlign="center" marginBottom="40px">
            <Heading fontSize="30px" mb="20px">
              Forgot Password?
            </Heading>
            <Text> Recover from Phone or Email</Text>
          </Box>
          <FormControl>
            <FormLabel sx={labelStyle}> Email or Phone Number </FormLabel>
            <Input
              {...register("email")}
              id="email"
              type="text"
              sx={inputBorder}
            ></Input>
          </FormControl>
          {/* <Box position="relative" padding="0.5rem">
            <Divider color="grey" border="1px" />
            <AbsoluteCenter bg="white" px="4" fontWeight={"600"}>
              OR
            </AbsoluteCenter>
          </Box>
          <FormControl mb="24px" display="flex">
            <InputGroup>
              <Select
                placeholder="Select Country"
                height="50px"
                width="30%"
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
          </FormControl> */}
          <Button
            height="48px"
            margin="0.5rem"
            bgColor="#4F90AE"
            color="white"
            type="submit"
          >
            Send Code
          </Button>
          <Box flexGrow={"1"}></Box>
          <Box >
            <HStack justify="center" gap="" >
              <Text paddingRight="5px" position={'absolute'} bottom='20px'>Remembered Password?
              <Link
                fontWeight="semibold"
                textAlign="left"
                borderColor="currentColor"
                padding="5px"
              >
                Login
              </Link>
              </Text>
            </HStack>
          </Box>
        </Flex>
      </form>
    </FormContainer>
  );
};

export default ForgetPassowrd;
