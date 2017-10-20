import React, { Component } from 'react';
import logo from './logo.svg';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import CustomUncontrolledCarousel from './CustomUncontrolledCarousel.js';

const yosemite = require('./img/yosemite.jpg');
const grandcanyon = require('./img/grandcanyon.jpg');
const smoky = require('./img/smoky.jpg');
const camping = require('./img/camping.jpg');

const items = [
  {
    src: yosemite,
    title: 'Yosemite, California',
    caption: 'Enjoy cliffs, forests, mountains, lakes, and waterfalls',
    altText: 'Yosemite Waterfall'
  },
  {
    src: grandcanyon,
    title: 'Grand Canyon, Arizona',
    caption: 'See the 277 mile long, 18 mile wide canyon carved by the Colorado River',
    altText: 'Grand Canyon'
  },
  {
    src: smoky,
    title: 'Great Smoky Mountains, Tennessee and North Carolina',
    caption: 'Hike the Appalachian Trail and visit old settlements at Cades Cove',
    altText: 'Great Smoky Mountains'
  }
]

function Message(props) {
  return (
    <div class="text-center mt-4">
      <div class="text-heading text-muted text-lg">Welcome To</div>
      <h1 class="my-2">SWEet Travels</h1>
      <div class="text-heading text-muted text-lg">By Group 16
      </div>
    </div>
  );
}

function Head(props) {
  return (
    <Container className="bg-faded p-4 my-4">
      <Row>
        <Col>
          <CustomUncontrolledCarousel items={items} />
          <Message />
        </Col>
      </Row>
    </Container>
  );
}

function Intro(props) {
  return (
    <Container className="bg-faded p-4 my-4">
      <Row>
        <Col>
          <hr class="divider" />
          <h2 class="text-center text-lg text-uppercase my-0">Travel through
            <strong> nature</strong>
          </h2>
          <hr class="divider" />
          <img class="img-fluid float-left mr-4 d-none d-lg-block" src={camping} alt="Tent under stars" />
          <p>Always wanted to visit the great outdoors? Taking a road trip across America? Looking for a camping or hiking trip? SWEet Travels is for you!</p>
          <p>SWEet Travels has a database of national parks, campgrounds, visitor centers, and states. It's easy to find your next adventure.</p>
        </Col>
      </Row>
    </Container>
  )
}

export default function Home(props) {
  return (
    <div>
      <Head />
      <Intro />
    </div>
  )
}
