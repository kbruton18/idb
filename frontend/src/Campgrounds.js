import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, ButtonGroup, Container, Row, Col, Card,
         CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import CampgroundDetail from './CampgroundDetail.js';
import SortDropdown from './SortDropdown.js';
import {processFetch, processPromises} from './Filter.js';

class CampgroundCard extends Component {
  constructor (props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.state = {
      data: [],
      sortType: '',
      page: 1,
      filter: null
    };
  }

  // Resets all the sorting to go back to the original ordering.
  reset () {
    this.setState({
      sortType: ''
    });
    this.state.filter.resetFilter();
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

  // Fetch json data from .../campgrounds
  componentDidMount () {
    fetch('http://sweet-travels.appspot.com/api/campgrounds')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        });
      });
    let filterPromises = [];
    filterPromises.push(processFetch('https://sweet-travels.appspot.com/api/states', 'abbreviations'));
    filterPromises.push(processFetch('https://sweet-travels.appspot.com/api/campgrounds', 'parkName'));

    processPromises.call(this, filterPromises);
  }

  render () {
    var version = [];
    Object.assign(version, this.state.data);

    if (this.state.filter) {
      version = this.state.filter.filterDataArr(version);
    }

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
    }

    // For pagination, we display 9 card instances at a time.
    const pageOfCampgrounds = version.slice((this.state.page - 1) * 9, this.state.page * 9);

    // Creates all the cards for each campground.
    const campground = pageOfCampgrounds.map((d) => {
      // Checks to see if there is a direction URL to link
      const directionUrlLink = () => {
        if (d.directionsUrl !== 'None') {
          return (<a href={d.directionsUrl}>{d.directionsUrl}</a>);
        }
        return <a>{d.directionsUrl}</a>;
      };

      // Checks to see if there is a regulation URL to link
      const regulationUrlLink = () => {
        if (d.regulationsUrl !== 'None') {
          return (<a href={d.regulationsUrl}>{d.regulationsUrl}</a>);
        }
        return <a>{d.regulationsUrl}</a>;
      };

      // Returns information for each card that we plan to render.
      return (
        <Col lg='4' md='6' sm='12'>
          <Card className='text-center'>
            <Link to={`/campgrounds/${d.name}`}>
              <CardImg top width='100%' height='250px' src={d.imageUrl} alt='campground' />
            </Link>
            <CardBody>
              <CardTitle className='text-center'>{d.name}</CardTitle>
              <CardText>
                <b>Total Sites</b>: {d.totalSites}<br />
                <b>Associated Park</b>: <Link to={`/parks/${d.parkCode}`}>{d.parkCode}</Link><br />
                <b>Description</b>: {d.description}<br />
                <b>Regulations URL</b>: {regulationUrlLink()}<br />
                <b>Directions URL</b>: {directionUrlLink()}
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

    let filterButtons;

    if (this.state.filter) {
      filterButtons = this.state.filter.createFilterElem();
    }

    return (
      <Container className='bg-faded p-4 my-4'>
        <hr className='divider' />
        <h2 className='text-center text-lg text-uppercase my-0'>
          Campgrounds
        </h2>
        <hr className='divider' />
        <form className='form-inline'>
          <Button onClick={this.reset}>Reset</Button>
          <SortDropdown sortFunction={this.sort.bind(this)} />
          {filterButtons}
        </form>
        <Row>
          {campground}
        </Row>
        <Row>
          <ButtonGroup className='center'>
            <Button onClick={() => { this.setState({page: Math.max(this.state.page - 1, 1)}); }}>Previous</Button>
            {pageButtons}
            <Button onClick={() => { this.setState({page: Math.min(this.state.page + 1, pages)}); }}>Next</Button>
          </ButtonGroup>
        </Row>
      </Container>
    );
  }
}

export default function Campgrounds (props) {
  return (
    <div>
      <Route exact path='/campgrounds' component={CampgroundCard} />
      <Route path='/campgrounds/:id' component={CampgroundDetail} />
    </div>
  );
}
