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
import CustomCard from './CustomCard.js'

class VisitorCenters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      requestFailed: false,
      vcDetail: [],
    }
  };

  componentDidMount() {
    console.log('I was triggered during componentDidMount')
    //https://developer.nps.gov/api/v1/parks?limit=519&fields=contacts&api_key=ZpESFe8R2hqjdYKmaXyiblZZeaKuYhW1l8q6WmO2
    fetch('/api/parks')
      .then((response) => {
        return response.json()
      }).then((responseJson) => {
        let details = responseJson.map((detail) => {
          return(
            <div key={detail.parkCode}>
            <Col lg="4" md="6" sm="12">
              
              <Card top width="100%" className ="text-center">
                <Link to={`/parks/${detail.parkCode}`}>
                  <CardImg top width="100%" src={detail.imageUrl} alt="ok" />
                </Link>
                <CardBody>
                  <CardTitle className="text-center">{detail.fullName}</CardTitle>
                  <CardText> 
                  <b>State(s)</b>: {detail.states} <br/>
                  <b>Park Code</b>: {detail.parkCode} <br/>
                  <b>Designation</b>: {detail.designation} <br/>
                  <b>Visitor Center(s)</b>: fdksjf <br/>
                  <b>url</b>: <a href={detail.imageUrl}>{detail.url}</a> <br/>
                  </CardText>
                </CardBody>
              </Card>
              </Col>
              </div>
          )
        })
        this.setState({vcDetail: details, requestFailed: true,})
      })
      console.log('ended');
      console.log(this.state);
  }

  render() {
    console.log('I was triggered during render')
    console.log(this.state.vcDetail)
    if (!this.state.requestFailed) return <p>Failed request</p>
    if (!this.state.vcDetail) return <p>Loading</p>
    return (
      <div>
      <Container className="bg-faded p-4 my-4">
        <hr className="divider"/>
        <h2 className="text-center text-lg text-uppercase my-0">Visitor Centers</h2>
        <hr className="divider"/>
        <Row>
            {this.state.vcDetail}
        </Row>
      </Container>
      </div>
    )
  }
}

export default VisitorCenters
