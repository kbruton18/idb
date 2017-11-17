import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, ButtonGroup, Container, Row, Col, Card,
         CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import StateDetail from './StateDetail.js';
import SortDropdown from './SortDropdown.js';
import {processFetch, processPromises} from './Filter.js';

class LandingCard extends Component {
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

  // Fetch json data from .../states
  componentDidMount () {
    // TODO Generically fetch and process data
    // fetch('http://sweet-travels.appspot.com/api/states')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     this.setState({
    //       data: responseJson
    //     });
    //   });

    // TODO Generically fetch and process filter data

    // let filterPromises = [];
    // filterPromises.push(processFetch('https://sweet-travels.appspot.com/api/states', 'timeZone'));

    // processPromises.call(this, filterPromises);
  }

  render () {
    var version = [];
    Object.assign(version, this.state.data);

    if (this.state.filter) {
      version = this.state.filter.filterDataArr(version);
    }

    // TODO Generically sort...

    // if (this.state.sortType === 'Ascending') {
    //   // If we are sorting by ascending name
    //   version.sort(function (first, second) {
    //     if (first.name < second.name) return -1;
    //     if (first.name > second.name) return 1;
    //     return 0;
    //   });
    // } else if (this.state.sortType === 'Descending') {
    //   // If we are sorting by descending name
    //   version.sort(function (first, second) {
    //     if (first.name < second.name) return 1;
    //     if (first.name > second.name) return -1;
    //     return 0;
    //   });
    // }

    // For pagination, we display 9 card instances at a time.
    const displayPage = version.slice((this.state.page - 1) * 9, this.state.page * 9);

    // TODO Creates all the cards, with some function
    // const cards = displayPage.map(cardFunction);

    // TODO THIS IS GARBAGE
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

    // Returns the entire states page.
    return (
      <Container className='bg-faded p-4 my-4'>
        <hr className='divider' />
        <h2 className='text-center text-lg text-uppercase my-0'>
          states
        </h2>
        <hr className='divider' />
        <form className='form-inline'>
          <Button onClick={this.reset}>Reset</Button>
          <SortDropdown sortFunction={this.sort.bind(this)} />
          {filterButtons}
        </form>
        <Row>
          {cards}
        </Row>
        <Row>
          {/* TODO ALSO GARBAGE */}
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

export default function GenericLanding (props) {
  return (
    <div>
      {/* TODO CHANGE PATH */}
      <Route exact path='/states' component={LandingCard} />
      <Route path='/states/:id' component={StateDetail} />
    </div>
  );
}
