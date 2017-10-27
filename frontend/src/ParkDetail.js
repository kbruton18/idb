import React, { Component } from 'react';
import {
  Link,
  Route
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle
} from 'reactstrap';

class ParkDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: props.match.params.id,
			data: []
		}
	}

	componentDidMount() {
		fetch('http://api.sweet-travels.appspot.com/api/parks/' + this.state.id)
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
			<Container className="bg-faded p-4 my-4">
				<hr className="divider"/>
				<h2 className="text-center text-lg text-uppercase my-0">
					 <strong> {this.state.data.fullName}</strong>
				</h2>
				<hr className="divider"/>
				<CardImg top width="100%" src={this.state.data.imageUrl} alt="parks image" />
				<p><b>State(s):</b> {this.state.data.states}</p>
				<p><b>Description:</b> {this.state.data.description}</p>
				<p><b>Designation:</b> {this.state.data.designation}</p>
				<p><b>Lat Long:</b> {this.state.data.latLong}</p>
				<p><b>Directions Info:</b> {this.state.data.directionsInfo}</p>
				<p><b>Weather Info:</b> {this.state.data.weatherInfo}</p>
			</Container>
		  </div>
		);
	}
}

export default ParkDetail
