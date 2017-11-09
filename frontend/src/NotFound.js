import React from 'react';
import CustomCard from './CustomCard.js';

// The display for if the user hits a random URL that doesn't exist in our website.
export default function NotFound (props) {
  return (
    <CustomCard title='Sorry' strongTitle="We couldn't find what you're looking for" />
  );
}
