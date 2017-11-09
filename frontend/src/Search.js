import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Container, Col, CardBody, CardTitle, CardText, Card, CardImg } from 'reactstrap';
import NotFound from './NotFound.js';

class Search extends Component {
  constructor (props) {
    super(props);
    this.state = {
      query: decodeURI(this.props.location.search.slice(3)).replace('+', ' '),
      data: []
    };
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
    return (
      <div>
        <Container className='bg-faded p-4 my-4'>
          <hr className='divider' />
          <h2 className='text-center text-lg text-uppercase my-0'>
            <strong> Name</strong>
          </h2>
          <hr className='divider' />
          <p><b>Search:</b> {this.state.query}</p>
          <Row>
            {Object.values(this.state.data).map((data) => <SearchCard data={data} />)}
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
      <ParkSearchCard data={props.data} />
    );
  }

  if (type === 'state') {
    return (
      <StateSearchCard data={props.data} />
    );
  }

  return (
    <OtherSearchCard data={props.data} />
  );
}

// visitorcenter campground url name

function OtherSearchCard (props) {
  const image = props.data.imageUrl;
  const search = props.data.searchString;
  const name = props.data.name;
  const type = props.data.model;
  const url = '/' + type + 's/' + name;
  console.log(search);

  return (
    <SearchCardBase url={url} image={image} alt={type} title={name} search={search} />
  );
}

function StateSearchCard (props) {
  const abbr = props.data.abbreviations;
  const image = props.data.imageUrl;
  const search = props.data.searchString;
  const url = '/states/' + abbr;
  const name = props.data.name;

  return (
    <SearchCardBase url={url} image={image} alt='State' title={name} serach={search} />
  );
}

function ParkSearchCard (props) {
  const fullName = props.data.fullName;
  const image = props.data.imageUrl;
  const search = props.data.searchString;
  const parkCode = props.data.parkCode;
  const url = '/parks/' + parkCode;

  return (
    <SearchCardBase url={url} image={image} alt='Park' title={fullName} search={search} />
  );
}

function SearchCardBase (props) {
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
              {props.search}
            </CardText>
          </CardBody>
        </Card>
      </Container>
    </Col>
  );
}

export default Search;
