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

const items = [
  {
    src: yosemite,
    title: 'Yosemite, California',
    caption: 'Enjoy cliffs, forests, mountains, lakes, and waterfalls'
  },
  {
    src: grandcanyon,
    title: 'Grand Canyon, Arizona',
    caption: 'See the 277 mile long, 18 mile wide canyon carved by the Colorado River'
  },
  {
    src: smoky,
    title: 'Great Smoky Mountains, Tennessee and North Carolina',
    caption: 'Hike the Appalachian Trail and visit old settlements at Cades Cove'
  }
]

function Title(props) {
  return (
    <div>
      <div class="tagline-upper text-center text-heading text-shadow text-white mt-5 d-none d-lg-block">SWEet Travels</div>
      <div class="tagline-lower text-center text-expanded text-shadow text-uppercase text-white mb-5 d-none d-lg-block">CS 373 Fall 2017 | Group 16</div>
    </div>
  );
}

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

function Home(props) {
  return (
    <div>
      <Title />
      <Head />
    </div>
  )
}

export {Home};
