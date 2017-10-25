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
import VisitorCenterDetail from './VisitorCenterDetail.js';

const yose = require('./img/visitorcenters/yosemite.png');

function VisitorCenterCard(props) {
  return (
    <Card className="text-center">
      <Link to={`/states/${props.title}`}>
        <CardImg top width="100%" src={props.img} alt={props.alt} />
      </Link>
      <CardBody>
        <CardTitle>{props.title}</CardTitle>
        <CardText>
          <b>Park: </b><a href={props.parkUrl}>{props.parkName}</a><br />
          <b>State: </b><a href={props.stateUrl}>{props.stateName}</a><br />
          <b>Address: </b>{props.address}<br />
          <b>Phone Number: </b>{props.phone}<br />
          <b>Operating Hours: </b>{props.hours}
        </CardText>
      </CardBody>
    </Card>
  );
}

function VisitorCenterLanding(props) {
  return (
    <div>
      <Container className="bg-faded p-4 my-4">
        <hr className="divider"/>
        <h2 className="text-center text-lg text-uppercase my-0">Visitor Centers</h2>
        <hr className="divider"/>
        <Row>
          <Col lg="4" md="6" sm="12">
            <VisitorCenterCard img={yose} alt="Yosemite Valley Visitor Center Image" 
              title="Yosemite Valley Visitor Center" parkUrl="http://www.swetravels.me/parks/yosemite.html"
              parkName="Yosemite" stateUrl="http://www.swetravels.me/states/california.html"
              stateName="CA" address="9035 Village Dr, Yosemite Valley, CA 95389" 
              phone="(209) 372-0200" hours="9AM-5PM"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default function VisitorCenters(props) {
  return (
    <div>
      <Route exact path="/visitorcenters" component={VisitorCenterLanding}/>
      <Route path="/visitorcenters/:id" component={VisitorCenterDetail}/>
    </div>
  )
}
