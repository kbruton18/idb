import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import Nav from './Nav.js';
import Title from './Title.js';
import Footer from './Footer.js';
import Home from './Home.js';
import About from './About.js';
import Parks from './Parks.js';
import States from './States.js';

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
            <Route path="/parks" component={Parks}/>
            <Route path="/states" component={States}/>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
