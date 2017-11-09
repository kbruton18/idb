import React from 'react';

// Renders the title of the website.
export default function Title (props) {
  return (
    <div>
      <div className='tagline-upper text-center text-heading text-shadow text-white mt-5 d-none d-lg-block'>SWEet Travels</div>
      <div className='tagline-lower text-center text-expanded text-shadow text-uppercase text-white mb-5 d-none d-lg-block'>CS 373 Fall 2017 | Group 16</div>
    </div>
  );
}
