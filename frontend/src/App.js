import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';
import NavBar from './Nav.js';
import Title from './Title.js';
import Footer from './Footer.js';
import Home from './Home.js';
import About from './About.js';
import Parks from './Parks.js';
import Campgrounds from './Campgrounds.js';
import VisitorCenters from './VisitorCenters.js';
import States from './States.js';
import ParkDetail from './ParkDetail.js';
import VisitorCenterDetail from './VisitorCenterDetail.js';
import StateDetail from './StateDetail.js';
import NotFound from './NotFound.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Title/>
          <NavBar/>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/parks" component={Parks}/>
            <Route path="/campgrounds" component={Campgrounds}/>
            <Route path="/visitorcenters" component={VisitorCenters}/>
            <Route path="/states" component={States}/>
            <Route path="parks/:id" component={ParkDetail}/>
            <Route path="visitorcenters/:id" component={VisitorCenterDetail}/>
            <Route path="states/:id" component={StateDetail}/>
          </div>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
