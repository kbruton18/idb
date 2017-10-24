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
} from 'reactstrap';

const ca = require('./img/states/california.jpg');

function StateCard(props) {
  return (
    <Card body className="text-center">
      <CardImg top width="100%" src={props.img} alt={props.alt} />
      <CardBody>
        <CardTitle>{props.title}</CardTitle>
        <CardText>
          <b>Abbreviations: </b>{props.abbreviation}<br />
          <b>Nickname(s): </b>{props.nickname}<br />
          <b>Timezone: </b>{props.timezone}<br />
          <b>Capital: </b>{props.capital}<br />
          <b>National Park(s):</b> <a href={props.parkUrl}>{props.parkName}</a>
        </CardText>
      </CardBody>
    </Card>
  );
}

export default function States(props) {
  return (
    <div>
      <Container className="bg-faded p-4 my-4">
        <hr className="divider"/>
        <h2 className="text-center text-lg text-uppercase my-0">States</h2>
        <hr className="divider"/>
        <Row>
          <Col lg="4" md="6" sm="12">
            <StateCard img={ca} alt="California Flag" title="California" abbreviation="CA, Calif., Cal." 
              nickname="The Golden State" timezone="Pacific (UTC −8/−7)" 
              capital="Sacramento" parkUrl="http://www.swetravels.me/parks/yosemite.html"
              parkName="Yosemite"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
