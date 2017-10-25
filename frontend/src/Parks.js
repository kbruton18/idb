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
      data: []
    }
  }

  componentDidMount() {
    fetch('https://developer.nps.gov/api/v1/parks?parkCode=yose&api_key=ZpESFe8R2hqjdYKmaXyiblZZeaKuYhW1l8q6WmO2')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson['data']
        })
      })
  }

  render() {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log(this.state.data);
    const test = this.state.data.map((d) => {
      return (
        <Card className ="text-center">
          <Link to={`/parks/${d.name}`}>
            <CardImg top width="100%" src={y} alt="ok" />
          </Link>
          <CardBody>
            <CardTitle className="text-center">{d.name}</CardTitle>
            <CardText> 
            <b>State(s)</b>: {d.states} <br/>
            <b>Park Code</b>: {d.parkCode} <br/>
            <b>Designation</b>: {d.designation} <br/>
            <b>Visitor Center(s)</b>: fdksjf <br/>
            <b>url</b>: <a href={d.url}>{d.url}</a> <br/>
            </CardText>
          </CardBody>
        </Card>
        )
    })
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
          {test}
        </Col>
      </Row>
    </Container>
    );
  }
}

const Parks = (props) => (
    <div> 
      <Route exact path="/parks" component={ParkCard}/>    
      <Route path="/parks/:id" component={ParkDetail}/>    
    </div>
  )

export default Parks
