import React from 'react';
import GenericLanding from './GenericLanding.js';
import { processFetch } from './Filter.js';
import { Link } from 'react-router-dom';
import { Col, Card,
         CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

export default function ParkLanding (props) {
  const dUrl = 'https://sweet-travels.appspot.com/api/campgrounds';
  const fPromises = [processFetch.bind(null, 'https://sweet-travels.appspot.com/api/states', 'abbreviations'), processFetch.bind(null, 'https://sweet-travels.appspot.com/api/campgrounds', 'parkName')];
  const asf = function (first, second) {
    if (first.name < second.name) return -1;
    if (first.name > second.name) return 1;
    return 0;
  };
  const dsf = function (first, second) {
    if (first.name < second.name) return 1;
    if (first.name > second.name) return -1;
    return 0;
  };
  const cf = function (d) {
      // Checks to see if there is a direction URL to link
    const directionUrlLink = () => {
      if (d.directionsUrl !== 'None') {
        return (<a href={d.directionsUrl}>{d.directionsUrl}</a>);
      }
      return <a>{d.directionsUrl}</a>;
    };

      // Checks to see if there is a regulation URL to link
    const regulationUrlLink = () => {
      if (d.regulationsUrl !== 'None') {
        return (<a href={d.regulationsUrl}>{d.regulationsUrl}</a>);
      }
      return <a>{d.regulationsUrl}</a>;
    };

      // Returns information for each card that we plan to render.
    return (
      <Col lg='4' md='6' sm='12'>
        <Card className='text-center'>
          <Link to={`/campgrounds/${d.name}`}>
            <CardImg top width='100%' height='250px' src={d.imageUrl} alt='campground' />
          </Link>
          <CardBody>
            <CardTitle className='text-center'>{d.name}</CardTitle>
            <CardText>
              <b>Total Sites</b>: {d.totalSites}<br />
              <b>Associated Park</b>: <Link to={`/parks/${d.parkCode}`}>{d.parkCode}</Link><br />
              <b>Description</b>: {d.description}<br />
              <b>Regulations URL</b>: {regulationUrlLink()}<br />
              <b>Directions URL</b>: {directionUrlLink()}
            </CardText>
          </CardBody>
        </Card>
      </Col>
    );
  };

  return (
    <GenericLanding title={'states'} dataUrl={dUrl} fetchPromises={fPromises} ascendingSortFunction={asf} descendingSortFunction={dsf} cardFunction={cf} />
  );
}
