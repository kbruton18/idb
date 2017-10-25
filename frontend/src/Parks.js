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

const y = require('./img/parks/yosemite.jpg');

// class Parks extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       id: props.params.id, 
//       data: []
//     }
//   }

//   componentDidMount() {
//     fetch('https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=ZpESFe8R2hqjdYKmaXyiblZZeaKuYhW1l8q6WmO2')
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           data: responseJson
//         })
//       })
//   }

//   render() {
//     const p = this.state.data.data.map((parks) => {
//       return (
//           <a href="#" className="list-parks" key = {parks.name}> 
//           {parks.name}
//           </a>
//         )
//     });
//     return (
//       <div>
//         <h1>Parks page</h1>
//         <div className= "list-parks">
//           {p}
//         </div>
//       </div>
//     );
//   }
// }

// export default Parks

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
      <Route exact path="/parks" component={Cards}/>    
      <Route path="/parks/:id" component={ParkDetail}/>    
    </div>
  )

export default Parks
