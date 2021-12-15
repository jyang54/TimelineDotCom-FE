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
	Input,
	Stack,
} from "@chakra-ui/react";
import axios from "axios";
import React, {useEffect, useState} from "react";

function Profile() {
	// const hiddenFileInput = React.useRef(null);
	const username = localStorage.getItem("username") || "visitor";
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState("");
	const [password, setPassword] = useState("");

	const handleAvatarChange = (e) => {
		if (e.target.files.length > 0) {
			const avatarFile = URL.createObjectURL(e.target.files[0]);
			setAvatar(avatarFile);
		}
	}
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.debug("button clicked", email, password);
		axios
			.put(`/users/${username}`, {
				email: email,
				password: password,
				avatar: avatar,
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
				let {password, email, avatar} = res.data.data[0];
				setEmail(email);
				setAvatar(avatar);
				setPassword(password);
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
				<form onSubmit={handleSubmit}>
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
									<Avatar size="2xl" name={username} src={avatar}/>
									<Heading>{username}</Heading>
									<Input
										type="file"
										onChange={handleAvatarChange}
										id="upload" accept="image/*"
									/>
								</Stack>
							</Center>
							<FormControl id="email">
								<FormLabel>Email address</FormLabel>
								<Input type="email" value={email} onChange={handleEmailChange}/>
								<FormHelperText>We'll never share your email.</FormHelperText>
							</FormControl>

							<FormControl id="password">
								<FormLabel>Password</FormLabel>
								<Input type="password" onChange={handlePasswordChange}/>
								<FormHelperText>We'll never share your password.</FormHelperText>
							</FormControl>

							<Button type='submit'>Update</Button>
						</Stack>
					</Box>
				</form>
			</Flex>
		</>
	);
}

export default Profile;
