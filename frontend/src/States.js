import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Button, ButtonGroup, Container, Row, Col, Card,
         CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import StateDetail from './StateDetail.js';
import SortDropdown from './SortDropdown.js';
import {processFetch, processPromises} from './Filter.js';

class StateCard extends Component {
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
    fetch('http://sweet-travels.appspot.com/api/states')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        });
      });
    let filterPromises = [];
    filterPromises.push(processFetch('https://sweet-travels.appspot.com/api/states', 'timeZone'));

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
    const pageOfStates = version.slice((this.state.page - 1) * 9, this.state.page * 9);

    // Creates all the cards for each state.
    const state = pageOfStates.map((d) => {
      // There can be multiple parks per state or none. In the database this is a comma
      // separated string so we need to split it up so we can link each individually.
      const parkList = String(d.nationalParks).split(',');
      const parkLinks = parkList.map((p) => {
        if (d.nationalParks !== 'None') {
          if (parkList[parkList.length - 1] === p) {
            return (
              <span><Link to={`/parks/${p}`}>{p}</Link></span>
            );
          }
          return (
            <span><Link to={`/parks/${p}`}>{p}</Link>, </span>
          );
        }
        return <span>{d.nationalParks}</span>;
      });

      // Returns information for each card that we plan to render.
      return (
        <Col lg='4' md='6' sm='12'>
          <Card className='text-center'>
            <Link to={`/states/${d.abbreviations}`}>
              <CardImg top width='100%' height='250px' src={d.imageUrl} alt='State flag' />
            </Link>
            <CardBody>
              <CardTitle className='text-center'>{d.name}</CardTitle>
              <CardText>
                <b>Abbreviations: </b>{d.abbreviations}<br />
                <b>Nickname(s): </b>{d.nicknames}<br />
                <b>Capital: </b>{d.capital}<br />
                <b>Timezone: </b>{d.timeZone}<br />
                <b>National Park(s):</b> {parkLinks}
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
          {state}
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

export default function States (props) {
  return (
    <div>
      <Route exact path='/states' component={StateCard} />
      <Route path='/states/:id' component={StateDetail} />
    </div>
  );
}
