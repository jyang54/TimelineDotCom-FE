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
    px={2}
    py={1}
    rounded={"md"}
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
  if (pathname === "/login" || pathname === "/signup") return null;
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
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
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
