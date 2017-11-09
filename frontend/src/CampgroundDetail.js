import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import NotFound from './NotFound.js';

class CampgroundDetail extends Component {

  constructor (props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      data: []
    };
  }

  // Fetch json data from .../campgrounds/ID
  // Catch if there is no response, this means bad URL
  componentDidMount () {
    fetch('http://sweet-travels.appspot.com/api/campgrounds/' + this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          console.log(responseJson);
          this.setState({
            data: responseJson
          });
        } else {
          this.setState({nothingFound: true});
        }
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

    // There can be multiple states per campground. In the database this is a comma
    // separated string so we need to split it up so we can link each individually.
    const stateList = String(this.state.data.states).split(',');
    const stateLinks = stateList.map((s) => {
      if (stateList[stateList.length - 1] === s) {
        return (
          <span><Link to={`/states/${s}`}>{s}</Link></span>
        );
      }
      return (
        <span><Link to={`/states/${s}`}>{s}</Link>, </span>
      );
    });

    // Checks to see if there is a directionsUrl url to link
    const directionUrlLink = () => {
      if (this.state.data.directionsUrl !== 'None') {
        return (<a href={this.state.data.directionsUrl}>{this.state.data.directionsUrl}</a>);
      }
      return <a>{this.state.data.directionsUrl}</a>;
    };

    // Checks to see if there is a regulations url to link
    const regulationUrlLink = () => {
      if (this.state.data.regulationsUrl !== 'None') {
        return (<a href={this.state.data.regulationsUrl}>{this.state.data.regulationsUrl}</a>);
      }
      return <a>{this.state.data.regulationsUrl}</a>;
    };

    // Returns the campground detail to be rendered.
    return (
      <div>
        <Container className='bg-faded p-4 my-4'>
          <hr className='divider' />
          <h2 className='text-center text-lg text-uppercase my-0'>
            <strong> {this.state.data.name}</strong>
          </h2>
          <hr className='divider' />
          <center><img width='50%' src={this.state.data.imageUrl} alt='campground' /></center>
          <p><b>Park Code:</b> <Link to={`/parks/${this.state.data.parkCode}`}>{this.state.data.parkCode}</Link></p>
          <p><b>State(s):</b> {stateLinks}</p>
          <p><b>Total Sites:</b> {this.state.data.totalSites}</p>
          <p><b>Description:</b> {this.state.data.description}</p>
          <p><b>Weather Info:</b> {this.state.data.weatherInfo}</p>
          <p><b>Directions Info:</b> {this.state.data.directionsInfo}</p>
          <p><b>Directions URL:</b> {directionUrlLink()}</p>
          <p><b>Regulations Overview:</b> {this.state.data.regulations}</p>
          <p><b>Regulations URL:</b> {regulationUrlLink()}</p>
          <p><b>Wheelchair Access:</b> {this.state.data.wheelchairAccess}</p>
          <p><b>Internet Info:</b> {this.state.data.internetInfo}</p>
        </Container>
      </div>
    );
  }
}

export default CampgroundDetail;
