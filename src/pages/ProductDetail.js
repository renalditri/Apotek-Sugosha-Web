import React, { useState } from 'react';
import { Container, Table, Row, Col, Card, Button, ButtonGroup, Form } from 'react-bootstrap';
import { BrowserRouter as Router, useParams, useRouteMatch } from "react-router-dom";
import { Text, Breadcrumb } from '../components/parts';
import products from '../assets/data/Products.Data';
import categories from '../assets/data/Categories.Data';
import Currency from '../Currency';

export default function ProductDetail(props) {
  const { productID, kategoriID } = useParams();
  const { url } = useRouteMatch();
  const product = findProduct(productID);
  let path = [
    { name: 'Home', to: '/' },
    { name: 'Katalog Produk', to: '/produk' },
  ]
  if (kategoriID) {
    const currentCategory = findCategory(kategoriID)
    path = [
      { name: 'Home', to: '/' },
      { name: 'Kategori', to: '/kategori' },
      { name: currentCategory.nama, to: `/kategori/${kategoriID}` }
    ]
  } const current = product.nama;

  return (
    <Container className="py-3">
      <Breadcrumb url={path} current={current} />
      <Row className="my-3">
        <ProductHead {...product} />
      </Row>
      <Row className="my-3">
        <Col>
          <DeskripsiObat {...product} />
        </Col>
      </Row>
      <Row className="my-3 mt-5">
        <Col>
          <h3>Produk kategori terkait</h3>
        </Col>
      </Row>
    </Container>
  )
}

function DeskripsiObat(props) {
  return (
    <Card className={"shadow border-0 p-3"}>
      <Text type="large-label" style={{ color: '#4E4B66;' }}>Informasi Obat</Text>
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
            <Button className="py-2 px-5 large-label">Beli Sekarang</Button>
          </Col>
        </Row>
      </Col>
    </>
  )
}

function findProduct(id) {
  return products.find(product => {
    return product.id == id;
  })
}

function findCategory(id) {
  return categories.find(category => {
    return category.id == id;
  })
}