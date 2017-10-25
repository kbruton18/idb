import React, {Component} from 'react';
import CustomCard from './CustomCard.js';

class StateDetail extends Component {

  constructor({match}) {
    super(match);
    this.state = {
      id: match.params.id, 
      data: []
    }
  }

  componentDidMount() {
    fetch(this.state.id)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        })
      })
  }

  render() {
    return (
      <div>
        <CustomCard title={this.state.id}/>
      </div>
    );
  }
}

export default StateDetail

// import React, { Component } from 'react';
// import {
//   Container,
//   Card,
//   CardImg,
//   CardText,
//   CardBody,
//   CardTitle
// } from 'reactstrap';

// const ca = require('./img/states/california.jpg');

// function StateDetail(props) {
//   return (
//     <Card>
//       <CardImg top width="100%" src={props.img} alt={props.alt} />
//       <CardBody>
//         <CardText>
//           <b>Abbreviations: </b>{props.abbreviation}<br />
//           <b>Nickname(s): </b>{props.nickname}<br />
//           <b>Timezone: </b>{props.timezone}<br />
//           <b>Governor: </b>{props.govenor}<br />
//           <b>Capital: </b>{props.capital}<br />
//           <b>Largest City: </b>{props.city}<br />
//           <b>Total Population: </b>{props.population}<br />
//           <b>Total Area: </b>{props.area}<br />
//           <b>Median Household Income: </b>{props.income}<br />
//           <b>National Park(s):</b> <a href={props.parkUrl}>{props.parkName}</a><br />
//           <b>Campground(s): </b><a href={props.campgroundUrl}>{props.campgroundName}</a><br />
//           <b>State website: </b><a href={props.stateUrl}>{props.stateUrl}</a>
//         </CardText>
//       </CardBody>
//     </Card>
//   );
// }

// export default function State(props) {
//   return (
//     <div>
//       <Container className="bg-faded p-4 my-4">
//         <hr className="divider"/>
//         <h2 className="text-center text-lg text-uppercase my-0">California</h2>
//         <hr className="divider"/>
//           <StateDetail img={ca} alt="California Flag" abbreviation="CA, Calif., Cal." 
//             nickname="The Golden State" timezone="Pacific (UTC −8/−7)" govenor="Jerry Brown (D)"
//             capital="Sacramento" city="Los Angeles" population="39,250,017 (2016 est.)" 
//             area="163,696 sq mi (423,970 km2)" income="$63,636"
//             parkUrl="http://www.swetravels.me/parks/yosemite.html" parkName="Yosemite"
//             campgroundUrl="http://www.swetravels.me/campgrounds/4508" campgroundName="Upper Pines"
//             stateUrl="http://www.ca.gov"/>
//       </Container>
//     </div>
//   );
// }
