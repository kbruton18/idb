import React from 'react';
import { Container } from 'reactstrap';
import CustomCard from './CustomCard.js';

function About (props) {
  const content = (
    <Container>
      <p>
        This is our visualization of <a href='https://phonedb.info'>phonedb.info</a>. Red circles are models. Blue circles are carriers. Green circles are operating systems. Orange circles are brands. Lines represent the relationships between the different instances.
      </p>
    </Container>
  );
  return (
    <CustomCard title='About Our' strongTitle='Visualization' content={content} />
  );
}

function Usage (props) {
  const content = (
    <Container>
      <p>Scroll in and out to change the zoom level</p>
      <p>Click and drag on the background to change the frame</p>
      <p>Click and drag on an instance to move them</p>
      <p>Click on an instance to show its neighborhood</p>
    </Container>
  );
  return (
    <CustomCard title='Using Our' strongTitle='Visualization' content={content} />
  );
}

function Frame (props) {
  const content = (
    <Container>
      <iframe src='http://test.swetravels.me/vis.html' scrolling='no' frameborder='0' style={{position: 'relative', height: '800px', width: '100%'}} />
    </Container>
  );
  return (
    <CustomCard title='Our' strongTitle='Visualization' content={content} />
  );
}

export default function Vis (props) {
  return (
    <div>
      <About />
      <Usage />
      <Frame />
    </div>
  );
}
