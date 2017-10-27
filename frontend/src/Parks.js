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
import ParkDetail from './ParkDetail.js';

class ParkCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://sweet-travels.appspot.com/api/parks')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        })
      })
  }

  render() {
    const test = this.state.data.map((d) => {
      var x = d.campgrounds
      var listCampgrounds = x.split(',')

      return listCampgrounds[0] != "N/A" ? (
        <Col lg="4" md="6" sm="12">
          <Card className ="text-center">
            <Link to={`/parks/${d.parkCode}`}>
              <CardImg top width="100%" src={d.imageUrl} alt="parks image" />
            </Link>
            <CardBody>
              <CardTitle className="text-center">{d.fullName}</CardTitle>
              <CardText>
              <b>State(s)</b>: {d.states} <br/>
              <b>Park Code</b>: {d.parkCode} <br/>
              <b>Designation</b>: {d.designation} <br/>
              <b>Campgrounds(s)</b>: <Link to={`/campgrounds/${listCampgrounds[0]}`}>{listCampgrounds[0]}</Link> <br/>
              <b>url</b>: <a href={d.url}>{d.url}</a> <br/>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      )
      :
      (
        <Col lg="4" md="6" sm="12">
          <Card className ="text-center">
            <Link to={`/parks/${d.parkCode}`}>
              <CardImg top width="100%" src={d.imageUrl} alt="parks image" />
            </Link>
            <CardBody>
              <CardTitle className="text-center">{d.fullName}</CardTitle>
              <CardText>
              <b>State(s)</b>: {d.states} <br/>
              <b>Park Code</b>: {d.parkCode} <br/>
              <b>Designation</b>: {d.designation} <br/>
              <b>Campgrounds(s)</b>: {d.campgrounds} <br/>
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
        parks
      </h2>
      <hr className="divider"/>
      <Row>
        {test}
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
