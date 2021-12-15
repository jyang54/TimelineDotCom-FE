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
} from "@chakra-ui/react";
import axios from "axios";
import {useState} from "react";
import {useHistory} from "react-router-dom";

function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post("/users/login", {
				username: username,
				password: password,
			})
			.then((res) => {
				console.log(res);
				localStorage.setItem("username", username);
				history.push("/home");
			})
			.catch((err) => {
				if (err.response && err.response.data) {
					alert(err.response.data.message);
				}
			});
	};
	return (
		<Stack minH={"100vh"} direction={{base: "column", md: "row"}}>
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
								<Input type="text" onChange={handleUsernameChange}/>
							</FormControl>
							<FormControl id="password">
								<FormLabel>Password</FormLabel>
								<Input type="password" onChange={handlePasswordChange}/>
							</FormControl>

							<Stack spacing={6}>
								<Stack
									direction={{base: "column", sm: "row"}}
									align={"start"}
									justify={"space-between"}
								>
									<Checkbox>Remember me</Checkbox>
									<Link color={"blue.500"}>Forgot password?</Link>
								</Stack>
								<Button colorScheme={"teal"} variant={"solid"} type="submit">
									Sign in
								</Button>
								<Button colorScheme={"teal"} variant={"solid"} onClick={() => history.push('/signup')}>
									Sign up
								</Button>
							</Stack>
						</Stack>
					</form>
				</Flex>
			</Flex>
		</Stack>
	);
}

export default Login;
