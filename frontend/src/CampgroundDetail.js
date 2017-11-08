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

  // fetches json data from campgrounds/ID endpoint and saves it to the data state array
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
    if (this.state.nothingFound) {
      return (
        <NotFound />
      );
    }

    // if there are multiple states that encompass a campground, we split it to we can link each instance
    const stateList = String(this.state.data.states).split(',');
    const stateLinks = stateList.map((s) => {
      if (stateList[stateList.length - 1] === s) {
        return (
          <a><Link to={`/states/${s}`}>{s}</Link></a>
        );
      }
      return (
        <a><Link to={`/states/${s}`}>{s}</Link>, </a>
      );
    });

    // checks to see if there is a directions url, if so, link it
    const directionUrlLink = () => {
      if (this.state.data.directionsUrl !== 'None') {
        return (<a href={this.state.data.directionsUrl}>{this.state.data.directionsUrl}</a>);
      }
      return <a>{this.state.data.directionsUrl}</a>;
    };

    // checks to see if there is a regulation url, if so, link it
    const regulationUrlLink = () => {
      if (this.state.data.regulationsUrl !== 'None') {
        return (<a href={this.state.data.regulationsUrl}>{this.state.data.regulationsUrl}</a>);
      }
      return <a>{this.state.data.regulationsUrl}</a>;
    };

    // information to be rendered for campgrounds
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
