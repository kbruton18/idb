import React from 'react';
import GenericLanding from './GenericLanding.js';
import { processFetch } from './Filter.js';
import { Link } from 'react-router-dom';
import { Col, Card,
         CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

export default function ParkLanding (props) {
  const dUrl = 'https://sweet-travels.appspot.com/api/states';
  const fPromises = [processFetch.bind(null, 'https://sweet-travels.appspot.com/api/states', 'timeZone')];
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
      // There can be multiple parks per state or none. In the database this is a comma
      // separated string so we need to split it up so we can link each individually.
    const parkList = String(d.nationalParks).split(',');
    const parkLinks = parkList.map((p) => {
      if (d.nationalParks !== 'None') {
        if (parkList[parkList.length - 1] === p) {
          return (
            <span><Link to={`/parks/${p}`}>{p}</Link></span>
          );
        }
        return (
          <span><Link to={`/parks/${p}`}>{p}</Link>, </span>
        );
      }
      return <span>{d.nationalParks}</span>;
    });

  // Returns information for each card that we plan to render.
    return (
      <Col lg='4' md='6' sm='12'>
        <Card className='text-center'>
          <Link to={`/states/${d.abbreviations}`}>
            <CardImg top width='100%' height='250px' src={d.imageUrl} alt='State flag' />
          </Link>
          <CardBody>
            <CardTitle className='text-center'>{d.name}</CardTitle>
            <CardText>
              <b>Abbreviations: </b>{d.abbreviations}<br />
              <b>Nickname(s): </b>{d.nicknames}<br />
              <b>Capital: </b>{d.capital}<br />
              <b>Timezone: </b>{d.timeZone}<br />
              <b>National Park(s):</b> {parkLinks}
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
