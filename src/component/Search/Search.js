import React from "react";
import "../../normalize.css";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchResultView from "./SearchResultView";

import { Flex, Spacer, CircularProgress, Grid, Stack } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Search() {
  const history = useHistory();
  const [userInput, setUserInput] = useState("");
  const [events, setEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoaded(false);
    axios
      .get("/search?q=" + userInput)
      .then((res) => {
        // console.log(res.data.data.hits.hits)
        const newEvents = [...res.data.data.hits.hits];
        setEvents(newEvents);
        console.log(newEvents);
        setIsLoaded(true);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <div>
      <Box>
        <form onSubmit={handleSearch}>
          <Input
            placeholder="Please input here..."
            onChange={handleInputChange}
          />

          <Button
            loadingText="Searching"
            size="lg"
            bg={"teal.400"}
            color={"white"}
            _hover={{
              bg: "teal.500",
            }}
          >
            {" "}
            Search
          </Button>
        </form>

        <Flex p={8} w={"100vw"} align={"center"} justify={"center"}>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            {isLoaded ? (
              events.map((c) => (
                <Box
                  key={c._id}
                  rounded={"lg"}
                  bg={"white"}
                  boxShadow={"md"}
                  p={10}
                  onClick={(e) => {
                    history.push(`/timeline/${c._id}`);
                  }}
                  cursor="pointer"
                >
                  {c._source.title}
                </Box>
              ))
            ) : (
              <CircularProgress isIndeterminate color="green.300" />
            )}
          </Grid>
        </Flex>
      </Box>

      {/* <SearchResultView events={events}></SearchResultView> */}
    </div>
  );
}

export default Search;
