import React, {Component} from 'react';
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
import CustomCard from './CustomCard.js';

class VisitorCenterDetail extends Component {

  constructor({match}) {
    super(match);
    this.state = {
      id: match.params.id, 
      data: []
    }
  }

  componentDidMount() {
    fetch('http://sweet-travels.appspot.com/api/visitorcenters/' + this.state.id)
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
        <center><img width="50%" src={this.state.data.imageUrl} alt="visitor center image" /></center>
        <p><b>Park Code:</b> {this.state.data.parkCode}</p>
        <p><b>State(s):</b> {this.state.data.states}</p>
        <p><b>Description:</b> {this.state.data.description}</p>
        <p><b>Lat/Long:</b> {this.state.data.latLong}</p>
        <p><b>Directions Info:</b> {this.state.data.directionsInfo}</p>
        <p><b>Directions URL:</b> <a href={this.state.data.directionsUrl}>{this.state.data.directionsUrl}</a></p>
        <p><b>Website:</b> <a href={this.state.data.website}>{this.state.data.website}</a></p>
      </Container>
      </div>
    );
  }
}

export default VisitorCenterDetail