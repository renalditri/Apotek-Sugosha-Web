import React, { useState } from 'react'
import { Card, Row, Col, ButtonGroup, Button, Form } from 'react-bootstrap'
import Delete from '../../assets/img/Delete.png'
import Currency from '../../Currency'
import Text from './Text'

export default function CartItem(props) {
  const [count, setCount] = useState(props.jumlah);
  function add() {
    if ((count + 1) <= props.qty) {
      setCount(count + 1);
    }
  }
  function subs() {
    if ((count - 1) > 0) {
      setCount(count - 1);
    }
  }

  return (
    <Card className="mb-3">
      <Row className="p-2">
        <Col md={3}>
          <img className="img-fluid" src={props.img_path} />
        </Col>
        <Col className="d-flex align-items-center" md={5}>
          <div>
            <Text className="mb-2" type="large-label">{props.nama.toUpperCase()}</Text>
            <Text type="large-label" inline green>{Currency.format(props.harga)}</Text>
            <Text type="small-label" inline>/{props.satuan}</Text>
          </div>
        </Col>
        <Col className="d-flex align-items-center" md={4}>
          <Row>
            <Col sm={8}>
              <ButtonGroup>
                <Button onClick={() => { subs() }}>-</Button>
                <Form.Control className="text-center" style={{ "maxWidth": "3rem" }} placeholder={count} type="text" disabled></Form.Control>
                <Button onClick={() => { add() }}>+</Button>
              </ButtonGroup>
            </Col>
            <Col className="d-flex align-items-center" sm={4}>
              <button className="non-button"><img src={Delete} /></button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}
