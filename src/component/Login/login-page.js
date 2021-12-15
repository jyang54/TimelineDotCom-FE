import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/users/login", {
        username: username,
        password: password,
        email: email,
      })
      .then((res) => {
        const { username, password, email, avatar } = res.data.data.user[0];
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("email", email);
        localStorage.setItem("avatar", avatar);
        history.push("/home");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  };
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          maxHeight={"100vh"}
          objectFit={"cover"}
          src={
            "https://images.pexels.com/photos/783944/pexels-photo-783944.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          }
        />
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Flex
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={10}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={5} w={"full"} maxW={"md"}>
              <Heading fontSize={"3xl"}>Get started.</Heading>
              <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input type="text" onChange={handleUsernameChange} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" onChange={handlePasswordChange} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" onChange={handleEmailChange} />
              </FormControl>

              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.500"}>Forgot password?</Link>
                </Stack>
                <Button colorScheme={"teal"} variant={"solid"} type="submit">
                  Sign in
                </Button>
                <Stack>
                  <Text align={"center"}>
                    Not a user?{" "}
                    <Link as={ReactLink} color={"teal"} to="/signup">
                      Join Us
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Flex>
      </Flex>
    </Stack>
  );
}

export default Login;
