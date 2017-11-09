import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, ButtonGroup, Container, Row, Col, Card,
         CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import ParkDetail from './ParkDetail.js';
import SortDropdown from './SortDropdown.js';
import {processFetch, processPromises} from './Filter.js';

class ParkCard extends Component {
  constructor (props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.state = {
      data: [],
      sortType: '',
      filter: null,
      page: 1
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

  // Fetch json data from .../parks
  componentDidMount () {
    fetch('http://sweet-travels.appspot.com/api/parks')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        });
      });

    let p = processFetch('https://sweet-travels.appspot.com/api/states', 'abbreviations');

    processPromises.call(this, [p]);
  }

  render () {
    var version = [];
    Object.assign(version, this.state.data);
    // if we are filtering
    if (this.state.filter) {
      version = this.state.filter.filterDataArr(version);
    }

    if (this.state.sortType === 'Ascending') {
      // If we are sorting by ascending name
      version.sort(function (first, second) {
        if (first.fullName < second.fullName) return -1;
        if (first.fullName > second.fullName) return 1;
        return 0;
      });
    } else if (this.state.sortType === 'Descending') {
      // If we are sorting by descending name
      version.sort(function (first, second) {
        if (first.fullName < second.fullName) return 1;
        if (first.fullName > second.fullName) return -1;
        return 0;
      });
    }

    // For pagination, we display 9 card instances at a time.
    const pageOfParks = version.slice((this.state.page - 1) * 9, this.state.page * 9);

    // Creates all the cards for each park.
    const park = pageOfParks.map((d) => {
      // There can be multiple states per park. In the database this is a comma
      // separated string so we need to split it up so we can link each individually.
      const stateList = String(d.states).split(',');
      const stateLinks = stateList.map((s) => {
        if (stateList[stateList.length - 1] === s) {
          return (
            <span><Link to={`/states/${s}`}>{s}</Link></span>
          );
        }
        return (
          <span><Link to={`/states/${s}`}>{s}</Link>, </span>
        );
      });

      // There can be multiple campgrounds per park or none. In the database this is a
      // comma separated string so we need to split it up so we can link each individually.
      const campgroundList = String(d.campgrounds).split(', ');
      const campgroundLinks = campgroundList.map((c) => {
        if (d.campgrounds !== 'None') {
          if (campgroundList[campgroundList.length - 1] === c) {
            return (
              <a><Link to={`/campgrounds/${c}`}>{c}</Link></a>
            );
          }
          return (
            <a><Link to={`/campgrounds/${c}`}>{c}</Link>, </a>
          );
        }
        return <a>{d.campgrounds}</a>;
      });

      // Returns information for each card that we plan to render.
      return (
        <Col lg='4' md='6' sm='12'>
          <Card className='text-center'>
            <Link to={`/parks/${d.parkCode}`}>
              <CardImg top width='100%' height='250px' src={d.imageUrl} alt='park' />
            </Link>
            <CardBody>
              <CardTitle className='text-center'>{d.fullName}</CardTitle>
              <CardText>
                <b>Park Code</b>: {d.parkCode}<br />
                <b>Designation</b>: {d.designation}<br />
                <b>State(s)</b>: {stateLinks}<br />
                <b>Campgrounds(s)</b>: {campgroundLinks}<br />
                <b>Website</b>: <a href={d.url}>{d.url}</a>
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
          parks
        </h2>
        <hr className='divider' />
        <form className='form-inline'>
          <Button onClick={this.reset}>Reset</Button>
          <SortDropdown sortFunction={this.sort.bind(this)} />
          {filterButtons}
        </form>
        <Row>
          {park}
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

export default function Parks (props) {
  return (
    <div>
      <Route exact path='/parks' component={ParkCard} />
      <Route path='/parks/:id' component={ParkDetail} />
    </div>
  );
}
