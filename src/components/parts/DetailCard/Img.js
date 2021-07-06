import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Text from '../Text';

export default function resepImage(props) {
  const { statusData } = props;
  if (statusData.jenis == 1) {
    return (
      <Col md={3}>
        <img className="img-fluid" src={statusData.foto_resep} />
      </Col>
    )
  }
  return '';
}