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

const Links = ["Home", "Categories", "Search"];

const NavItem = ({ children }) => (
  <Link
    px={3}
    py={1}
    rounded={"sm"}
    _hover={{
      textDecoration: "none",
      bg: "gray.200",
    }}
    as={ReactLink}
    to={`/${children}`}
  >
    {children}
  </Link>
);

function Navbar() {
  const { pathname } = useLocation();
  const username = localStorage.getItem("username") || "visitor";
  if (pathname === "/login" || pathname === "/signup") return null;

  const handleLogout = () => {
    localStorage.clear();
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
                  <Avatar size={"sm"} name={username} src={""} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"2xl"} name={username} src={""} />
                  </Center>
                  <br />
                  <Center>
                    <p>{username}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>
                    <Link as={ReactLink} to={`/profile`}>
                      Account Settings
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link as={ReactLink} to={`/login`} onClick={handleLogout}>
                      Logout
                    </Link>
                  </MenuItem>
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
