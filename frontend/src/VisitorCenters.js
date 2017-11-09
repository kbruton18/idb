import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, ButtonGroup, Container, Row, Col, Card,
         CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import VisitorCenterDetail from './VisitorCenterDetail.js';
import SortDropdown from './SortDropdown.js';

class VisitorCenterCard extends Component {

  constructor (props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.state = {
      data: [],
      sortType: '',
      page: 1
    };
  }

  // Resets all the sorting to go back to the original ordering.
  reset () {
    this.setState({
      sortType: ''
    });
  }

  // Sets the sort type.
  sort (type) {
    this.setState({
      sortType: type
    });
  }

  // Sets the page.
  setPage (page) {
    this.setState({
      page: page
    });
  }

  // Fetch json data from .../visitorcenters
  componentDidMount () {
    fetch('http://sweet-travels.appspot.com/api/visitorcenters')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        });
      });
  }

  render () {
    var version = [];
    Object.assign(version, this.state.data);
    if (this.state.sortType === 'Ascending') {
      // If we are sorting by ascending name
      version.sort(function (first, second) {
        if (first.name < second.name) return -1;
        if (first.name > second.name) return 1;
        return 0;
      });
    } else if (this.state.sortType === 'Descending') {
      // If we are sorting by descending name
      version.sort(function (first, second) {
        if (first.name < second.name) return 1;
        if (first.name > second.name) return -1;
        return 0;
      });
    } else {
      // Otherwise keep the original order
      version = this.state.data;
    }

    // For pagination, we display 9 card instances at a time.
    const pageOfVisitorCenters = version.slice((this.state.page - 1) * 9, this.state.page * 9);

    // Creates all the cards for each visitor center.
    const center = pageOfVisitorCenters.map((d) => {
      // In the database latLong looks like: {lat:######, lng:######}
      // Breaking it apart to enhance display. If the database does
      // not contain it display "N/A" for both.
      const latLong = String(d.latLong).split(', lng:');
      var lat = String(latLong[0]).replace('{lat:', '');
      var long = String(latLong[1]).replace('}', '');
      if (lat.length === 0) {
        lat = "N/A";
        long = "N/A";
      }

      // Checks to see if there is a url to link
      const directionUrlLink = () => {
        if (d.directionsUrl !== 'None') {
          return (<a href={d.directionsUrl}>{d.directionsUrl}</a>);
        }
        return <a>{d.directionsUrl}</a>;
      };

      // Returns information for each card that we plan to render.
      return (
        <Col lg='4' md='6' sm='12'>
          <Card className='text-center'>
            <Link to={`/visitorcenters/${d.name}`}>
              <CardImg top width='100%' height='250px' src={d.imageUrl} alt='visitor center' />
            </Link>
            <CardBody>
              <CardTitle className='text-center'>{d.name}</CardTitle>
              <CardText>
                <b>Park</b>: <Link to={`/parks/${d.parkCode}`}>{d.parkCode}</Link><br />
                <b>State</b>: <Link to={`/states/${d.states}`}>{d.states}</Link><br />
                <b>Latitude</b>: {lat}<br />
                <b>Longitude</b>: {long}<br />
                <b>Directions</b>: {directionUrlLink()}<br />
                <b>Website</b>: <a href={d.website}>{d.website}</a>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      );
    });

    // Does calculations for how many pagination page buttons we need.
    const pages = Math.ceil(version.length / 9);
    const pageArray = Array.apply(null, Array(pages)).map(function (_, i) { return i + 1; });
    const pageButtons = pageArray.map((d) => {
      return (
        <Button onClick={() => this.setPage(d)}>{d}</Button>
      );
    });

    // Returns the entire visitor centers page.
    return (
      <Container className='bg-faded p-4 my-4'>
        <hr className='divider' />
        <h2 className='text-center text-lg text-uppercase my-0'>
        Visitor Centers
      </h2>
        <hr className='divider' />
        <form className='form-inline'>
          <Button onClick={this.reset}>Reset</Button>
          <SortDropdown sortFunction={this.sort.bind(this)} />
        </form>
        <Row>
          {center}
        </Row>
        <Row>
          <ButtonGroup className='center'>
            <Button onClick={() => this.setPage(this.state.page === 1 ? 1 : (this.state.page - 1))}>Previous</Button>
            {pageButtons}
            <Button onClick={() => this.setPage(this.state.page === pageButtons.length ? pageButtons.length : (this.state.page + 1))}>Next</Button>
          </ButtonGroup>
        </Row>
      </Container>
    );
  }
}

export default function VisitorCenters (props) {
  return (
    <div>
      <Route exact path='/visitorcenters' component={VisitorCenterCard} />
      <Route path='/visitorcenters/:id' component={VisitorCenterDetail} />
    </div>
  );
}

