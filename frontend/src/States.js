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

  constructor(props) {
    super(props);
    this.toggleSort = this.toggleSort.bind(this);
    this.reset = this.reset.bind(this);
    this.sortByName = this.sortByName.bind(this);
    this.state = {
      data: [],
      sortDropdown: false,
      sortName: false,
      page: 1
    };
  }

  setPage(page) {
    this.setState({
      page: page
    });
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

  componentDidMount() {
    fetch('http://sweet-travels.appspot.com/api/states')
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
        if(first.name < second.name) return -1;
        if(first.name > second.name) return 1;
        return 0;
      });
    } else {
      version = this.state.data;
    }

    const pageOfStates = version.slice((this.state.page - 1) * 9, this.state.page * 9);

    const state = pageOfStates.map((d) => {
      const parkList = String(d.nationalParks).split(",");
      const parkLinks = parkList.map((p) => {
        if (d.nationalParks!=="None") {
          if (parkList[parkList.length-1] === p) {
            return (
              <a><Link to={`/parks/${p}`}>{p}</Link></a>
            )
          }
          return (
          <a><Link to={`/parks/${p}`}>{p}</Link>, </a>
          )
        }
        return <a>{d.nationalParks}</a>
      })

      return (
        <Col lg="4" md="6" sm="12">
        <Card className ="text-center">
          <Link to={`/states/${d.abbreviations}`}>
            <CardImg top width="100%" height = "250px" src={d.imageUrl} alt="Photo of state flag"/>
          </Link>
          <CardBody>
            <CardTitle className="text-center">{d.name}</CardTitle>
            <CardText>
            <b>Abbreviations: </b>{d.abbreviations}<br/>
            <b>Nickname(s): </b>{d.nicknames}<br/>
            <b>Capital: </b>{d.capital}<br/>
            <b>Timezone: </b>{d.timeZone}<br/>
            <b>National Park(s):</b> {parkLinks}
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
        states
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
          {state}
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

export default function States(props) {
  return (
    <div>
      <Route exact path="/states" component={StateCard}/>
      <Route path="/states/:id" component={StateDetail}/>
    </div>
  )
}
