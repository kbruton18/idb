import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './Nav.js';
import Title from './Title.js';
import Footer from './Footer.js';
import Home from './Home.js';
import About from './About.js';
import ParksLanding from './ParksLanding.js';
import CampgroundsLanding from './CampgroundsLanding.js';
import VisitorCentersLanding from './VisitorCentersLanding.js';
import StatesLanding from './StatesLanding.js';
import ParkDetail from './ParkDetail.js';
import CampgroundDetail from './CampgroundDetail.js';
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
              <Route exact path='/parks' component={ParksLanding} />
              <Route exact path='/campgrounds' component={CampgroundsLanding} />
              <Route exact path='/visitorcenters' component={VisitorCentersLanding} />
              <Route exact path='/states' component={StatesLanding} />
              <Route path='/parks/:id' component={ParkDetail} />
              <Route path='/campgrounds/:id' component={CampgroundDetail} />
              <Route path='/visitorcenters/:id' component={VisitorCenterDetail} />
              <Route path='/states/:id' component={StateDetail} />
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
