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
      return (
        <Col lg="4" md="6" sm="12">
          <Card className ="text-center">
            <Link to={`/parks/${d.name}`}>
              <CardImg top width="100%" src={d.imageUrl} alt="ok" />
            </Link>
            <CardBody>
              <CardTitle className="text-center">{d.fullName}</CardTitle>
              <CardText>
              <b>State(s)</b>: {d.states} <br/>
              <b>Park Code</b>: {d.parkCode} <br/>
              <b>Designation</b>: {d.designation} <br/>
              <b>Visitor Center(s)</b>: fdksjf <br/>
              <b>url</b>: <a href={d.url}>{d.url}</a> <br/>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      )
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
