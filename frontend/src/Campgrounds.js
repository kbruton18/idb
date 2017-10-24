import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';

const ca = require('./img/states/california.jpg');

function CampgroundCard(props) {
  return (
    <Card className="text-center">
      <CardImg top width="100%" src={props.img} alt={props.alt} />
      <CardBody>
        <CardTitle>{props.title}</CardTitle>
        <CardSubtitle>{props.park}</CardSubtitle>
        <CardText>
          <b>States: </b><a href={props.stateUrl}>{props.stateName}</a><br />
          <b>Number of Sites: </b>{props.numSites}<br />
          <b>Directions: </b><a href={props.directionsUrl}>Directions</a>
        </CardText>
      </CardBody>
    </Card>
  );
}

export default function Campgrounds(props) {
  return (
    <div>
      <Container className="bg-faded p-4 my-4">
        <hr className="divider"/>
        <h2 className="text-center text-lg text-uppercase my-0">Campgrounds</h2>
        <hr className="divider"/>
        <Row>
          <Col lg="4" md="6" sm="12">
            <CampgroundCard img={ca} alt="Picture of Campground" title="Mammoth Campground" 
              park="Yellowstone National Park" stateUrl="http://www.swetravels.me/states/wyoming.html"
              stateName="Wyoming" numSites="85" directionsUrl="https://www.nps.gov/yell/planyourvisit/directions.htm"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
