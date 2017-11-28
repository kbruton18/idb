import React from 'react';
import GenericLanding from './GenericLanding.js';
import { processFetch } from './Filter.js';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
import DetailsCard from './DetailsCard.js';

export default function ParkLanding (props) {
  const dUrl = 'https://sweet-travels.appspot.com/api/visitorcenters';
  const fPromises = [processFetch.bind(null, 'https://sweet-travels.appspot.com/api/states', 'abbreviations')];
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
      // In the database latLong looks like: {lat:######, lng:######}
      // Breaking it apart to enhance display. If the database does
      // not contain it display "N/A" for both.
    const latLong = String(d.latLong).split(', lng:');
    var lat = String(latLong[0]).replace('{lat:', '');
    var long = String(latLong[1]).replace('}', '');
    if (lat.length === 0) {
      lat = 'N/A';
      long = 'N/A';
    }

      // Checks to see if there is a url to link
    const directionUrlLink = () => {
      if (d.directionsUrl !== 'None') {
        return (<a href={d.directionsUrl}>{d.directionsUrl}</a>);
      }
      return <a>{d.directionsUrl}</a>;
    };

    let body = (
      <Container>
        <b>Park</b>: <Link to={`/parks/${d.parkCode}`}>{d.parkCode}</Link><br />
        <b>State</b>: <Link to={`/states/${d.states}`}>{d.states}</Link><br />
        <b>Latitude</b>: {lat}<br />
        <b>Longitude</b>: {long}<br />
        <b>Directions</b>: {directionUrlLink()}<br />
        <b>Website</b>: <a href={d.website}>{d.website}</a>
      </Container>
    );

      // Returns information for each card that we plan to render.
    return (
      <DetailsCard linkUrl={`/visitorcenters/${d.name}`} imageUrl={d.imageUrl} name={d.name} body={body} />
    );
  };

  return (
    <GenericLanding title={'visitor centers'} dataUrl={dUrl} fetchPromises={fPromises} ascendingSortFunction={asf} descendingSortFunction={dsf} cardFunction={cf} />
  );
}
