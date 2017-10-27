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
  }

  render() {
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
        <p><b>National Park:</b> {this.state.data.nationalParks}</p>
        <p><b>Campground:</b> {this.state.data.campgrounds}</p>
        <p><b>Weather Info:</b> {this.state.data.weatherInfo}</p>
        <p><b>Website:</b> <a href={this.state.data.url}>{this.state.data.url}</a></p>
      </Container>
      </div>
    );
  }
}

export default StateDetail
