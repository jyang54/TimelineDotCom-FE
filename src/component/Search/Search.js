import React, { Component } from "react";
// import {Button, List, Image, Input,  Container, Search  } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./Search.scss";
import "../../normalize.css";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
// import axios from 'axios'

function Search() {
  return (
    <div>

      <Box>
        <Input></Input>
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
      </Box>
    </div>
  );
}

export default Search;
