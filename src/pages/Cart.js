import React, { useState, useEffect } from 'react';
import { CartItem, Text } from '../components/parts';
import plCarts from '../assets/data/Carts.Data';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Currency from '../Currency';
import { LinkContainer } from 'react-router-bootstrap';

const user_id = 1;
let update = false;

export default function Cart() {
  const [carts, setCarts] = useState(plCarts);

  useEffect(() => {
    fetch('http://localhost:4000/keranjang/' + user_id)
      .then(res => res.json())
      .then(res => {
        res.produk.map(r => {
          r.img_path = 'http://localhost:4000/' + r.img_path;
        })
        setCarts(res);
      })
  }, [])

  const changeCount = (count, user_id, product_id) => {
    fetch(`http://localhost:4000/keranjang/${user_id}/${product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jumlah: count
      })
    })
    .then(res => {
      console.log(res);
      update = !update;
    })
    .catch(err => {
      console.log('Err: ', err);
    })
  }

  const deleteCart = (user_id, product_id) => {
    fetch(`http://localhost:4000/keranjang/${user_id}/${product_id}`, {
      method: 'DELETE',
    })
    .then(res => {
      console.log(res);
      update = !update;
    })
    .catch(err => {
      console.log('Err: ', err);
    })
  }

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
          <CheckoutCard products={carts.produk} />
        </Col>
      </Row>
    </Container>
  )

  function CheckoutCard(props) {
    const { products } = props;
    const items = () => {
      let x = { jumlah: 0, harga: 0, };
      products.forEach((cart) => {
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
    return carts.produk.map((cart, i) => {
      return (
        <CartItem {...cart} key={"item-" + i} funct={changeCount} del={deleteCart} user={user_id} />
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