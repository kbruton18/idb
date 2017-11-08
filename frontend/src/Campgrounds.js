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
import CampgroundDetail from './CampgroundDetail.js';
import Filter from './Filter.js';

class CampgroundCard extends Component {
  constructor (props) {
    super(props);
    this.toggleSort = this.toggleSort.bind(this);
    this.reset = this.reset.bind(this);
    this.sort = this.sort.bind(this);
    this.state = {
      data: [],
      sortDropdown: false,
      sortType: '',
      page: 1
    };
  }

  toggleSort () {
    this.setState({
      sortDropdown: !this.state.sortDropdown
    });
  }

  reset () {
    this.setState({
      sortType: ''
    });
  }

  sort (type) {
    this.setState({
      sortType: type
    });
  }

  setPage (page) {
    this.setState({
      page: page
    });
  }

  componentDidMount () {
    fetch('http://sweet-travels.appspot.com/api/campgrounds')
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
      version.sort(function (first, second) {
        if (first.name < second.name) return -1;
        if (first.name > second.name) return 1;
        return 0;
      });
    } else if (this.state.sortType === 'Descending') {
      version.sort(function (first, second) {
        if (first.name < second.name) return 1;
        if (first.name > second.name) return -1;
        return 0;
      });
    } else {
      version = this.state.data;
    }

    const pageOfCampgrounds = version.slice((this.state.page - 1) * 9, this.state.page * 9);

    const campground = pageOfCampgrounds.map((d) => {
      const directionUrlLink = () => {
        if (d.directionsUrl !== 'None') {
          return (<a href={d.directionsUrl}>{d.directionsUrl}</a>);
        }
        return <a>{d.directionsUrl}</a>;
      };

      const regulationUrlLink = () => {
        if (d.regulationsUrl !== 'None') {
          return (<a href={d.regulationsUrl}>{d.regulationsUrl}</a>);
        }
        return <a>{d.regulationsUrl}</a>;
      };

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
          Campgrounds
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
          <Filter name='Campground Filter' data={this.state.data} term='name' />
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

const Campgrounds = (props) => (
  <div>
    <Route exact path='/campgrounds' component={CampgroundCard} />
    <Route path='/campgrounds/:id' component={CampgroundDetail} />
  </div>
  );

export default Campgrounds;
