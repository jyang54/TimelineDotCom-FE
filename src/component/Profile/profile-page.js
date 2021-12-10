import {
  Avatar,
  Box,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";

function Profile() {
  const hiddenFileInput = React.useRef(null);
  return (
    <>
      <Box p={20}>
        <Center>
          <Avatar
            size="2xl"
            name="Segun Adebayo"
            src=""
            onClick={() => {
              hiddenFileInput.current.click();
            }}
          />
        </Center>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>

        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
          <FormHelperText>We'll never share your email.</FormHelperText>
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
