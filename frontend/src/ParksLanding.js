import React from 'react';
import GenericLanding from './GenericLanding.js';
import { processFetch } from './Filter.js';
import { Link } from 'react-router-dom';
import { Col, Card,
         CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

export default function ParkLanding (props) {
  const dUrl = 'https://sweet-travels.appspot.com/api/parks';
  const fPromises = [processFetch.bind(null, 'https://sweet-travels.appspot.com/api/states', 'abbreviations')];
  const asf = function (first, second) {
    if (first.fullName < second.fullName) return -1;
    if (first.fullName > second.fullName) return 1;
    return 0;
  };
  const dsf = function (first, second) {
    if (first.fullName < second.fullName) return 1;
    if (first.fullName > second.fullName) return -1;
    return 0;
  };
  const cf = function (d) {
      // There can be multiple states per park. In the database this is a comma
      // separated string so we need to split it up so we can link each individually.
    const stateList = String(d.states).split(',');
    const stateLinks = stateList.map((s) => {
      if (stateList[stateList.length - 1] === s) {
        return (
          <span><Link to={`/states/${s}`}>{s}</Link></span>
        );
      }
      return (
        <span><Link to={`/states/${s}`}>{s}</Link>, </span>
      );
    });

      // There can be multiple campgrounds per park or none. In the database this is a
      // comma separated string so we need to split it up so we can link each individually.
    const campgroundList = String(d.campgrounds).split(', ');
    const campgroundLinks = campgroundList.map((c) => {
      if (d.campgrounds !== 'None') {
        if (campgroundList[campgroundList.length - 1] === c) {
          return (
            <a><Link to={`/campgrounds/${c}`}>{c}</Link></a>
          );
        }
        return (
          <a><Link to={`/campgrounds/${c}`}>{c}</Link>, </a>
        );
      }
      return <a>{d.campgrounds}</a>;
    });
      // Returns information for each card that we plan to render.
    return (
      <Col lg='4' md='6' sm='12'>
        <Card className='text-center'>
          <Link to={`/parks/${d.parkCode}`}>
            <CardImg top width='100%' height='250px' src={d.imageUrl} alt='park' />
          </Link>
          <CardBody>
            <CardTitle className='text-center'>{d.fullName}</CardTitle>
            <CardText>
              <b>Park Code</b>: {d.parkCode}<br />
              <b>Designation</b>: {d.designation}<br />
              <b>State(s)</b>: {stateLinks}<br />
              <b>Campgrounds(s)</b>: {campgroundLinks}<br />
              <b>Website</b>: <a href={d.url}>{d.url}</a>
            </CardText>
          </CardBody>
        </Card>
      </Col>
    );
  };

  return (
    <GenericLanding title={'parks'} dataUrl={dUrl} fetchPromises={fPromises} ascendingSortFunction={asf} descendingSortFunction={dsf} cardFunction={cf} />
  );
}
