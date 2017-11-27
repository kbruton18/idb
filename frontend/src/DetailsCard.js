import React from 'react';
import { Col, Card, CardImg, CardTitle, CardText, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

// Generic card.
export default function DetailsCard (props) {
  return (
    <Col lg='4' md='6' sm='12'>
      <Card className='text-center'>
        <Link to={props.linkUrl}>
          <CardImg top width='100%' height='250px' src={props.imageUrl} alt='visitor center' />
        </Link>
        <CardBody>
          <CardTitle className='text-center'>{props.name}</CardTitle>
          <CardText>
            {props.body}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
}
