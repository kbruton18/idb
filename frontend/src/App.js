import React, { Component } from 'react';
import logo from './logo.svg';
import { Button } from 'reactstrap';
import './App.css';
import Home from './Home.js';
import About from './About.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Home /> */}
        <About />
      </div>
    );
  }
}

export default App;
