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
    if (this.state.nothingFound) {
      return (
        <NotFound />
      );
    }

    const latLong = String(this.state.data.latLong).split(', lng:');
    const lat = String(latLong[0]).replace('{lat:', '');
    const long = String(latLong[1]).replace('}', '');

    const directionUrlLink = () => {
      if (this.state.data.directionsUrl !== 'None') {
        return (<a href={this.state.data.directionsUrl}>{this.state.data.directionsUrl}</a>);
      }
      return <a>{this.state.data.directionsUrl}</a>;
    };

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
          <p><b>Website:</b> <a href={this.state.data.website}>{this.state.data.website}</a></p>
        </Container>
      </div>
    );
  }
}

export default VisitorCenterDetail;
