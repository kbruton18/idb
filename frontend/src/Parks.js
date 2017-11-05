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
    const park = this.state.data.map((d) => {
      const stateList = String(d.states).split(",");
      const stateLinks = stateList.map((s) => {
        if (stateList[stateList.length-1] === s) {
          return (
            <a><Link to={`/states/${s}`}>{s}</Link></a>
          )
        }
        return (
        <a><Link to={`/states/${s}`}>{s}</Link>, </a>
        )
      })

      const campgroundList = String(d.campgrounds).split(", ");
      const campgroundLinks = campgroundList.map((c) => {
        if (d.campgrounds!="N/A") {
          if (campgroundList[campgroundList.length-1] === c) {
            return (
              <a><Link to={`/campgrounds/${c}`}>{c}</Link></a>
            )
          }
          return (
          <a><Link to={`/campgrounds/${c}`}>{c}</Link>, </a>
          )
        }
        return <a>{d.campgrounds}</a>
      })

      return (
        <Col lg="4" md="6" sm="12">
          <Card className ="text-center">
            <Link to={`/parks/${d.parkCode}`}>
              <CardImg top width="100%" src={d.imageUrl} alt="parks image" />
            </Link>
            <CardBody>
              <CardTitle className="text-center">{d.fullName}</CardTitle>
              <CardText>
              <b>Park Code</b>: {d.parkCode}<br/>
              <b>Designation</b>: {d.designation}<br/>
              <b>State(s)</b>: {stateLinks}<br/>
              <b>Campgrounds(s)</b>: {campgroundLinks}<br/>
              <b>Website</b>: <a href={d.url}>{d.url}</a>
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
        {park}
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
