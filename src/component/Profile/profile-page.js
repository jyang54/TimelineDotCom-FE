import {
  Avatar,
  Box,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";

function Profile() {
  const hiddenFileInput = React.useRef(null);
  return (
    <>
      <Box p={20}>
        <Center>
          <div>
            <Avatar
              size="2xl"
              name="Jintao Yang"
              src=""
              onClick={() => {
                hiddenFileInput.current.click();
              }}
            />
            <Heading>Jintao Yang</Heading>
          </div>
        </Center>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input />
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
