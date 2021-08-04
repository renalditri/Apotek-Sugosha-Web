import React, { useState, useEffect } from 'react';
import { CartItem, Text } from '../components/parts';
import plCarts from '../assets/data/Carts.Data';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Currency from '../Currency';
import { LinkContainer } from 'react-router-bootstrap';
import { authenticationService } from '../services/authentication';
import config from '../config.json';

const user_id = authenticationService.user_id;

export default function Cart(props) {
  const [carts, setCarts] = useState(plCarts);
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(true);
  const Swal = require("sweetalert2");
  useEffect(() => {
    fetch(config.base_url + `/keranjang/${user_id}`)
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          res.produk.map(r => {
            r.img_path = config.base_url + '/' + r.img_path;
          })
          setCarts({ ...res });
          return;
        }
        setCarts({ produk: [] })
      })
      .then(res => {
        setLoading(false);
      })
  }, [])

  const changeCount = (i, count, user_id, product_id) => {
    console.log('product: ' + i);
    const new_carts = { ...carts }
    console.log(carts);
    fetch(config.base_url + `/keranjang/${user_id}/${product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jumlah: count
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        new_carts.produk[i].jumlah = res.jumlah;
        setCarts({ ...new_carts });
      })
      .catch(err => {
        console.log('Err: ', err);
      })
  }

  const deleteCart = (user_id, product_id) => {
    fetch(config.base_url + `/keranjang/${user_id}/${product_id}`, {
      method: 'DELETE',
    })
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Barang berhasil dihapus dari keranjang",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log(res);
        return fetch(config.base_url + `/keranjang/${user_id}`)
      })
      .then(res => res.json())
      .then(res => {
        if (!res.message) {
          res.produk.map(r => {
            r.img_path = config.base_url + '/' + r.img_path;
          })
          setCarts({ ...res });
          return;
        }
        setCarts({ produk: [] })
      })
      .catch(err => {
        console.log('Err: ', err);
      })
  }

  return (
    <Container>
      <div className={(loading) ? "loading d-flex justify-content-center align-items-center" : "done-loading"}>
        <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
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
          {CheckoutCard()}
        </Col>
      </Row>
    </Container>
  )

  function CheckoutCard() {
    const products = carts.produk;
    const items = () => {
      let x = { jumlah: 0, harga: 0, };
      products.forEach((cart) => {
        x.jumlah += cart.jumlah;
        x.harga += cart.harga * cart.jumlah;
      })
      return x;
    }

    console.log(valid);

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
        {(carts.produk.length > 0 && valid) ?
          <LinkContainer to="/checkout"><Button className="mt-3 w-100">Checkout</Button></LinkContainer>
          :
          <Button disabled className="mt-3 w-100">Checkout</Button>
        }
      </Card>
    )
  }

  function cartItems() {
    return carts.produk.map((cart, i) => {
      return (
        <CartItem {...cart} key={"item-" + i} i={i} setValid={setValid} funct={changeCount} del={deleteCart} user={user_id} />
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