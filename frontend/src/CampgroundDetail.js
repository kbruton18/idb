import React, {Component} from 'react';
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
import CustomCard from './CustomCard.js';
import NotFound from './NotFound.js';

class CampgroundDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      data: []
    }
  }

  componentDidMount() {
    fetch('http://sweet-travels.appspot.com/api/campgrounds/' + this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          console.log(responseJson);
          this.setState({
            data: responseJson
          })
        } else {
          this.setState({nothingFound: true});
        }
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
    return (
      <div>
      <Container className="bg-faded p-4 my-4">
        <hr className="divider"/>
        <h2 className="text-center text-lg text-uppercase my-0">
           <strong> {this.state.data.name}</strong>
        </h2>
        <hr className="divider"/>
        <center><img width="50%" src={this.state.data.imageUrl} alt="campgrounds image" /></center>
        <p><b>Park Code:</b> <Link to={`/parks/${this.state.data.parkCode}`}> {this.state.data.parkCode} </Link></p>
        <p><b>State(s):</b> <Link to={`/states/${this.state.data.states}`}> {this.state.data.states}</Link></p>
        <p><b>Description:</b> {this.state.data.description}</p>
        <p><b>Directions Info:</b> {this.state.data.directionsInfo}</p>
        <p><b>Directions URL:</b> <a href={this.state.data.directionsUrl}>{this.state.data.directionsUrl}</a></p>
        <p><b>Regulations Overview:</b> {this.state.data.regulations}</p>
        <p><b>Regulations URL:</b> <a href={this.state.data.regulationsUrl}>{this.state.data.regulationsUrl}</a></p>
        <p><b>Wheelchair Access:</b> {this.state.data.wheelchairAccess}</p>
        <p><b>Internet Info:</b> {this.state.data.internetInfo}</p>
      </Container>
      </div>
    );
  }
}

export default CampgroundDetail
