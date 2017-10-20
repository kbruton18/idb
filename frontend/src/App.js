import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import logo from './logo.svg';
import { Button } from 'reactstrap';
import './App.css';
import Nav from './Nav.js';
import Title from './Title.js';
import Home from './Home.js';
import About from './About.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title/>
        <Nav/>
        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
