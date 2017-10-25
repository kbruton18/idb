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
  CardTitle,
  CardSubtitle,
  CardFooter
} from 'reactstrap';
import ParkDetail from './ParkDetail.js';
import CustomCard from './CustomCard.js';

const y = require('./img/parks/yosemite.jpg');

class ParkCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      states: "",
      parkCode: "",
      url: "",
      desig: ""
    }
  }

  componentDidMount() {
    fetch('https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=ZpESFe8R2hqjdYKmaXyiblZZeaKuYhW1l8q6WmO2')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          name: responseJson['data'][0]['name'],
          states: responseJson['data'][0]['states'],
          parkCode: responseJson['data'][0]['parkCode'],
          url: responseJson['data'][0]['url'],
          desig: responseJson['data'][0]['designation']
        })
      })
  }

  render() {
    const yosemite = {"name": this.state.name, "state": this.state.states, "code": this.state.parkCode, "desg": this.state.designation, "visit": "Yosemite Valley Visitor Center", 
    "url": this.state.url, imageSrc: y, imageCaption: "Derek"};
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

function AboutPark(props) {
  return (
    <Card className ="text-center">
      <Link to={`/parks/${props.park.name}`}>
        <CardImg top width="100%" src={props.park.imageSrc} alt={props.park.imageCaption} />
      </Link>
      <CardBody>
        <CardTitle className="text-center">{props.park.name}</CardTitle>
        <CardText> 
        <b>State(s)</b>: {props.park.state} <br/>
        <b>Park Code</b>: {props.park.code} <br/>
        <b>Designation</b>: {props.park.desg} <br/>
        <b>Visitor Center(s)</b>: {props.park.visit} <br/>
        <b>url</b>: <a href={props.park.url}>{props.park.url}</a> <br/>
        </CardText>
      </CardBody>
    </Card>
  )
}


const Parks = (props) => (
    <div> 
      <Route exact path="/parks" component={ParkCard}/>    
      <Route path="/parks/:id" component={ParkDetail}/>    
    </div>
  )

export default Parks
