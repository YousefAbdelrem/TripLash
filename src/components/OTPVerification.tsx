import React, { useState } from "react";
import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import FormContainer from "./formContainer";
import NavBar from "./NavBar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


const OTPVerification = () => {
  const location = useLocation();
  const { email } = location.state || {};

  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(4).fill(""));

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input
    if (element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleResend = () => {
    // Logic to resend the OTP
    console.log("Resend OTP");
  };

  const schema = z.object({
    num1: z.string(),
    num2: z.string(),
    num3: z.string(),
    num4: z.string(),
  });

  type otp = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<otp>({ resolver: zodResolver(schema) });

  return (
    <FormContainer>
      <form
        onSubmit={handleSubmit((data: otp) => {
          let code = data.num1 + data.num2 + data.num3 + data.num4;
          apiClient
            .post("verify-code/", {code: code , email : email})
            .then((res) => { 
              console.log(res.data.status);
              navigate("/ChangePassword");
            })
            .catch((err) => console.log(err.response.data.status));
        })}
      >
        <ArrowBackIcon boxSize={6} onClick={() => {navigate("/changePassword");}}/>
        <NavBar />
        <VStack spacing={8} mt={8}>
          <Heading as="h2" size="xl">
            OTP Verification
          </Heading>
          <Text> Enter the verification code we just sent for you</Text>
          <HStack spacing={4}>
            <Input
              {...register("num1")}
              id="num1"
              maxLength={1} // Change from "1" to {1}
              textAlign="center"
              width="4rem"
              height="4rem"
              fontSize="2xl"
              bg="blue.50"
              borderColor="blue.300"
              type="text"
              _focus={{
                boxShadow: "outline",
              }}
            />
            <Input
              {...register("num2")}
              id="num1"
              maxLength={1} // Change from "1" to {1}
              textAlign="center"
              width="4rem"
              height="4rem"
              fontSize="2xl"
              bg="blue.50"
              borderColor="blue.300"
              type="text"
              _focus={{
                boxShadow: "outline",
              }}
            />
            <Input
              {...register("num3")}
              id="num1"
              maxLength={1} // Change from "1" to {1}
              textAlign="center"
              width="4rem"
              height="4rem"
              fontSize="2xl"
              bg="blue.50"
              borderColor="blue.300"
              type="text"
              _focus={{
                boxShadow: "outline",
              }}
            />
            <Input
              {...register("num4")}
              id="num1"
              maxLength={1} // Change from "1" to {1}
              textAlign="center"
              width="4rem"
              height="4rem"
              fontSize="2xl"
              bg="blue.50"
              borderColor="blue.300"
              type="text"
              _focus={{
                boxShadow: "outline",
              }}
            />
          </HStack>
          <Button
            width="100%"
            height="48px"
            margin="0.5rem"
            bgColor="#4F90AE"
            color="white"
            type="submit"
          >
            Verify
          </Button>
          <Text position={"absolute"} bottom="20px">
            Didn`t Receive code?{" "}
            <Button
              variant="link"
              colorScheme="black"
              fontWeight={"700"}
              onClick={handleResend}
            >
              Resend
            </Button>
          </Text>
        </VStack>
      </form>
    </FormContainer>
  );
};

export default OTPVerification;
