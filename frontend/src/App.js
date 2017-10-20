import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import Nav from './Nav.js';
import Title from './Title.js';
import Home from './Home.js';
import About from './About.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Title/>
          <Nav/>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
