import React from 'react';
import { Container } from 'reactstrap';

export default function CustomCard (props) {
  return (
    <Container className='bg-faded p-4 my-4'>
      <hr className='divider' />
      <h2 className='text-center text-lg text-uppercase my-0'>
        {props.title} <strong> {props.strongTitle}</strong>
      </h2>
      <hr className='divider' />
      {props.content}
    </Container>
  );
}
