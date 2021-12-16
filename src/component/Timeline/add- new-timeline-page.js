import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NewTimeLine() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const history = useHistory();
  const username = localStorage.getItem("username") || "Visitor";
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    axios
      .post("/timeline", {
        title: title,
        content: content,
        category: category,
        tag: tag,
        owner_username: username,
      })
      .then((res) => {
        console.log("Added successfully");
        history.push("/mine");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  };
  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg={"gray.100"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} w={"md"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Create your own timeline 😉
            </Heading>
            {/* <Text fontSize={"lg"} color={"gray.600"}>
              to create and view your own timeline ✨
            </Text> */}
          </Stack>
          <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
            <form onSubmit={handleSubmit}>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input type="text" onChange={handleTitleChange} />
              </FormControl>
              <FormControl id="content" isRequired>
                <FormLabel>Content</FormLabel>
                <Input type="text" onChange={handleContentChange} />
              </FormControl>
              <FormControl id="category" isRequired>
                <FormLabel>Category</FormLabel>
                <Input type="text" onChange={handleCategoryChange} />
              </FormControl>
              <FormControl id="tag" isRequired>
                <FormLabel>Tag</FormLabel>
                <Input type="text" onChange={handleTagChange} />
              </FormControl>
              <Stack spacing={10} pt={8}>
                <Button type="submit">Submit</Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default NewTimeLine;
