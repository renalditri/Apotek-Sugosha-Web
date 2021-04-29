import React, { useState } from 'react';
import { CartItem, Text } from '../components/parts';
import carts from '../assets/data/Carts.Data';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Currency from '../Currency';
import { LinkContainer } from 'react-router-bootstrap';

export default function Cart() {
  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <h1>Keranjang</h1>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          {cartItems()}
        </Col>
        <Col md={4}>
          <CheckoutCard />
        </Col>
      </Row>
    </Container>
  )

  function CheckoutCard() {
    const items = () => {
      let x = { jumlah: 0, harga: 0, };
      carts.forEach((cart) => {
        x.jumlah += cart.jumlah;
        x.harga += cart.harga * cart.jumlah;
      })
      return x;
    }

    return (
      <Card className="p-3">
        <Text className="mb-3" type="large-label">Ringkasan Keranjang</Text>
        <div>
          <Text type="body" className="m-0 my-1" style={{ float: "left" }}>Total Obat</Text>
          <Text type="body" className="m-0 my-1" style={{ float: "right" }}>{items().jumlah} Obat</Text>
        </div>
        <div className="active">
          <Text green type="large-label" style={{ float: "left" }}>Total Harga</Text>
          <Text green type="large-label" style={{ float: "right" }}>{Currency.format(items().harga)}</Text>
        </div>
        <LinkContainer to="/checkout"><Button className="mt-3 w-100">Checkout</Button></LinkContainer>
      </Card>
    )
  }

  function cartItems() {
    return carts.map((cart, i) => {
      return (
        <CartItem {...cart} key={"item-" + i} />
      )
    })
  }

}

// function findProducts(id_user) {
//   let items = [];
//   carts.forEach((cart) => {
//     if (cart.id_user == id_user) {
//       items.push(cart.id_produk);
//     }
//   })
//   return products.filter((product) => {
//     return items.some((item) => {
//       if (item == product.id) return true;
//       return false;
//     })
//   });
// }