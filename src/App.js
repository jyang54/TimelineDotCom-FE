import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import "./App.css";
// import 'semantic-ui-css/semantic.min.css';

// // Include your new Components here
import Home from "./component/Home/Home.js";
import User from "./component/User/User.js";
import Category from "./component/Category/Category.js";
import Search from "./component/Search/Search.js";
import { ChakraProvider } from "@chakra-ui/react";
import SignupCard from "./component/Register/register";
import Navbar from "./component/Navbar/navbar";
import Login from "./component/Login/login-page";
import Profile from "./component/Profile/profile-page";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignupCard} />
          <Route exact path="/user" component={User} />
          <Route exact path="/Category" component={Category} />
          <Route exact path="/Search" component={Search} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
