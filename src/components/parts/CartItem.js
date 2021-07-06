import React, { useState, useEffect } from 'react'
import { Card, Row, Col, ButtonGroup, Button, Form } from 'react-bootstrap'
import Delete from '../../assets/img/Delete.png'
import Currency from '../../Currency'
import Text from './Text'

export default function CartItem(props) {
  const { jumlah, funct, del, user, setValid } = props;
  console.log('jumlah', jumlah)
  const [count, setCount] = useState(jumlah);
  let errorClass = '';

  useEffect(() => {
    setCount(jumlah)
  }, [jumlah])

  function adds() {
    if ((count + 1) <= props.qty) {
      setCount(count + 1);
      funct(count + 1, user, props.id_produk);
    }
  }
  function subs() {
    if ((count - 1) > 0) {
      setCount(count - 1);
      funct(count - 1, user, props.id_produk);
      if (count > props.qty) { setValid(true) }
    }
  }
  function dels() {
    del(user, props.id_produk);
  }

  function errorMessage() {
    if (count > props.qty) {
      setValid(false);
      errorClass = 'error-cart';
      return (
        <Card.Footer className='p-0 m-0 rounded-0 rounded-bottom'>
          <p className='body text-center p-2 m-0 alert alert-danger rounded-0'>Stok produk tidak mencukupi</p>
        </Card.Footer>
      );
    }
  }

  return (
    <div className={errorClass}>
      <Card className="mb-3">
        <Row className="p-2">
          <Col md={3}>
            <img className="img-fluid" src={props.img_path} />
          </Col>
          <Col className="d-flex align-items-center" md={5}>
            <div>
              <Text className="mb-2" type="large-label">{props.nama_produk.toUpperCase()}</Text>
              <Text type="large-label" inline green>{Currency.format(props.harga)}</Text>
              <Text type="small-label" inline>/{props.satuan}</Text>
            </div>
          </Col>
          <Col className="d-flex align-items-center" md={4}>
            <Row>
              <Col sm={8}>
                <ButtonGroup>
                  <Button onClick={() => { subs() }}>-</Button>
                  <Form.Control className="text-center" style={{ "maxWidth": "3.5rem" }} placeholder={count} type="text" disabled></Form.Control>
                  <Button onClick={() => { adds() }}>+</Button>
                </ButtonGroup>
              </Col>
              <Col className="d-flex align-items-center" sm={4}>
                <button onClick={() => { dels() }} className="non-button"><img src={Delete} /></button>
              </Col>
            </Row>
          </Col>
        </Row>
        {errorMessage()}
      </Card>
    </div>
  );
}
