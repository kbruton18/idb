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
import VisitorCenterDetail from './VisitorCenterDetail.js';

class VisitorCenterCard extends Component {
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

  setPage (page) {
    this.setState({
      page: page
    });
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

    const pageOfVisitorCenters = version.slice((this.state.page - 1) * 9, this.state.page * 9);

    const center = pageOfVisitorCenters.map((d) => {
      const latLong = String(d.latLong).split(', lng:');
      const lat = String(latLong[0]).replace('{lat:', '');
      const long = String(latLong[1]).replace('}', '');

      const directionUrlLink = () => {
        if (d.directionsUrl !== 'None') {
          return (<a href={d.directionsUrl}>{d.directionsUrl}</a>);
        }
        return <a>{d.directionsUrl}</a>;
      };

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
        Visitor Centers
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

const VisitorCenters = (props) => (
  <div>
    <Route exact path='/visitorcenters' component={VisitorCenterCard} />
    <Route path='/visitorcenters/:id' component={VisitorCenterDetail} />
  </div>
  );

export default VisitorCenters;
