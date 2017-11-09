import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import NotFound from './NotFound.js';

class ParkDetail extends Component {

  constructor (props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      data: []
    };
  }

  // Fetch json data from .../parks/ID
  // Catch if there is no response, this means bad URL
  componentDidMount () {
    fetch('http://api.sweet-travels.appspot.com/api/parks/' + this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        });
      })
      .catch(() => {
        this.setState({nothingFound: true});
      });
  }

  render () {
    // If bad URL error was found, return NotFound page
    if (this.state.nothingFound) {
      return (
        <NotFound />
      );
    }

    // There can be multiple states per park. In the database this is a comma
    // separated string so we need to split it up so we can link each individually.
    const stateList = String(this.state.data.states).split(',');
    const stateLinks = stateList.map((s) => {
      if (stateList[stateList.length - 1] === s) {
        return (
          <span><Link to={`/states/${s}`}>{s}</Link></span>
        );
      }
      return (
        <span><Link to={`/states/${s}`}>{s}</Link>, </span>
      );
    });

    // There can be multiple campgrounds per park or none. In the database this is a 
    // comma separated string so we need to split it up so we can link each individually.
    const campgroundList = String(this.state.data.campgrounds).split(', ');
    const campgroundLinks = campgroundList.map((c) => {
      if (this.state.data.campgrounds !== 'None') {
        if (campgroundList[campgroundList.length - 1] === c) {
          return (
            <span><Link to={`/campgrounds/${c}`}>{c}</Link></span>
          );
        }
        return (
          <span><Link to={`/campgrounds/${c}`}>{c}</Link>, </span>
        );
      }
      return <a>{this.state.data.campgrounds}</a>;
    });

    // In the database latLong looks like: lat:######, long:######
    // Breaking it apart to enhance display. If the database does
    // not contain it display "N/A" for both.
    const latLong = String(this.state.data.latLong).split(', long:');
    var lat = latLong[0].replace('lat:', '');
    var long = latLong[1];
    if (lat.length === 0) {
      lat = "N/A";
      long = "N/A";
    }

    // Returns the state detail to be rendered.
    return (
      <div>
        <Container className='bg-faded p-4 my-4'>
          <hr className='divider' />
          <h2 className='text-center text-lg text-uppercase my-0'>
            <strong> {this.state.data.fullName}</strong>
          </h2>
          <hr className='divider' />
          <center><img width='50%' src={this.state.data.imageUrl} alt='park' /></center>
          <p><b>Park Code:</b> {this.state.data.parkCode}</p>
          <p><b>Designation:</b> {this.state.data.designation}</p>
          <p><b>State(s):</b> {stateLinks}</p>
          <p><b>Latitude:</b> {lat}</p>
          <p><b>Longitude:</b> {long}</p>
          <p><b>Description:</b> {this.state.data.description}</p>
          <p><b>Campground(s):</b> {campgroundLinks}</p>
          <p><b>Weather Info:</b> {this.state.data.weatherInfo}</p>
          <p><b>Directions Info:</b> {this.state.data.directionsInfo}</p>
          <p><b>Directions URL:</b> <a href={this.state.data.directionsUrl}>{this.state.data.directionsUrl}</a></p>
          <p><b>Website:</b> <a href={this.state.data.url}>{this.state.data.url}</a></p>
        </Container>
      </div>
    );
  }
}

export default ParkDetail;
