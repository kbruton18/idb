import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Row, Container, Col, CardBody, CardTitle, CardText, Card, CardImg } from 'reactstrap';
import Highlighter from 'react-highlight-words';

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: decodeURI(this.props.location.search.slice(3)).replace('+', ' '),
      data: [],
      page: 1
    };
  }

  setPage (page) {
    this.setState({
      page: page
    });
  }

  // Fetch json data from .../parks/ID
  // Catch if there is no response, this means bad URL
  componentDidMount () {
    fetch('http://api.sweet-travels.appspot.com/api/search/' + this.state.query)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        });
      })
      .catch(() => {
        this.setState({nothingFound: true});
      });
  }

  render () {
    const searchResults = Object.values(this.state.data).slice((this.state.page - 1) * 9, this.state.page * 9);
    const version = searchResults.map((data) => <SearchCard data={data} query={this.state.query} />)
    const pages = Math.ceil(Object.values(this.state.data).length / 9);
    const pageArray = Array.apply(null, Array(pages)).map(function (_, i) { return i + 1; });
    const pageButtons = pageArray.map((d) => {
      return (
        <Button onClick={() => this.setPage(d)}>{d}</Button>
      );
    });

    return (
      <div>
        <Container className='bg-faded p-4 my-4'>
          <hr className='divider' />
          <h2 className='text-center text-lg text-uppercase my-0'>
            <strong>Searched for: {this.state.query}</strong>
          </h2>
          <hr className='divider' />
          <Row>
            {version}
          </Row>
          <Row>
            <ButtonGroup className='center'>
              <Button onClick={() => this.setPage(this.state.page === 1 ? 1 : (this.state.page - 1))}>Previous</Button>
              {pageButtons}
              <Button onClick={() => this.setPage(this.state.page === pageButtons.length ? pageButtons.length : (this.state.page + 1))}>Next</Button>
            </ButtonGroup>
          </Row>
        </Container>
      </div>
    );
  }
}

function SearchCard (props) {
  const type = props.data.model;
  if (type === 'park') {
    return (
      <ParkSearchCard data={props.data} query={props.query} />
    );
  }

  if (type === 'state') {
    return (
      <StateSearchCard data={props.data} query={props.query} />
    );
  }

  return (
    <OtherSearchCard data={props.data} query={props.query} />
  );
}

// visitorcenter campground url name

function OtherSearchCard (props) {
  const query = props.query;
  const image = props.data.imageUrl;
  const search = props.data.searchString;
  const name = props.data.name;
  const type = props.data.model;
  const url = '/' + type + 's/' + name;

  return (
    <SearchCardBase url={url} image={image} alt={type} title={name} search={search} query={query} />
  );
}

function StateSearchCard (props) {
  const query = props.query;
  const abbr = props.data.abbreviations;
  const image = props.data.imageUrl;
  const search = props.data.searchString;
  const url = '/states/' + abbr;
  const name = props.data.name;

  return (
    <SearchCardBase url={url} image={image} alt='State' title={name} search={search} query={query} />
  );
}

function ParkSearchCard (props) {
  const query = props.query;
  const fullName = props.data.fullName;
  const image = props.data.imageUrl;
  const search = props.data.searchString;
  const parkCode = props.data.parkCode;
  const url = '/parks/' + parkCode;

  return (
    <SearchCardBase url={url} image={image} alt='Park' title={fullName} search={search} query={query} />
  );
}

function SearchCardBase (props) {
  var highlightWords = String(props.query).split(" ");
  highlightWords.push(props.query);
  const description = (props.search === undefined || props.search === null) ? "" : props.search;

  return (
    <Col lg='4' md='6' sm='12'>
      <Container>
        <Card className='text-center'>
          <Link to={props.url}>
            <CardImg top width='100%' height='250px' src={props.image} alt='campground' />
          </Link>
          <CardBody>
            <CardTitle className='text-center'>{props.title}</CardTitle>
            <CardText>
              <Highlighter highlightClassName='Highlight' searchWords={highlightWords} textToHighlight={description} />
            </CardText>
          </CardBody>
        </Card>
      </Container>
    </Col>
  );
}

export default Search;
