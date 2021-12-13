import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  toast,
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactLink } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupCard() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting");
    axios
      .post("/users/signup", {
        username: username,
        password: password,
        email: email,
      })
      .then((res) => {
        console.log("Sign up successfully");
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        history.push("/home");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} w={"md"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to create and view your own timeline ✨
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="userName" isRequired>
                <FormLabel>Username</FormLabel>
                <Input type="text" onChange={handleUsernameChange} />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={handleEmailChange} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={handlePasswordChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="blue.400"
                    />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link as={ReactLink} color={"teal"} to="/login">
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignupCard;
