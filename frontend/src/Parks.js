import React, { Component } from 'react';
import {
  Link,
  Route
} from 'react-router-dom';
import {
  Button,
  ButtonGroup,
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
import ParkDetail from './ParkDetail.js';
import SortDropdown from './SortDropdown.js';
import {createFilterTerms, filterElemsByTerms, createFilterElem} from './Filter.js';

class ParkCard extends Component {
  constructor (props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.filterBy = this.filterBy.bind(this);
    this.state = {
      data: [],
      states: [],
      sortType: '',
      filterDropdown: false,
      filterBy: false,
      filter: '',
      page: 1
    };
  }

// resets everything to its original state
  reset () {
    this.setState({
      sortType: '',
      filterBy: false,
      filter: ''
    });
  }

// setting sort type for park
  sort (type) {
    this.setState({
      sortType: type
    });
  }

// Action for when a user wants to filter
  toggleFilter () {
    this.setState({
      filterDropdown: !this.state.filterDropdown
    });
  }

// action for filtering, saves what is pressed
  filterBy (event) {
    console.log(event.currentTarget.textContent);
    this.setState({
      filter: event.currentTarget.textContent,
      filterBy: true
    });
  }

// sets current page to what is pressed
  setPage (page) {
    this.setState({
      page: page
    });
  }

  componentDidMount () {
    fetch('http://sweet-travels.appspot.com/api/parks')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        });
      });

    fetch('https://sweet-travels.appspot.com/api/states')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          states: createFilterTerms(responseJson, 'abbreviations').sort()
        });
      });
  }

  render () {
    var version = [];
    Object.assign(version, this.state.data);
    // if we are filtering
    version = filterElemsByTerms(version, 'states', this.state.filter);

    if (this.state.sortType === 'Ascending') {
      // if we are sorting by ascending order
      version.sort(function (first, second) {
        if (first.fullName < second.fullName) return -1;
        if (first.fullName > second.fullName) return 1;
        return 0;
      });
    } else if (this.state.sortType === 'Descending') {
      // if we are sorting by descending order
      version.sort(function (first, second) {
        if (first.fullName < second.fullName) return 1;
        if (first.fullName > second.fullName) return -1;
        return 0;
      });
    }

    // for pagination, we display 9 pages at a time.
    const pageOfParks = version.slice((this.state.page - 1) * 9, this.state.page * 9);

    // for parks with multiple states, we need to split up the list so that we can link each state
    const park = pageOfParks.map((d) => {
      const stateList = String(d.states).split(',');
      const stateLinks = stateList.map((s) => {
        if (stateList[stateList.length - 1] === s) {
          return (
            <a><Link to={`/states/${s}`}>{s}</Link></a>
          );
        }
        return (
          <a><Link to={`/states/${s}`}>{s}</Link>, </a>
        );
      });

      // for parks with multiple campgrounds, we need to split up the list so that we can link each campground
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

      // returns all the information to park that we plan to render
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

    const pages = Math.ceil(version.length / 9);
    const pageArray = Array.apply(null, Array(pages)).map(function (_, i) { return i + 1; });
    const pageButtons = pageArray.map((d) => {
      return (
        <Button onClick={() => this.setPage(d)}>{d}</Button>
      );
    });

    return (
      <Container className='bg-faded p-4 my-4'>
        <hr className='divider' />
        <h2 className='text-center text-lg text-uppercase my-0'>
          parks
        </h2>
        <hr className='divider' />
        <form class='form-inline'>
          <Button onClick={this.reset}>Reset</Button>
          <SortDropdown sortFunction={this.sort.bind(this)} />
          <Dropdown isOpen={this.state.filterDropdown} toggle={this.toggleFilter}>
            <DropdownToggle caret>
              Filter By
            </DropdownToggle>
            <DropdownMenu>
              {/* <DropdownItem onClick={this.filterBy}>TX</DropdownItem> */}
              {this.state.states.map(createFilterElem.bind(this, this.filterBy))}
            </DropdownMenu>
          </Dropdown>
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

const Parks = (props) => (
  <div>
    <Route exact path='/parks' component={ParkCard} />
    <Route path='/parks/:id' component={ParkDetail} />
  </div>
  );

export default Parks;
