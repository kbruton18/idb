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

class VisitorCenterCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://sweet-travels.appspot.com/api/visitorcenters')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        })
      })
  }

  render() {
    const test = this.state.data.map((d) => {
      if (d.website.length !== 0) {
        return (
          <Col lg="4" md="6" sm="12">
            <Card className ="text-center">
              <Link to={`/visitorcenters/${d.name}`}>
                <CardImg top width="100%" src={d.imageUrl} alt="visitor center image" />
              </Link>
              <CardBody>
                <CardTitle className="text-center">{d.name}</CardTitle>
                <CardText>
                <b>Park</b>: {d.parkCode} <br/>
                <b>State(s)</b>: {d.states} <br/>
                <b>Lat/Long</b>: {d.latLong} <br/>
                <b>Directions</b>: {d.directionsUrl} <br/>
                <b>Website</b>: <a href={d.website}>{d.website}</a>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        )
      }
    })

    return (
      <Container className="bg-faded p-4 my-4">
      <hr className="divider"/>
      <h2 className="text-center text-lg text-uppercase my-0">
        Visitor Centers
      </h2>
      <hr className="divider"/>
      <Row>
        {test}
      </Row>
    </Container>
    );
  }
}

const VisitorCenters = (props) => (
    <div>
      <Route exact path="/visitorcenters" component={VisitorCenterCard}/>
      <Route path="/visitorcenters/:id" component={VisitorCenterDetail}/>
    </div>
  )

export default VisitorCenters
