import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
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
        </Container>
      </div>
    );
  }
}

export default Search;
