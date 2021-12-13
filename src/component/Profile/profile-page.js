import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

function Profile() {
  const hiddenFileInput = React.useRef(null);
  const username = localStorage.getItem("username") || "visitor";
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <Box p={20}>
        <Center>
          <div>
            <Avatar size="2xl" name={username} src="" />
            <Button
              onClick={() => {
                hiddenFileInput.current.click();
              }}
            >
              Choose Avatar
            </Button>
            <Heading>{username}</Heading>
          </div>
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
      </Box>

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
