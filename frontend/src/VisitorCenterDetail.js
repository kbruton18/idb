import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import NotFound from './NotFound.js';

class VisitorCenterDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      data: []
    };
  }

  // Fetch json data from .../visitorcenters/ID
  // Catch if there is no response, this means bad URL
  componentDidMount () {
    fetch('http://sweet-travels.appspot.com/api/visitorcenters/' + this.state.id)
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
    // If bad URL error was found, return NotFound page
    if (this.state.nothingFound) {
      return (
        <NotFound />
      );
    }

    // In the database latLong looks like: {lat:######, lng:######}
    // Breaking it apart to enhance display. If the database does
    // not contain it display "N/A" for both.
    const latLong = String(this.state.data.latLong).split(', lng:');
    var lat = String(latLong[0]).replace('{lat:', '');
    var long = String(latLong[1]).replace('}', '');
    if (lat.length === 0) {
      lat = 'N/A';
      long = 'N/A';
    }

    // Checks to see if there is a url to link
    const directionUrlLink = () => {
      if (this.state.data.directionsUrl !== 'None') {
        return (<a href={this.state.data.directionsUrl}>{this.state.data.directionsUrl}</a>);
      }
      return <a>{this.state.data.directionsUrl}</a>;
    };
    const websiteUrlLink = () => {
      if (this.state.data.website !== 'None') {
        return (<a href={this.state.data.website}>{this.state.data.website}</a>);
      }
      return <a>{this.state.data.website}</a>;
    };

    // Returns the visitor center detail to be rendered.
    return (
      <div>
        <Container className='bg-faded p-4 my-4'>
          <hr className='divider' />
          <h2 className='text-center text-lg text-uppercase my-0'>
            <strong> {this.state.data.name}</strong>
          </h2>
          <hr className='divider' />
          <center><img width='50%' src={this.state.data.imageUrl} alt='visitor center' /></center>
          <p><b>Park Code:</b> <Link to={`/parks/${this.state.data.parkCode}`}>{this.state.data.parkCode}</Link></p>
          <p><b>State:</b> <Link to={`/states/${this.state.data.states}`}>{this.state.data.states}</Link></p>
          <p><b>Description:</b> {this.state.data.description}</p>
          <p><b>Latitude:</b> {lat}</p>
          <p><b>Longitude:</b> {long}</p>
          <p><b>Directions Info:</b> {this.state.data.directionsInfo}</p>
          <p><b>Directions URL:</b> {directionUrlLink()}</p>
          <p><b>Website:</b> {websiteUrlLink()}</p>
        </Container>
      </div>
    );
  }
}

export default VisitorCenterDetail;
