import React, { Component } from 'react';
import {
  Link,
  Route
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap';
import NotFound from './NotFound.js';

class StateDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      data: []
    }
  }

  componentDidMount() {
    fetch('http://api.sweet-travels.appspot.com/api/states/' + this.state.id)
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

    const parkList = String(this.state.data.nationalParks).split(",");
    const parkLinks = parkList.map((p) => {
      if (this.state.data.nationalParks!="No national park in this state.") {
        if (parkList[parkList.length-1] === p) {
          return (
            <a><Link to={`/parks/${p}`}>{p}</Link></a>
          )
        }
        return (
        <a><Link to={`/parks/${p}`}>{p}</Link>, </a>
        )
      }
      return <a>{this.state.data.nationalParks}</a>
    })

    const campgroundList = String(this.state.data.campgrounds).split(",");
    const campgroundLinks = campgroundList.map((c) => {
      if (this.state.data.campgrounds!="N/A") {
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

    const updatedWebsite = "http://www." + this.state.data.url;

    return (
      <div>
        <Container className="bg-faded p-4 my-4">
        <hr className="divider"/>
        <h2 className="text-center text-lg text-uppercase my-0">
           <strong> {this.state.data.name}</strong>
        </h2>
        <hr className="divider"/>
        <center><img width="50%" src={this.state.data.imageUrl} alt="parks image" /></center>
        <p><b>Abbreviations:</b> {this.state.data.abbreviations}</p>
        <p><b>Nicknames:</b> {this.state.data.nicknames}</p>
        <p><b>Time Zone:</b> {this.state.data.timeZone}</p>
        <p><b>Governor:</b> {this.state.data.governor}</p>
        <p><b>Capital:</b> {this.state.data.capital}</p>
        <p><b>Largest City:</b> {this.state.data.largestCity}</p>
        <p><b>Total Population:</b> {this.state.data.totalPopulation}</p>
        <p><b>Total Area:</b> {this.state.data.totalArea}</p>
        <p><b>Median Income:</b> {this.state.data.medianIncome}</p>
        <p><b>National Park(s):</b> {parkLinks}</p>
        <p><b>Campground(s):</b> {campgroundLinks}</p>
        <p><b>Weather Info:</b> {this.state.data.weatherInfo}</p>
        <p><b>Website:</b> <a href={updatedWebsite}>{updatedWebsite}</a></p>
      </Container>
      </div>
    );
  }
}

export default StateDetail
