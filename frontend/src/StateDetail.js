import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import NotFound from './NotFound.js';

class StateDetail extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      data: []
    };
  }

  // Fetch json data from .../states/ID
  // Catch if there is no response, this means bad URL
  componentDidMount () {
    fetch('http://api.sweet-travels.appspot.com/api/states/' + this.state.id)
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

    // There can be multiple parks per state or none. In the database this is a comma
    // separated string so we need to split it up so we can link each individually.
    const parkList = String(this.state.data.nationalParks).split(',');
    const parkLinks = parkList.map((p) => {
      if (this.state.data.nationalParks !== 'None') {
        if (parkList[parkList.length - 1] === p) {
          return (
            <span><Link to={`/parks/${p}`}>{p}</Link></span>
          );
        }
        return (
          <span><Link to={`/parks/${p}`}>{p}</Link>, </span>
        );
      }
      return <span>{this.state.data.nationalParks}</span>;
    });

    // There can be multiple campgrounds per state or none. In the database this is a
    // comma separated string so we need to split it up so we can link each individually.
    const campgroundList = String(this.state.data.campgrounds).split(',');
    const campgroundLinks = campgroundList.map((c) => {
      if (this.state.data.campgrounds !== 'None') {
        if (campgroundList[campgroundList.length - 1] === c) {
          return (
            <span><Link to={`/campgrounds/${c}`}>{c}</Link></span>
          );
        }
        return (
          <span><Link to={`/campgrounds/${c}`}>{c}</Link>, </span>
        );
      }
      return <span>{this.state.data.campgrounds}</span>;
    });

    // Website links must have "http://" at the beginning in order to link
    // correctly. Adding it in for websites that do not have it and appends it.
    var updatedWebsiteLink = () => {
      if (String(this.state.data.url).indexOf('http://') > -1) {
        return this.state.data.url;
      }
      return ('http://' + this.state.data.url);
    };

    // Returns the state detail to be rendered.
    return (
      <div>
        <Container className='bg-faded p-4 my-4'>
          <hr className='divider' />
          <h2 className='text-center text-lg text-uppercase my-0'>
            <strong>{this.state.data.name}</strong>
          </h2>
          <hr className='divider' />
          <center><img width='50%' src={this.state.data.imageUrl} alt='State flag' /></center>
          <p><b>Abbreviations:</b> {this.state.data.abbreviations}</p>
          <p><b>Nicknames:</b> {this.state.data.nicknames}</p>
          <p><b>Time Zone:</b> {this.state.data.timeZone}</p>
          <p><b>Governor:</b> {this.state.data.governor}</p>
          <p><b>Capital:</b> {this.state.data.capital}</p>
          <p><b>Largest City:</b> {this.state.data.largestCity}</p>
          <p><b>Total Population:</b> {this.state.data.totalPopulation}</p>
          <p><b>Total Area:</b> {this.state.data.totalArea}</p>
          <p><b>Median Income:</b> {this.state.data.medianIncome}</p>
          <p><b>National Park(s):</b> {parkLinks}</p>
          <p><b>Campground(s):</b> {campgroundLinks}</p>
          <p><b>Website:</b> <a href={updatedWebsiteLink()}>{updatedWebsiteLink()}</a></p>
        </Container>
      </div>
    );
  }
}

export default StateDetail;
