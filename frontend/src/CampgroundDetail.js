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
      <Card>
        <CardImg top width="75%" src={this.state.data.imageUrl} alt="campground URL" />
        <CardBody>
          <CardText>
            <b>Park Code: </b>{this.state.data.parkCode}<br />
            <b>State(s): </b>{this.state.data.states}<br />
            <b>Description: </b>{this.state.data.description}<br />
            <b>Regulations Overview: </b>{this.state.data.regulationsOverview}<br />
            <b>Regulations URL: </b><a href={this.state.data.regulationsUrl}>{this.state.data.regulationsUrl}</a><br />
            <b>Wheelchair Access: </b>{this.state.data.wheelchairAccess}<br />
            <b>Internet Info: </b>{this.state.data.internetInfo}<br />
            <b>Total Sites: </b>{this.state.data.totalSites}<br />
            <b>Directions Info: </b>{this.state.data.directionsInfo}<br />
            <b>Directions URL:</b> <a href={this.state.data.directionsUrl}>{this.state.data.directionsUrl}</a>
          </CardText>
        </CardBody>
      </Card>
    );
  }
}

export default CampgroundDetail