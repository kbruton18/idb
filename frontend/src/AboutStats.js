import React from 'react';

import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter
} from 'reactstrap';

export default class AboutStats extends Components {
	constructor(props) {
		super(props);
		this.state = {
			derekc: [],
			katherinec: [],
			linhc: [],
			rachelc: [],
			ryanc: []
		}
	}

	componentDidMount() {
		fetch('https://api.github.com/repos/kbruton18/idb/commits?author=dchang95')
			.then((response) => { return response.json();
			}).then((reponseJson) => {
				this.setState({derekc: responseJson});
			});

		fetch('https://api.github.com/repos/kbruton18/idb/commits?author=kbruton18') 
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({katherinec: responseJson});
			});

		fetch('https://api.github.com/repos/kbruton18/idb/commits?author=linh-nguyen') 
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({linhc: responseJson});
			});

		fetch('https://api.github.com/repos/kbruton18/idb/commits?author=racheloei') 
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({rachelc: responseJson});
			});

		fetch('https://api.github.com/repos/kbruton18/idb/commits?author=ryanhle') 
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ryanc: responseJson});
			});
	}

	render() {
		<i>Num. of commits: {this.state.derekc.length}</i><br/>
	}

}