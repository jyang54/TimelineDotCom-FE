import { Avatar } from "@chakra-ui/avatar";
import { Heading } from "@chakra-ui/layout";
import React, { Component } from "react";
// import {Button, List, Image, Input,  Container, Search  } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import styles from './Search.scss';
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
