import React, { Component } from 'react';
// import {Button, List, Image, Input,  Container, Search  } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import styles from './Search.scss';
import '../../normalize.css';
// import axios from 'axios'


class App extends Component {
    constructor() {
      super();
    }

    render() {
    console.log("in render");

    return (
        <div>
            <div class="title">
                Timeline Category
            </div>






            <div className="menu">
                <div class="button">
                    <Link to="/">Home</Link>
                </div>
                <div class="button">
                    <Link to="/User">User</Link>
                </div>
                <div class="button">
                    <Link to="/Category">Category</Link>
                </div>
                <div class="button">
                    
                    <Link to="/Search">Search</Link>
                </div>
                
            </div>

      </div>
    );
  }
}

export default App;

