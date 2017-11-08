import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import NotFound from './NotFound.js';

class ParkDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      data: []
    }
  }

  componentDidMount() {
    fetch('http://api.sweet-travels.appspot.com/api/parks/' + this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        })
      })
      .catch(() => {
        this.setState({nothingFound: true});
      })
  }

  render() {
    if (this.state.nothingFound) {
      return (
        <NotFound/>
      )
    }

    const stateList = String(this.state.data.states).split(",");
    const stateLinks = stateList.map((s) => {
      if (stateList[stateList.length-1] === s) {
        return (
          <a><Link to={`/states/${s}`}>{s}</Link></a>
        )
      }
      return (
      <a><Link to={`/states/${s}`}>{s}</Link>, </a>
      )
    })

    const campgroundList = String(this.state.data.campgrounds).split(", ");
    const campgroundLinks = campgroundList.map((c) => {
      if (this.state.data.campgrounds!=="None") {
        if (campgroundList[campgroundList.length-1] === c) {
          return (
            <a><Link to={`/campgrounds/${c}`}>{c}</Link></a>
          )
        }
        return (
        <a><Link to={`/campgrounds/${c}`}>{c}</Link>, </a>
        )
      }
      return <a>{this.state.data.campgrounds}</a>
    })

    const latLong = String(this.state.data.latLong).split(", long:");
    const lat = latLong[0].replace("lat:", "");

    return (
      <div>
        <Container className="bg-faded p-4 my-4">
          <hr className="divider"/>
          <h2 className="text-center text-lg text-uppercase my-0">
            <strong> {this.state.data.fullName}</strong>
          </h2>
          <hr className="divider"/>
          <center><img width="50%" src={this.state.data.imageUrl} alt="Image of park"/></center>
          <p><b>Park Code:</b> {this.state.data.parkCode}</p>
          <p><b>Designation:</b> {this.state.data.designation}</p>
          <p><b>State(s):</b> {stateLinks}</p>
          <p><b>Latitude:</b> {lat}</p>
          <p><b>Longitude:</b> {latLong[1]}</p>
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

export default ParkDetail
