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

class ParkCard extends Component {

  constructor(props) {
    super(props);
    this.toggleSort = this.toggleSort.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.reset = this.reset.bind(this);
    this.filterBy = this.filterBy.bind(this);
    this.sortByAscending = this.sortByAscending.bind(this);
    this.sortByDescending = this.sortByDescending.bind(this);
    this.state = {
      data: [],
      sortDropdown: false,
      filterDropdown: false,
      sortAscending: false,
      sortDescending: false,
      filterBy: false,
      page: 1,
      filter: ''
    }
  }

  toggleFilter() {
    this.setState({
      filterDropdown: !this.state.filterDropdown
    });
  }

  toggleSort() {
    this.setState({
      sortDropdown: !this.state.sortDropdown
    });
  }

  reset() {
    this.setState({
      sortAscending: false,
      sortDescending: false
    });
  }

  sortByAscending() {
    this.setState({
      sortAscending: true,
      sortDescending: false
    });
  }

  sortByDescending() {
    this.setState({
      sortAscending: false,
      sortDescending: true
    });
  }

  filterBy(event) {
    this.setState({
      filter: event.currentTarget.textContent,
      filterBy: true
    });
  }

  setPage(page) {
    this.setState({
      page: page
    });
  }

  componentDidMount() {
    fetch('http://sweet-travels.appspot.com/api/parks')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        })
      })
  }

  render() {
    var version = [];
    Object.assign(version, this.state.data);
    if (this.state.filterBy) {
      version = version.filter((state) => {
        return state.states.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1;
      });
    }
    else if (this.state.sortAscending) {
      version.sort(function(first, second) {
        if(first.fullName < second.fullName) return -1;
        if(first.fullName > second.fullName) return 1;
        return 0;
      });
    } else if (this.state.sortDescending) {
      version.sort(function(first, second) {
        if(first.fullName < second.fullName) return 1;
        if(first.fullName > second.fullName) return -1;
        return 0;
      });
    } else {
      version = this.state.data;
    }

    const pageOfParks = version.slice((this.state.page - 1) * 9, this.state.page * 9);

    const park = pageOfParks.map((d) => {
      const stateList = String(d.states).split(",");
      const stateLinks = stateList.map((s) => {
        if (stateList[stateList.length-1] === s) {
          return (
            <a><Link to={`/states/${s}`}>{s}</Link></a>
          )
        }
        return (
        <a><Link to={`/states/${s}`}>{s}</Link>, </a>
        )
      })

      const campgroundList = String(d.campgrounds).split(", ");
      const campgroundLinks = campgroundList.map((c) => {
        if (d.campgrounds!=="None") {
          if (campgroundList[campgroundList.length-1] === c) {
            return (
              <a><Link to={`/campgrounds/${c}`}>{c}</Link></a>
            )
          }
          return (
          <a><Link to={`/campgrounds/${c}`}>{c}</Link>, </a>
          )
        }
        return <a>{d.campgrounds}</a>
      })

      return (
        <Col lg="4" md="6" sm="12">
          <Card className ="text-center">
            <Link to={`/parks/${d.parkCode}`}>
              <CardImg top width="100%" height = "250px" src={d.imageUrl} alt="Image of park"/>
            </Link>
            <CardBody>
              <CardTitle className="text-center">{d.fullName}</CardTitle>
              <CardText>
              <b>Park Code</b>: {d.parkCode}<br/>
              <b>Designation</b>: {d.designation}<br/>
              <b>State(s)</b>: {stateLinks}<br/>
              <b>Campgrounds(s)</b>: {campgroundLinks}<br/>
              <b>Website</b>: <a href={d.url}>{d.url}</a>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      )
    })

    const pages = Math.ceil(version.length / 9);
    const pageArray = Array.apply(null, Array(pages)).map(function (_, i) {return i + 1;});
    const pageButtons = pageArray.map((d) => {
      return (
        <Button onClick={() => this.setPage(d)}>{d}</Button>
      )
    });

    return (
      <Container className="bg-faded p-4 my-4">
        <hr className="divider"/>
        <h2 className="text-center text-lg text-uppercase my-0">
          parks
        </h2>
        <hr className="divider"/>
        <form role="form" class="form-inline">
          <Button onClick={this.reset}>Reset</Button>
          <Dropdown isOpen={this.state.sortDropdown} toggle={this.toggleSort}>
            <DropdownToggle caret>
              Sort By
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.sortByAscending}>Ascending</DropdownItem>
              <DropdownItem onClick={this.sortByDescending}>Descending</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={this.state.filterDropdown} toggle={this.toggleFilter}>
            <DropdownToggle caret>
              Filter By
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.filterBy}>Ascending</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </form>
        <Row>
          {park}
        </Row>
        <Row>
          <ButtonGroup className="center">
            <Button onClick={() => this.setPage(this.state.page === 1 ? 1 : (this.state.page-1))}>Previous</Button>
            {pageButtons}
            <Button onClick={() => this.setPage(this.state.page === pageButtons.length ? pageButtons.length : (this.state.page+1))}>Next</Button>
          </ButtonGroup>
        </Row>
      </Container>
    );
  }
}

const Parks = (props) => (
    <div>
      <Route exact path="/parks" component={ParkCard}/>
      <Route path="/parks/:id" component={ParkDetail}/>
    </div>
  )

export default Parks
