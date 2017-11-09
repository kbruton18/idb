import React from 'react';
import { Container } from 'reactstrap';
import CustomCard from './CustomCard.js';
import AboutStats from './AboutStats.js';

function AboutSite (props) {
  return (
    <Container className='bg-faded p-4 my-4'>
      <hr className='divider' />
      <h2 className='text-center text-lg text-uppercase my-0'>
        Our <strong> Site</strong>
      </h2>
      <hr className='divider' />
      <p>Always wanted to visit the great outdoors? Taking a road trip across America? Looking for a camping or hiking trip? SWEet Travels is for you!</p>
      <p>SWEet Travels has a database of national parks, campgrounds, visitor centers, and states. It's easy to find your next adventure.</p>
      <p>SWEet Travels was built by a group of college students who are passionate about the outdoors. We hope to inspire you to enjoy nature too!</p>
    </Container>
  );
}

function AboutSources (props) {
  const content = (
    <Container>
      <p>Our data came from the <a href='https://www.nps.gov/subjects/digital/nps-data-api.htm'>National Park Service API </a>and the <a href='https://developers.google.com/places/'>Google Places API</a>. We used Postman to make REST calls to scrape data. Postman is an HTTP client with a GUI that allowed us to make REST calls to the APIs. We can also enter authorization keys and
      HTTP headers to parameterize queries, and view and take the returned JSON data.</p>
      <p>We used the <a href='https://github.com/BlackrockDigital/startbootstrap-business-casual'>Business Casual </a>template from the <a href='https://startbootstrap.com/template-overviews/business-casual/'>Start Bootstrap </a> site as our site template. This template was released under the MIT license.</p>
    </Container>
  );
  return (
    <CustomCard title='Our' strongTitle='Sources' content={content} />
  );
}

function AboutProcess (props) {
  const content = (
    <Container>
      <p>Our data came from the <a href='https://www.nps.gov/subjects/digital/nps-data-api.htm'>National Park Service API </a>and the <a href='https://developers.google.com/places/'>Google Places API</a>. For this part of the project, we looked up and entered text manually; we did not scrape any sources. </p>
      <p>We used a variety of tools for this website, including Google Cloud Platform for hosting, Namecheap for the domain name, Github as a code repository, Trello for issue tracking, Apiary for API design, Postman for REST calls, Plan-It-Poker for     user stories, Slack for communication, and Git for version control.</p>
      <p>
        The code repository for this site: <a href='https://github.com/kbruton18/idb'>Github</a><br />
        The issue tracker for this site: <a href='https://trello.com/b/zej73RSH/idb-phase-1'>Trello</a><br />
        The API for this site: <a href='http://docs.kbruton18.apiary.io'>Apiary</a><br />
        The technical report for phase 1 of the project: <a href='https://utexas.box.com/s/fwed2ij9san9fpwtrjrubv31k47jxznrt5ml5n8n6geae'>Report</a><br />
        The technical report for phase 2 of the project: <a href='https://utexas.box.com/s/fwed2ij9san9fpwtrjrubv31k47jxznr'>Report</a><br />
        The technical report for phase 3 of the project: <a href='https://utexas.box.com/s/cc0tvmqt9b402ef38j45vj67glnuobv6'>Report</a><br />
        UML: <a href='https://utexas.box.com/s/m0ansejc67roe1x1hhngse049x2rddei'>UML</a>
      </p>
    </Container>
  );
  return (
    <CustomCard title='Our' strongTitle='Process' content={content} />
  );
}

export default function About (props) {
  return (
    <div>
      <AboutSite />
      <AboutStats />
      <AboutSources />
      <AboutProcess />
    </div>
  );
}
