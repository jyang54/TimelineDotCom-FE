import React from "react";
import "../../normalize.css";
import {Input} from "@chakra-ui/input";
import {Button} from "@chakra-ui/button";
import {Box} from "@chakra-ui/layout";

function Search() {
    return (
        <div>

            <Box>
                <Input>
                    Please input here...
                </Input>
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
