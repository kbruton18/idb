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
import CampgroundDetail from './CampgroundDetail.js';

class CampgroundCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://sweet-travels.appspot.com/api/campgrounds')
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
            <Link to={`/campgrounds/${d.name}`}>
              <CardImg top width="100%" src={d.imageUrl} alt="campground image" />
            </Link>
            <CardBody>
              <CardTitle className="text-center">{d.name}</CardTitle>
              <CardText>
              <b>Total Sites</b>: {d.totalSites} <br/>
              <b>Associated Park</b>: <Link to={`/parks/${d.parkCode}`}> {d.parkCode} </Link> <br/>
              <b>Description</b>: {d.description} <br/>
              <b>Regulations</b>: <a href={d.regulationsUrl}>{d.regulationsUrl}</a> <br/>
              <b>Directions</b>: <a href={d.directionsUrl}>{d.directionsUrl}</a>
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
        Campgrounds
      </h2>
      <hr className="divider"/>
      <Row>
        {test}
      </Row>
    </Container>
    );
  }
}

const Campgrounds = (props) => (
    <div>
      <Route exact path="/campgrounds" component={CampgroundCard}/>
      <Route path="/campgrounds/:id" component={CampgroundDetail}/>
    </div>
  )

export default Campgrounds
