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
import StateDetail from './StateDetail.js';

class StateCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('http://sweet-travels.appspot.com/api/states')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        })
      })
  }

  render() {
    const states = this.state.data.map((d) => {
      return (
        <Col lg="4" md="6" sm="12">
        <Card className ="text-center">
          <Link to={`/states/${d.abbreviations}`}>
            <CardImg top width="100%" src={d.imageUrl} alt="ok" />
          </Link>
          <CardBody>
            <CardTitle className="text-center">{d.name}</CardTitle>
            <CardText>
            <b>Abbreviations: </b>{d.abbreviations}<br />
            <b>Nickname(s): </b>{d.nicknames}<br />
            <b>Timezone: </b>{d.timeZone}<br />
            <b>Capital: </b>{d.capital}<br />
            <b>National Park(s):</b> <Link to='/parks/${props.nationalParks}'>{d.nationalParks}</Link>
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
        states
      </h2>
      <hr className="divider"/>
      <Row>
          {states}
      </Row>
    </Container>
    );
  }
}

export default function States(props) {
  return (
    <div>
      <Route exact path="/states" component={StateCard}/>
      <Route path="/states/:id" component={StateDetail}/>
    </div>
  )
}
