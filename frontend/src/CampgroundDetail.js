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

class CampgroundDetail extends Component {

  constructor({match}) {
    super(match);
    this.state = {
      id: match.params.id, 
      data: []
    }
  }

  componentDidMount() {
    fetch('http://sweet-travels.appspot.com/api/campgrounds/' + this.state.id)
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
        <center><img width="50%" src={this.state.data.imageUrl} alt="campgrounds image" /></center>
        <p><b>Park Code:</b> {this.state.data.parkCode}</p>
        <p><b>State(s):</b> {this.state.data.states}</p>
        <p><b>Description:</b> {this.state.data.description}</p>
        <p><b>Regulations Overview:</b> {this.state.data.regulations}</p>
        <p><b>Regulations URL:</b> <a href={this.state.data.regulationsUrl}>{this.state.data.regulationsUrl}</a></p>
        <p><b>Wheelchair Access:</b> {this.state.data.wheelchairAccess}</p>
        <p><b>Internet Info:</b> {this.state.data.internetInfo}</p>
        <p><b>Directions Info:</b> {this.state.data.directionsInfo}</p>
        <p><b>Directions URL:</b> <a href={this.state.data.directionsUrl}>{this.state.data.directionsUrl}</a></p>
      </Container>
      </div>
    );
  }
}

export default CampgroundDetail