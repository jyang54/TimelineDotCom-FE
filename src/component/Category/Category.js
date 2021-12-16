import React, {useEffect, useState } from "react";
import "../../normalize.css";

import {
  Box,
  CircularProgress,
  Grid,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Category() {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    axios
      .get("/category")
      .then((res) => {
        if (res.data && res.data.data) {
          setCategories(res.data.data);
          setIsLoaded(true);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  }, []);
  
  return (
    <Flex p={8} w={"100vw"} align={"center"} justify={"center"}>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        {isLoaded ? (
          categories.map((c) => (
            <Box
              key={c}
              rounded={"lg"}
              bg={"white"}
              boxShadow={"md"}
              p={10}
              onClick={(e) => {
                history.push(`/Categories/${c}`);
              }}
              cursor="pointer"
            >
              {c}
            </Box>
          ))
        ) : (
          <CircularProgress isIndeterminate color="green.300" />
        )}
      </Grid>
    </Flex>
  );
}

export default Category;
