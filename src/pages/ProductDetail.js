import React, { useState, useEffect } from 'react';
import { Container, Table, Row, Col, Card, Button, ButtonGroup, Form } from 'react-bootstrap';
import { BrowserRouter as Router, useParams, useRouteMatch } from "react-router-dom";
import { Text, Breadcrumb } from '../components/parts';
import Currency from '../Currency';
import { authenticationService } from '../services/authentication';
import config from '../config.json';

let pathDefault = [
  { name: 'Home', to: '/' },
  { name: 'Katalog Produk', to: '/produk' },
]

const user_id = authenticationService.user_id;

export default function ProductDetail(props) {
  const Swal = require("sweetalert2");
  const { productID, kategoriID } = useParams();
  const { url } = useRouteMatch();
  const [product, setProduct] = useState({
    "nama": "Formula 44",
    "harga": 15000,
    "qty": 15,
    "satuan": "Botol",
    "deskripsi": {
      "Exp Date": "08/03/2024",
      "Komposisi": "Paracetamol 120 mg"
    },
    "img_path": "/img/flu.png"
  });
  const [path, setPath] = useState(pathDefault);
  const [loading, setLoading] = useState(true);
  if (kategoriID) {
    fetch(`${config.base_url}/kategori/` + kategoriID)
      .then(res => res.json())
      .then(res => {
        pathDefault = [
          { name: 'Home', to: '/' },
          { name: 'Kategori', to: '/kategori' },
          { name: res.nama, to: `/kategori/${kategoriID}` }
        ]
        console.log('tes', pathDefault)
      })
  } const current = product.nama;

  useEffect(() => {
    setLoading(true);
    fetch(`${config.base_url}/produk/` + productID)
      .then(res => res.json())
      .then(res => {
        console.log('ha', product)
        res.img_path = config.base_url + '/' + res.img_path;
        setProduct({ id: res.id_produk, ...res })
        console.log('hi', product)
      })
      .then(res => {
        setLoading(false);
      })
  }, [])

  useEffect(() => {
    setPath(pathDefault);
    console.log('tes2', pathDefault)
    console.log('hmm', path)
    return () => {
      console.log('LAH')
    }
  }, [pathDefault])

  function addCart(total) {
    if (!user_id) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: 'Anda perlu Log In terlebih dahulu'
      })
      return;
    }

    let cart = {
      id_pembeli: user_id,
      id_produk: productID,
      jumlah: total
    }
    fetch(`${config.base_url}/keranjang/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(cart)
    })
      .then(res => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: 'Produk berhasil dimasukkan ke dalam keranjang'
        })
      })
      .catch(err => {
        console.log('Err: ', err);
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Terjadi kesalahan saat menambahkan produk'
        })
      })
  }

  return (
    <Container className="py-3">
      <div className={(loading) ? "loading d-flex justify-content-center align-items-center" : "done-loading"}>
        <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <Breadcrumb url={path} current={current} />
      <Row className="my-3">
        <ProductHead funct={addCart} {...product} />
      </Row>
      <Row className="my-3">
        <Col>
          <DeskripsiObat {...product} />
        </Col>
      </Row>
      {/* <Row className="my-3 mt-5">
        <Col>
          <h3>Produk kategori terkait</h3>
        </Col>
      </Row> */}
    </Container>
  )
}

function DeskripsiObat(props) {
  return (
    <Card className={"shadow border-0 p-3"}>
      <Text type="large-label" style={{ color: '#4E4B66' }}>Informasi Obat</Text>
      <Table className="body-text mt-3">
        <tbody>
          {
            Object.entries(props.deskripsi).map(([key, val], i) => {
              return (
                <tr key={"row-" + i} className={(i == 0) ? "table-borderless" : ""}>
                  <td className="py-3" style={{ minWidth: "10rem" }} key={"colkey-" + i}>{key} :</td>
                  <td style={{ whiteSpace: 'break-spaces' }} key={"colval-" + i}>{val}</td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </Card>
  )
}

function ProductHead(props) {
  const [count, setCount] = useState(1);

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
    <>
      <Col md={5} >
        <img className="w-100" src={props.img_path} />
      </Col>
      <Col md={7} >
        <Row className="my-2">
          <Col>
            <h3>{props.nama}</h3>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="d-flex align-items-center">
            <h3 className="text-green" style={{ display: "inline" }}>{Currency.format(props.harga)}</h3>
            <Text type="subtitle-1">/{props.satuan}</Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <Text type="subtitle-1">Stok : {props.qty} {props.satuan}</Text>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Row>
              <Col>
                <Text type="subtitle-1">Kuantitas</Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <ButtonGroup>
                  <Button onClick={() => { subs() }}>-</Button>
                  <Form.Control className="text-center" style={{ "maxWidth": "3rem" }} placeholder={count} type="text" disabled></Form.Control>
                  <Button onClick={() => { add() }}>+</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <Button onClick={() => { props.funct(count) }} className="py-2 px-5 large-label">Beli Sekarang</Button>
          </Col>
        </Row>
      </Col>
    </>
  )
}
