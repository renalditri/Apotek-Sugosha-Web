import React, { useState } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { useParams, useRouteMatch, Router, Link } from "react-router-dom";
import categories from '../assets/data/Categories.Data';
import categoryProduct from '../assets/data/CategoryProduct.Data';
import products from '../assets/data/Products.Data';
import { _CardDeck, Text, Breadcrumb } from '../components/parts'

export default function Category(props) {
  const { kategoriID } = useParams();
  const { url } = useRouteMatch();
  const category = findCategory(kategoriID);
  const products = (typeof (category) !== 'undefined') ? findProducts(category.id) : false;
  const path = [{ name: 'Home', to: '/' }, { name: 'Kategori', to: '/kategori' }]
  const current = category.nama;

  if (category) {
    return (
      <Container>
        <Breadcrumb className="mt-3" url={path} current={current} />
        <Row className="mt-3">
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9}>
            <Row>
              <Col>
                <h1>{category.nama}</h1>
                <Text type="lead">Menampilkan {products.length} Obat</Text>
              </Col>
            </Row>
            <Row className="mt-2 mb-4">
              <Col md={7} />
              <Col className="m-auto" md={1}>
                <Text style={{ fontWeight: 'bold' }} type="body">Urutkan</Text>
              </Col>
              <Col md={4}>
                <Form.Control className="body-text" as="select" custom>
                  <option>Urutkan nama A-Z</option>
                  <option>Urutkan nama Z-A</option>
                  <option>Pembelian Terbanyak</option>
                  <option>Ulasan Terbanyak</option>
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <_CardDeck type="product" array={products} url={url} md={4} />
            </Row>
          </Col>
        </Row>
      </Container>
    )
  } else {
    return (
      <Container>
        <h1>404 Not Found</h1>
      </Container>
    )
  }
}

function Sidebar(props) {
  const { kategoriID } = useParams();
  const [categoryList, setCategoryList] = useState(categories);

  function search(e, categories) {
    console.log(e.target.value);
    setCategoryList(categories.filter(category => {
      if (category.nama.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())) return true;
      return false;
    }))
  }

  return (
    <Card className="shadow border-0 p-3">
      <Row>
        <Col>
          <Text type="large-label">Kategori</Text>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col>
          <Form.Control className="body-text" onChange={(e) => { search(e, categories) }} type="text" placeholder="Cari Kategori" />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col style={{ maxHeight: "380px", overflowY: "scroll" }}>
          {categoryList.map((item, i) => {
            const isActive = (kategoriID == item.id) ? "active" : "";
            return (
              <Row className="mt-1" key={`r-${i}`}>
                <Col key={`c-${i}`}>
                  <Text isLink key={`ctgrs-${i}`} className={isActive} to={`/kategori/${item.id}`}>{item.nama}</Text>
                </Col>
              </Row>
            )
          })}
        </Col>
      </Row>
    </Card>
  )
}

function findProducts(id_category) {
  let items = [];
  categoryProduct.forEach((item) => {
    if (item.id_kategori == id_category) {
      items.push(item.id_produk);
    }
  })

  return products.filter((product) => {
    return items.some((item) => {
      if (item == product.id) return true;
      return false;
    })
  });
}

function findCategory(id) {
  return categories.find(category => {
    return category.id == id;
  })
}