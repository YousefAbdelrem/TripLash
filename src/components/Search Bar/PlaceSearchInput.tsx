import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import React from "react";

const PlaceSearchInput = ({ placeholder }) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          onClick={handleClick}
          borderRadius="32px"
          h="100%"
          border="none"
          cursor="pointer"
          variant="unstyled"
          _focus={{ border: "none" }}
          _hover={{ bg: "gray.100" }}
          px={4}
          ml={2}
        />
      </PopoverTrigger>
      <PopoverContent>
        <Box p="4">
          <div></div>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

export default PlaceSearchInput;
