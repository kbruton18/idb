import React, { Component } from 'react';
import {
  Link,
  Route
} from 'react-router-dom';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import VisitorCenterDetail from './VisitorCenterDetail.js';

class VisitorCenterCard extends Component {

  constructor(props) {
    super(props);
    this.toggleSort = this.toggleSort.bind(this);
    this.reset = this.reset.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.sortByState = this.sortByState.bind(this);
    this.sortByPark = this.sortByPark.bind(this);
    this.state = {
      data: [],
      sortDropdown: false,
      sortName: false,
      sortState: false,
      sortPark: false
    }
  }

  toggleSort() {
    this.setState({
      sortDropdown: !this.state.sortDropdown
    });
  }

  reset() {
    this.setState({
      sortDropdown: false,
      sortName: false,
      sortState: false,
      sortPark: false
    });
  }

  sortByName() {
    this.setState({
      sortName: true,
      sortState: false,
      sortPark: false
    });
  }

  sortByState() {
    this.setState({
      sortState: true,
      sortName: false,
      sortPark: false
    });
  }

  sortByPark() {
    this.setState({
      sortPark: true,
      sortName: false,
      sortState: false
    });
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
    var version = [];
    Object.assign(version, this.state.data);
    if (this.state.sortName) {
      version.sort(function(first, second) {
        if(first.name < second.name) return -1;
        if(first.name > second.name) return 1;
        return 0;
      });
    } else if(this.state.sortState) {
      version.sort(function(first, second) {
        if(first.states < second.states) return -1;
        if(first.states > second.states) return 1;
        return 0;
      });
    } else if(this.state.sortPark) {
      version.sort(function(first, second) {
        if(first.parkCode < second.parkCode) return -1;
        if(first.parkCode > second.parkCode) return 1;
        return 0;
      });
    } else {
      version = this.state.data;
    }

    const center = version.map((d) => {
      if (d.website.length !== 0) {
        return (
          <Col lg="4" md="6" sm="12">
            <Card className ="text-center">
              <Link to={`/visitorcenters/${d.name}`}>
                <CardImg top width="100%" src={d.imageUrl} alt="visitor center image"/>
              </Link>
              <CardBody>
                <CardTitle className="text-center">{d.name}</CardTitle>
                <CardText>
                <b>Park</b>: <Link to={`/parks/${d.parkCode}`}>{d.parkCode}</Link><br/>
                <b>State</b>: <Link to={`/states/${d.states}`}>{d.states}</Link><br/>
                <b>Lat/Long</b>: {d.latLong}<br/>
                <b>Directions</b>: <a href={d.directionsUrl}>{d.directionsUrl}</a><br/>
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
      <Button onClick={this.reset}>Reset</Button>
      <Dropdown isOpen={this.state.sortDropdown} toggle={this.toggleSort}>
        <DropdownToggle caret>
          Sort By
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={this.sortByName}>Name</DropdownItem>
          <DropdownItem onClick={this.sortByState}>State</DropdownItem>
          <DropdownItem onClick={this.sortByPark}>Park</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Row>
        {center}
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
