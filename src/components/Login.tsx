//   import { z } from "zod";
//   import { useForm } from "react-hook-form";
//   import { zodResolver } from "@hookform/resolvers/zod";
//   import { Input, Button, Text } from "@chakra-ui/react";
//   import {} from "@chakra-ui/react";
// import checkUser from "../services/apiService";
// import { useEffect, useState } from "react";
// import apiClient from "../services/api-client";

// const schema = z.object({
//   username: z.string().email({ message: 'Invalid email address'}),
//   password: z.string().min(6, { message: "Password is not Valid" }).max(50),
// });

// type LoginData = z.infer<typeof schema>;

// const Login = () => {

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<LoginData>({ resolver: zodResolver(schema) });

//   return (
//     <form
//       onSubmit={ handleSubmit((data: LoginData) => {
//         apiClient
//           .post("login/", data)
//           .then((res) => {
//             console.log(res.data.status);
//             window.location.href = "/";
//           })
//           .catch((err) => console.log(err.response.data.status));
//       })}
//     >
//       <div className="mb-3">
//         <label htmlFor="username">Email</label>
//         <Input
//           {...register("username")}
//           id="username"
//           type="text"
//           size="md"
//           margin="1rem"
//         />
//         {errors.username && (
//           <p className="text-danger">{errors.username.message}</p>
//         )}
//       </div>
//       <div className="mb-3">
//         <label htmlFor="password">Password</label>
//         <Input
//           {...register("password")}
//           id="password"
//           type="password"
//           size="md"
//           margin="1rem"
//         />
//         {errors.password && <p>{errors.password.message}</p>}
//       </div>
//       <Button margin="1.5rem" colorScheme="blue">
//         <button>Submit</button>
//       </Button>
//     </form>
//   );
// };

// export default Login;

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

  return (
    <form
      onSubmit={handleSubmit((data: signUpData) => {
        apiClient
          .post("login/", { ...data, language: "E" })
          .then((res) => {
            console.log(res.data.status);
            // window.location.href = "/";
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

        <Link
          fontWeight="semibold"
          textAlign="left"
          textDecoration="underline"
          borderColor="currentColor"
          paddingLeft="10px"
        >
          Forget Password?
        </Link>

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
            <Text fontWeight="600"> Login </Text>
          </HStack>
        </Box>
      </Flex>
    </form>
  );
};

export default SignIn;
