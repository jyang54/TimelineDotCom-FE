import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Profile() {
  const hiddenFileInput = React.useRef(null);
  const username = localStorage.getItem("username") || "visitor";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    axios
      .put(`/users/${username}`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  };

  useEffect(() => {
    axios
      .get(`/users/${username}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  }, []);

  return (
    <>
      <Flex p={10} align={"center"} justify={"center"}>
        <Box
          maxW={"320px"}
          w={"full"}
          bg={"white"}
          p={"8"}
          boxShadow={"lg"}
          rounded={"lg"}
        >
          <Stack>
            <Center>
              <Stack align={"center"} spacing={5}>
                <Avatar size="2xl" name={username} src="" />
                <Heading>{username}</Heading>
                <Button
                  onClick={() => {
                    hiddenFileInput.current.click();
                  }}
                  size={"sm"}
                >
                  Choose Avatar
                </Button>
              </Stack>
            </Center>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
              <FormHelperText>We'll never share your password.</FormHelperText>
            </FormControl>

            <Button>Update</Button>
          </Stack>
        </Box>
      </Flex>

      <input
        type="file"
        ref={hiddenFileInput}
        name="myImage"
        style={{ display: "none" }}
      />
    </>
  );
}

export default Profile;
