import React, { Component, useEffect, useState } from "react";
// import {Button, List, Image, Input,  Container, Search  } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import styles from './Search.scss';
import "../../normalize.css";

import "./Home.css";

import VerticalLoadMore from './vertical-load-more';

import "react-vertical-timeline-component/style.min.css";

function App() {

  return (
    <div>
      <VerticalLoadMore />
    </div>
  );
}

export default App;
