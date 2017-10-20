import React, { Component } from 'react';
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
import CustomCard from './CustomCard.js';

const derekImg = require('./img/about/derek.jpg');
const katherineImg = require('./img/about/katherine.jpg');
const linhImg = require('./img/about/linh.jpg');
const rachelImg = require('./img/about/rachel.jpg');
const ryanImg = require('./img/about/ryan.jpeg');

function AboutSite(props) {
  return (
    <Container className="bg-faded p-4 my-4">
      <hr className="divider"/>
      <h2 className="text-center text-lg text-uppercase my-0">
        Our <strong> Site</strong>
      </h2>
      <hr className="divider"/>
      <p>Always wanted to visit the great outdoors? Taking a road trip across America? Looking for a camping or hiking trip? SWEet Travels is for you!</p>
      <p>SWEet Travels has a database of national parks, campgrounds, visitor centers, and states. It's easy to find your next adventure.</p>
      <p>SWEet Travels was built by a group of college students who are passionate about the outdoors. We hope to inspire you to enjoy nature too!</p>
    </Container>
  );
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

class AboutTeam extends Component {
  render() {
    const derek = {"name": "Derek Chang", "title": "Front-End Engineer", "text": "Senior, Computer Science major from Austin, TX. I love traveling, learning, and interacting with interesting people on a daily basis. I worked on the 'Parks' model and had a great time learning Flask.", "commits": 15, "issues": 8, "tests": 0, imageSrc: derekImg, imageCaption: "Derek"};
    const katherine = {"name": "Katherine Bruton", "title": "Back-End Engineer", "text": "I'm a senior from San Antonio, TX. I love exploring cities, playing video games, and swing dancing! For this phase of the project, I worked on the Visitor Centers pages.", "commits": 30, "issues": 8, "tests": 0, imageSrc: katherineImg, imageCaption: "Katherine"};
    const linh = {"name": "Linh Nguyen", "title": "Front-End Engineer", "text": "I'm a senior from the DFW area. I like travelling, avacados, horror movies, and baking. For this iteration, I've worked on the States pages.", "commits": 25, "issues": 5, "tests": 0, "imageSrc": linhImg, imageCaption: "Linh"};
    const rachel = {"name": "Rachel Oei", "title": "Back-End Engineer", "text": "I am a senior computer science major from Miami, Florida. I worked on the Home and About pages for this project and got to learn about Google Cloud Platform, Flask, and Bootstrap.", "commits": 19, "issues": 13, "tests": 0, "imageSrc": rachelImg, "imageCaption": "Rachel"};
    const ryan = {"name": "Ryan Le", "title": "Front-End Engineer", "text": "Hi! I'm a fourth year disaster human studying Computer Science at The University of Texas at Austin. So far, I've mostly worked on the Campgrounds page and had a lovely time learning about Google Cloud Platform and Flask.", "commits": 60, "issues": 7, "tests": 0, "imageSrc": ryanImg, "imageCaption": "Ryan"};
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

function AboutSources(props) {
  const content = (
    <Container>
      <p>Our data came from the <a href="https://www.nps.gov/subjects/digital/nps-data-api.htm">National Park Service API </a>and the <a href="https://developers.google.com/places/">Google Places API</a>. We used Postman to make REST calls to scrape data. Postman is an HTTP client with a GUI that allowed us to make REST calls to the APIs. We can also enter authorization keys and
      HTTP headers to parameterize queries, and view and take the returned JSON data.</p>
      <p>We used the <a href="https://github.com/BlackrockDigital/startbootstrap-business-casual">Business Casual </a>template from the <a href="https://startbootstrap.com/template-overviews/business-casual/">Start Bootstrap </a> site as our site template. This template was released under the MIT license.</p>
    </Container>
  );
  return (
    <CustomCard title="Our" strongTitle="Sources" content={content}/>
  )
}

function AboutProcess(props) {
  const content = (
    <Container>
      <p>Our data came from the <a href="https://www.nps.gov/subjects/digital/nps-data-api.htm">National Park Service API </a>and the <a href="https://developers.google.com/places/">Google Places API</a>. For this part of the project, we looked up and entered text manually; we did not scrape any sources. </p>
      <p>We used a variety of tools for this website, including Google Cloud Platform for hosting, Namecheap for the domain name, Github as a code repository, Trello for issue tracking, Apiary for API design, Postman for REST calls, Plan-It-Poker for     user stories, Slack for communication, and Git for version control.</p>
      <p>
        The code repository for this site: <a href="https://github.com/kbruton18/idb">Github</a><br />
        The issue tracker for this site: <a href="https://trello.com/b/zej73RSH/idb-phase-1">Trello</a><br />
        The API for this site: <a href="http://docs.kbruton18.apiary.io">Apiary</a><br />
        The technical report for phase 1 of the project: <a href="https://utexas.box.com/s/hex16czsb3svpacowrlt5ml5n8n6geae">Report</a>
      </p>
    </Container>
  );
  return (
    <CustomCard title="Our" strongTitle="Process" content={content}/>
  )
}

export default function About(props) {
  return (
    <div>
      <AboutSite/>
      <AboutTeam/>
      <AboutSources/>
      <AboutProcess/>
    </div>
  );
}
