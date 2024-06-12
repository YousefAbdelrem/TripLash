import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import {
  TbUserCog,
  TbLogin,
  TbCurrencyDollar,
  TbGlobe,
  TbPalette,
  TbSettings,
  TbHelpCircle,
  TbDownload,
} from "react-icons/tb";
import { Link } from "react-router-dom";

const ProfileMenu: React.FC = () => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<TbUserCog size="24" />}
        aria-label="Profile"
        variant="ghost"
      />
      <MenuList>
        <Link to="/Login">
          <MenuItem icon={<TbLogin size="18px" />}>
            <HStack>
              <Text>Sign Up / Login</Text>
            </HStack>
          </MenuItem>
        </Link>
        <MenuDivider />
        <MenuItem icon={<TbCurrencyDollar size="18px" />}>
          <HStack>
            <Text>Currency</Text>
          </HStack>
        </MenuItem>
        <MenuItem icon={<TbGlobe size="18px" />}>
          <HStack>
            <Text>Language</Text>
          </HStack>
        </MenuItem>
        <MenuItem icon={<TbPalette size="18px" />}>
          <HStack>
            <Text>Appearance</Text>
          </HStack>
        </MenuItem>
        <MenuItem icon={<TbSettings size="18px" />}>
          <HStack>
            <Text>Settings</Text>
          </HStack>
        </MenuItem>
        <MenuItem icon={<TbHelpCircle size="18px" />}>
          <HStack>
            <Text>Support</Text>
          </HStack>
        </MenuItem>
        <MenuItem icon={<TbDownload size="18px" />}>
          <HStack>
            <Text>Download App</Text>
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
