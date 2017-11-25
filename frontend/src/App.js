import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './Nav.js';
import Title from './Title.js';
import Footer from './Footer.js';
import Home from './Home.js';
import About from './About.js';
// import Parks from './Parks.js';
import ParksLanding from './ParksLanding.js';
// import Campgrounds from './Campgrounds.js';
import CampgroundsLanding from './CampgroundsLanding.js';
import VisitorCenters from './VisitorCenters.js';
// import States from './States.js';
import StatesLanding from './StatesLanding.js';
import ParkDetail from './ParkDetail.js';
import VisitorCenterDetail from './VisitorCenterDetail.js';
import NotFound from './NotFound.js';
import StateDetail from './StateDetail.js';
import Search from './Search.js';

// Renders the entire app.
class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <Title />
          <NavBar />
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route path='/parks' component={ParksLanding} />
              <Route path='/campgrounds' component={CampgroundsLanding} />
              <Route path='/visitorcenters' component={VisitorCenters} />
              <Route path='/states' component={StatesLanding} />
              <Route path='parks/:id' component={ParkDetail} />
              <Route path='visitorcenters/:id' component={VisitorCenterDetail} />
              <Route path='states/:id' component={StateDetail} />
              <Route path='/search' component={Search} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
