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
  CardSubtitle,
  CardFooter
} from 'reactstrap';

const y = require('./img/parks/yosemite.jpg');

function AboutPark(props) {
  return (
    <Card>
      <CardImg top width="100%" src={props.park.imageSrc} alt={props.park.imageCaption} />
      <CardBody>
        <CardTitle className="text-center">{props.park.name}</CardTitle>
        <CardSubtitle className="text-center text-muted"></CardSubtitle>
        <CardText> <b>State(s)</b>: {props.park.state}</CardText>
        <CardText> <b>Park Code</b>: {props.park.code}</CardText>
        <CardText> <b>Designation</b>: {props.park.desg} </CardText>
        <CardText> <b>Visitor Center(s)</b>: {props.park.visit} </CardText>
        <CardText> <b>url</b>: {props.park.url} </CardText>
      </CardBody>
      <CardFooter className="text-muted">
      </CardFooter>
    </Card>
  )
}

class Cards extends Component {
  render() {
    const yosemite = {"name": "Yosemite", "state": "CA", "code": "yose", "desg": "National Park", "visit": "Yosemite Valley Visitor Center", "url": "https://www.nps.gov/yose/index.htm", imageSrc: y, imageCaption: "Derek"};
  return (
    <Container className="bg-faded p-4 my-4">
      <hr className="divider"/>
      <h2 className="text-center text-lg text-uppercase my-0">
        parks
      </h2>
      <hr className="divider"/>
      <Row>
        <Col lg="4" md="6" sm="12">
          <AboutPark park={yosemite}/>
        </Col>
      </Row>
    </Container>
    );
  }
}

const Parks = (props) => (
    <div> 
      <Cards/>
    </div>
  )

export default Parks
