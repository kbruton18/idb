import React, { Component } from 'react';
import 'whatwg-fetch';

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

const derekImg = require('./img/about/derek.jpg');
const katherineImg = require('./img/about/katherine.jpg');
const linhImg = require('./img/about/linh.jpg');
const rachelImg = require('./img/about/rachel.jpg');
const ryanImg = require('./img/about/ryan.jpeg');

export default class AboutStats extends Component {
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
			.then((response) => response.json())
			.then((responseJson) => {
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
    const derek = {"name": "Derek Chang", "title": "Front-End Engineer", "text": "Senior, Computer Science major from Austin, TX. I love traveling, learning, and interacting with interesting people on a daily basis. I worked on the 'Parks' model and had a great time learning Flask.", "commits": this.state.derekc.length, "issues": 8, "tests": 0, imageSrc: derekImg, imageCaption: "Derek"};
    const katherine = {"name": "Katherine Bruton", "title": "Back-End Engineer", "text": "I'm a senior from San Antonio, TX. I love exploring cities, playing video games, and swing dancing! For this phase of the project, I worked on the Visitor Centers pages.", "commits": this.state.katherinec.length, "issues": 8, "tests": 0, imageSrc: katherineImg, imageCaption: "Katherine"};
    const linh = {"name": "Linh Nguyen", "title": "Front-End Engineer", "text": "I'm a senior from the DFW area. I like travelling, avacados, horror movies, and baking. For this iteration, I've worked on the States pages.", "commits": 25, "issues": this.state.linhc.length, "tests": 0, "imageSrc": linhImg, imageCaption: "Linh"};
    const rachel = {"name": "Rachel Oei", "title": "Back-End Engineer", "text": "I am a senior computer science major from Miami, Florida. I worked on the Home and About pages for this project and got to learn about Google Cloud Platform, Flask, and Bootstrap.", "commits": this.state.rachelc.length, "issues": 13, "tests": 0, "imageSrc": rachelImg, "imageCaption": "Rachel"};
    const ryan = {"name": "Ryan Le", "title": "Front-End Engineer", "text": "Hi! I'm a fourth year disaster human studying Computer Science at The University of Texas at Austin. So far, I've mostly worked on the Campgrounds page and had a lovely time learning about Google Cloud Platform and Flask.", "commits": this.state.ryanc.length, "issues": 7, "tests": 0, "imageSrc": ryanImg, "imageCaption": "Ryan"};
    return (
      <Container className="bg-faded p-4 my-4">
        <hr className="divider"/>
        <h2 className="text-center text-lg text-uppercase my-0">
          Our<strong> Team</strong>
        </h2>
        <hr className="divider"/>
        <Row>
          <Col lg="4" md="6" sm="12">
            <AboutTeamMember member={derek}/>
          </Col>
          <Col lg="4" md="6" sm="12">
            <AboutTeamMember member={katherine}/>
          </Col>
          <Col lg="4" md="6" sm="12">
            <AboutTeamMember member={linh}/>
          </Col>
          <Col lg="4" md="6" sm="12">
            <AboutTeamMember member={rachel}/>
          </Col>
          <Col lg="4" md="6" sm="12">
            <AboutTeamMember member={ryan}/>
          </Col>
        </Row>
      </Container>
    );
	}

}

function AboutTeamMember(props) {
  return (
    <Card>
      <CardImg top width="100%" src={props.member.imageSrc} alt={props.member.imageCaption} />
      <CardBody>
        <CardTitle className="text-center">{props.member.name}</CardTitle>
        <CardSubtitle className="text-center text-muted">{props.member.title}</CardSubtitle>
        <br/>
        <CardText>{props.member.text}</CardText>
      </CardBody>
      <CardFooter className="text-muted">
        <i>Num. of commits: {props.member.commits}</i><br/>
        <i>Num. of issues: {props.member.issues}</i><br/>
        <i>Num. of unit test: {props.member.tests}</i><br/>
      </CardFooter>
    </Card>
  )
}