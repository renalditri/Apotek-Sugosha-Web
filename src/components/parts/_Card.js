import React from 'react';
import Card from 'react-bootstrap/Card';
import { BrowserRouter as Router, Link } from "react-router-dom";
import propTypes from 'prop-types';
import Text from './Text';

export default function _Card(props) {
  if (props.type === 'product') {
    return (
      <Link className="card-link" to={props.href}>
        <Card className="product-card" key={'product-card-' + props.id}>
          <Card.Img className="product-img" key={'product-card-img-' + props.id} src={process.env.PUBLIC_URL + props.src} />
          <Card.Body key={'product-card-body-' + props.id}>
            <Card.Title key={'product-card-title-' + props.id}>
              <Text type="large-label">{props.title}</Text>
            </Card.Title>
            <Card.Text key={'product-card-price-' + props.id}>
              <Text type="large-label" inline green>{props.price}</Text>
              <Text type="small-label" inline>/{props.satuan}</Text>
            </Card.Text>
          </Card.Body>
        </Card>
      </Link>
    )
  }

  return (
    <Link to={props.href}>
      <Card className="category-card" key={'card-' + props.id}>
        <Card.Img className="category-img" key={'card-img-' + props.id} src={props.src} />
        <Card.Body key={'card-body-' + props.id}>
          <Text type="medium-label" className="text-center" key={'card-title-' + props.id}>{props.title}</Text>
        </Card.Body>
      </Card>
    </Link>
  )
}

_Card.propTypes = {
  type: propTypes.oneOf(['product', 'category']),
  href: propTypes.string,
  title: propTypes.string,
  satuan: propTypes.string,
  cardProps: propTypes.object,
  id: propTypes.oneOfType([
    propTypes.string,
    propTypes.number
  ]),
}
