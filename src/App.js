import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
// import 'semantic-ui-css/semantic.min.css';

// // Include your new Components here
import Home from './component/Home/Home.js';
import User from './component/User/User.js';
import Category from  './component/Category/Category.js';
import Search from './component/Search/Search.js';

class App extends Component {
  render() {
    return (
      <Router basename="/cs498rk-final-proj">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/user" component={User}/>
          <Route exact path="/Category" component={Category}/>
          <Route exact path="/Search" component={Search}/>
        </Switch>
      </Router>
    );
  }
}
export default App;
