import { useState } from "react";
import {
  Box,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalenderSearchInput = ({ placeholder }) => {
  const [date, setDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const onChange = (newDate: React.SetStateAction<Date>) => {
    setDate(newDate);
    setIsOpen(false);
    setInputValue(newDate.toString());
  };
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Popover isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Input
          // value={value}
          // onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          value={inputValue}
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
          <div>
            <Calendar onChange={onChange} value={date} />
          </div>
        </Box>
      </PopoverContent>
    </Popover>
  );
};

export default CalenderSearchInput;
