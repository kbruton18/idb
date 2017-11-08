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
    this.reset = this.reset.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.state = {
      data: [],
      sortDropdown: false,
      sortName: false,
      page: 0
    }
  }

  toggleSort() {
    this.setState({
      sortDropdown: !this.state.sortDropdown
    });
  }

  reset() {
    this.setState({
      sortDropdown: false,
      sortName: false
    });
  }

  sortByName() {
    this.setState({
      sortName: true
    });
  }

  next() {
    if (this.state.page < (this.state.data.length / 6 - 1)) {
      this.setState({
        page: this.state.page + 1
      });
    }
  }

  previous() {
    if (this.state.page > 0) {
      this.setState({
        page: this.state.page - 1
      });
    }
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
    if (this.state.sortName) {
      version.sort(function(first, second) {
        if(first.fullName < second.fullName) return -1;
        if(first.fullName > second.fullName) return 1;
        return 0;
      });
    } else {
      version = this.state.data;
    }

    let n = this.state.page * 6
    let currView = version.slice(n, n + 6);
    const pageNumbers = [];
    for (let i = 0; i < Math.ceil(this.state.data.length / 6); i++) {
      pageNumbers.push(i);
    }

    const park = currView.map((d) => {
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
              <CardImg top width="100%" src={d.imageUrl} alt="Image of park"/>
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
              <DropdownItem onClick={this.sortByName}>Name</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </form>
        <Row>
          {park}
        </Row>
        <Row>
          <ButtonGroup className="center">
            <Button onClick={() => this.previous()}>Previous</Button>
            {pageNumbers.map((page)=>
              <Button onClick={() => this.setPage(page)}>{page}</Button>
            )}
            <Button onClick={() => this.next()}>Next</Button>
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
