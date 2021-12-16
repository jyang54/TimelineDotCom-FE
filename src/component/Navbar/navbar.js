import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  HStack,
} from "@chakra-ui/react";
import { Link as ReactLink, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import axios from "axios";

const Links = ["Home", "Categories", "Search", "Explore"];

const NavItem = ({ children, color }) => (
  <Link
    px={3}
    py={1}
    rounded={"sm"}
    _hover={{
      textDecoration: "none",
      bg: "gray.200",
    }}
    color={color}
    as={ReactLink}
    to={`/${children}`}
  >
    {children}
  </Link>
);

function Navbar({ avatar: globalAvatar }) {
  const { pathname } = useLocation();
  const history = useHistory();
  const username = localStorage.getItem("username") || "visitor";
  const avatar = globalAvatar || "visitor";
  if (pathname === "/login" || pathname === "/signup") return null;

  const handleLogout = () => {
    localStorage.clear();
    history.replace("/login");
  };

  const handleProfile = () => {
    history.push("/profile");
  };

  return (
    <>
      <Box bg="gray.100" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Box>Timeline</Box>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={10}>
              <Stack direction={"row"}>
                {Links.map((link) => (
                  <NavItem key={link}>{link}</NavItem>
                ))}
              </Stack>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} name={username} src={avatar} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} name={username} src={avatar} />
                  </Center>
                  <br />
                  <Center>
                    <p>{username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem onClick={handleProfile}>My Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default Navbar;
