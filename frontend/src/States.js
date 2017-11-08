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
import StateDetail from './StateDetail.js';

class StateCard extends Component {
  constructor (props) {
    super(props);
    this.toggleSort = this.toggleSort.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      data: [],
      sortDropdown: false,
      filterDropdown: false,
      sortType: '',
      page: 1
    };
  }

  setPage (page) {
    this.setState({
      page: page
    });
  }

// Action for when a user wants to sort
  toggleSort () {
    this.setState({
      sortDropdown: !this.state.sortDropdown
    });
  }

// Action for when a user wants to filter
  toggleFilter () {
    this.setState({
      filterDropdown: !this.state.filterDropdown
    });
  }

// resets everything to its original state
  reset () {
    this.setState({
      sortType: ''
    });
  }

// setting sort type for park
  sort (type) {
    this.setState({
      sortType: type
    });
  }

  componentDidMount () {
    fetch('http://sweet-travels.appspot.com/api/states')
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
      // if we are sorting by ascending order
      version.sort(function (first, second) {
        if (first.name < second.name) return -1;
        if (first.name > second.name) return 1;
        return 0;
      });
    } else if (this.state.sortType === 'Descending') {
      // if we are sorting by descending order
      version.sort(function (first, second) {
        if (first.name < second.name) return 1;
        if (first.name > second.name) return -1;
        return 0;
      });
    } else {
      version = this.state.data;
    }

    // for pagination, we display 9 pages at a time.
    const pageOfStates = version.slice((this.state.page - 1) * 9, this.state.page * 9);

    // for states with multiple parks, we need to split up the list so that we can link each park
    const state = pageOfStates.map((d) => {
      const parkList = String(d.nationalParks).split(',');
      const parkLinks = parkList.map((p) => {
        if (d.nationalParks !== 'None') {
          if (parkList[parkList.length - 1] === p) {
            return (
              <a><Link to={`/parks/${p}`}>{p}</Link></a>
            );
          }
          return (
            <a><Link to={`/parks/${p}`}>{p}</Link>, </a>
          );
        }
        return <a>{d.nationalParks}</a>;
      });

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

    const pages = Math.ceil(version.length / 9);
    const pageArray = Array.apply(null, Array(pages)).map(function (_, i) { return i + 1; });
    const pageButtons = pageArray.map((d) => {
      return (
        <Button onClick={() => this.setPage(d)}>{d}</Button>
      );
    });

    // returns all the information to states that we plan to render
    return (
      <Container className='bg-faded p-4 my-4'>
        <hr className='divider' />
        <h2 className='text-center text-lg text-uppercase my-0'>
        states
      </h2>
        <hr className='divider' />
        <form class='form-inline'>
          <Button onClick={this.reset}>Reset</Button>
          <Dropdown isOpen={this.state.sortDropdown} toggle={this.toggleSort}>
            <DropdownToggle caret>
            Sort By
          </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.sort.bind(this, 'Ascending')}>Ascending</DropdownItem>
              <DropdownItem onClick={this.sort.bind(this, 'Descending')}>Descending</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={this.state.filterDropdown} toggle={this.toggleFilter}>
            <DropdownToggle caret>
            Filter By
          </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.sort.bind(this, 'Ascending')}>Ascending</DropdownItem>
              <DropdownItem onClick={this.sort.bind(this, 'Descending')}>Descending</DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
