import React, { useContext } from "react";
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
  TbLogout,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthContext";

const ProfileMenu: React.FC = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext?.logout();
    console.log("logged out");
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<TbUserCog size="24" />}
        aria-label="Profile"
        variant="ghost"
      />
      <MenuList>
        {!authContext?.token ? (
          <Link to="/Login">
            <MenuItem icon={<TbLogin size="18px" />}>
              <HStack>
                <Text>Sign Up / Login</Text>
              </HStack>
            </MenuItem>
          </Link>
        ) : (
          <>
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
            <MenuDivider />
            <MenuItem icon={<TbLogout size="18px" />} onClick={handleLogout}>
              <HStack>
                <Text>Logout</Text>
              </HStack>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
