import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Row } from 'reactstrap';
import SortDropdown from './SortDropdown.js';
import {processPromises} from './Filter.js';

export default class GenericLanding extends Component {
  constructor (props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.dataUrl = props.dataUrl;
    this.fetchPromises = props.fetchPromises;
    this.ascendingSortFunction = props.ascendingSortFunction;
    this.descendingSortFunction = props.descendingSortFunction;
    this.cardFunction = props.cardFunction;
    this.state = {
      title: props.title,
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
    fetch(this.dataUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        });
      });

    // TODO Generically fetch and process filter data
    // I want this to be an array of bound but not called processFetch's

    processPromises.call(this, this.fetchPromises.map((f) => f()));
  }

  render () {
    var version = [];
    Object.assign(version, this.state.data);

    if (this.state.filter) {
      version = this.state.filter.filterDataArr(version);
    }

    // TODO Generically sort...

    if (this.state.sortType === 'Ascending') {
      // If we are sorting by ascending name
      version.sort(this.ascendingSortFunction);
    } else if (this.state.sortType === 'Descending') {
      // If we are sorting by descending name
      version.sort(this.descendingSortFunction);
    }

    // For pagination, we display 12 card instances at a time.
    const displayPage = version.slice((this.state.page - 1) * 12, this.state.page * 12);

    // TODO Creates all the cards, with some function
    const cards = displayPage.map(this.cardFunction);

    // TODO THIS IS GARBAGE
    // Does calculations for how many pagination page buttons we need.
    const pages = Math.ceil(version.length / 12);
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
          {this.state.title}
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
