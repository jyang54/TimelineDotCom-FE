import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
// import 'semantic-ui-css/semantic.min.css';

import Home from "./component/Home/Home.js";
import User from "./component/User/User.js";
import Category from "./component/Category/Category.js";
import Search from "./component/Search/Search.js";
import { ChakraProvider } from "@chakra-ui/react";
import SignupCard from "./component/Register/sign-up-page";
import Navbar from "./component/Navbar/navbar";
import Login from "./component/Login/login-page";
import Profile from "./component/Profile/profile-page";
import RequireAuth from "./component/require-auth";
import CategoryTimeline from "./component/Category/category-timeline-page";
import Explore from "./component/Home/home-page";
import VerticalLoadMore from "./component/Home/vertical-load-more";
import MyTimeline from "./component/Timeline/my-timelines-page";
import NewTimeLine from "./component/Timeline/add- new-timeline-page";

function App() {
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar" || ""));
  return (
    <ChakraProvider>
      <Router>
        <Navbar avatar={avatar} />
        <Switch>
          <Route
            exact
            path="/"
            component={localStorage.getItem("username") ? Home : Login}
          />
          <Route
            exact
            path="/profile"
            render={() => (
              <RequireAuth>
                <Profile setAvatar={setAvatar} />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/home"
            render={() => (
              <RequireAuth>
                <Home />
              </RequireAuth>
            )}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignupCard} />
          <Route
            exact
            path="/user"
            render={() => (
              <RequireAuth>
                <User />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/categories"
            render={() => (
              <RequireAuth>
                <Category />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/categories/:id"
            render={() => (
              <RequireAuth>
                <CategoryTimeline />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/Search"
            render={() => (
              <RequireAuth>
                <Search />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/explore"
            render={() => (
              <RequireAuth>
                <Explore />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/timeline/new"
            render={() => (
              <RequireAuth>
                <NewTimeLine />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/timeline/:id"
            render={() => (
              <RequireAuth>
                <VerticalLoadMore />
              </RequireAuth>
            )}
          />
          <Route
            exact
            path="/mine"
            render={() => (
              <RequireAuth>
                <MyTimeline />
              </RequireAuth>
            )}
          />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
