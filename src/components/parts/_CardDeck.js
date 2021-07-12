import React from 'react';
import { Col } from 'react-bootstrap';
import propTypes from 'prop-types';
import _Card from './_Card';
import Currency from '../../Currency';

export default function _CardDeck(props) {
  const { xs = false, sm = false, md = false, lg= false, xl = false, type="category" } = props;

  console.log('cardlist', props.array)

  if(type == 'product') {
    return props.array.map(item => {
      return (
        <Col key={'product-col-' + item.id} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
          <_Card
            key={'product-card' + item.id}
            id={item.id}
            type='product'
            src={item.img_path}
            title={item.nama}
            price={Currency.format(item.harga)}
            satuan={item.satuan}
            href={`${props.url}/${item.id}`}
          />
        </Col>
      )
    })
  }

  return props.array.map(category => {
    return (
      <Col key={'category-col-' + category.id} xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
        <_Card
          key={'category-card-' + category.id}
          id={category.id}
          type='category'
          src={category.img_path}
          title={category.nama}
          href={`${props.url}/${category.id}`}
        />
      </Col>
    )
  })
}

_CardDeck.propTypes = {
  type: propTypes.oneOf(['product', 'category']),
  array: propTypes.array,
  url: propTypes.string,
}