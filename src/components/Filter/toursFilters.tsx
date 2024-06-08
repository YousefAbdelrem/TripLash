import React, { useState } from "react";
import {
  Flex,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Input,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const languages = ["English", "Spanish", "French", "German"];
const types = ["Adventure", "Cultural", "Nature", "Historical"];

const ToursFilters = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Flex flexWrap="wrap" alignItems="center" mb={6}>
      <Stack direction="row" spacing={2}>
        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={"white"}
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
          >
            Language
          </MenuButton>

          <MenuList>
            <MenuOptionGroup type="checkbox">
              {languages.map((language) => (
                <MenuItemOption key={language} value={language}>
                  {language}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Menu closeOnSelect={false}>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bg={"white"}
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="md"
            borderWidth="1px"
          >
            Type
          </MenuButton>

          <MenuList>
            <MenuOptionGroup type="checkbox">
              {types.map((type) => (
                <MenuItemOption key={type} value={type}>
                  {type}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        <Stack direction="row" spacing={4}>
          <Popover
            isOpen={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
          >
            <PopoverTrigger>
              <Input
                type="number"
                placeholder="Price Range"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <Stack spacing={2}>
                  <Input type="number" placeholder="Min Price" />
                  <Input type="number" placeholder="Max Price" />
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ToursFilters;
