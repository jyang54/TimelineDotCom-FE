import {Avatar} from "@chakra-ui/avatar";
import {Heading} from "@chakra-ui/layout";
import React from "react";
import "../../normalize.css";

function User() {
    return (
        <div>
            <Avatar size="xl" name="Jintao Yang"/>
            <Heading>Jintao Yang</Heading>
        </div>
    );
}

export default User;
