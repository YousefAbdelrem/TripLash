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
import FormContainer from "./formContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const schema = z.object({
  newPassword: z.string().min(6, { message: "Password is not Valid" }).max(50),
});

type signUpData = z.infer<typeof schema>;

const ChangePassword = () => {
  const location = useLocation();
  const { email, Code } = location.state || {};

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
  const textStyle = {
    color: "grey",
    fontSize: "14px",
    fontWeight: "400",
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
          console.log({ ...data, email: email, code: Code });
          apiClient
            .post("reset-password/", { ...data, email: email, code: Code })
            .then((res) => {
              console.log(res.data.status);
              navigate("/Login");
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
            <HStack spacing={20}></HStack>
            <ArrowBackIcon
              boxSize={6}
              onClick={() => {
                navigate("/ForgetPassword");
              }}
            />
            <NavBar />
          </Box>
          <Box textAlign="center">
            <Heading fontSize="22px" mb="10px">
              Set New Password
            </Heading>
            <Text mb="1.7rem" sx={textStyle}>
              Your new password must be unique from those previously used.
            </Text>
          </Box>
          <FormControl mb="24px">
            <FormLabel sx={labelStyle}> New Password </FormLabel>
            <InputGroup size="md">
              <Input
                {...register("newPassword")}
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
          <FormControl mb="24px">
            <FormLabel sx={labelStyle}> Confirm Password </FormLabel>
            <InputGroup size="md">
              <Input
                {...register("newPassword")}
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
            Reset Password
          </Button>
        </Flex>
      </form>
    </FormContainer>
  );
};

export default ChangePassword;
