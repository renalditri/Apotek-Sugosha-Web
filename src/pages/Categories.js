import React, { useState, useEffect } from 'react';
import { _CardDeck, Text, Breadcrumb } from '../components/parts';
import { Row, Col, Container, Form } from 'react-bootstrap';
import { BrowserRouter as Router, useRouteMatch } from "react-router-dom";
import categories from '../assets/data/Categories.Data';

export default function Categories() {
  const { url } = useRouteMatch();
  const [categoryList, setCategoryList] = useState(categories);
  const path = [{ name: 'Home', to: '/' }]
  const current = 'Kategori'

  useEffect(() => {
    fetch('http://localhost:4000/kategori')
    .then(res => res.json())
    .then(res => {
      let arr = []
      res.map(r => {
        if(r.tampil) {
          arr.push({
            id: r.id_kategori,
            nama: r.nama,
            img_path: 'http://localhost:4000/' + r.img_path
          })
        }
      })
      setCategoryList(arr)
    })
    .catch(err => {
      console.error('Error: ', err)
    })
  }, []);

  function search(e, categories) {
    console.log(e.target.value);
    setCategoryList(categories.filter(category => {
      if (category.nama.toLowerCase().trim().includes(e.target.value.toLowerCase().trim())) return true;
      return false;
    }))
  }

  return (
    <Container>
      <Breadcrumb className="mt-3" url={path} current={current} />
      <Row>
        <Col>
          <h1>Kategori Produk</h1>
          <Text type="lead">Pilih kategori produk berdasarkan keperluan</Text>
        </Col>
      </Row>
      <Row className="my-4">
        <Col xs={8}>
          <Row>
            <Col xs={6}>
              <Form.Control className="body-text" onChange={(e) => search(e, categories)} type="text" placeholder="Cari Kategori" />
            </Col>
          </Row>
        </Col>
        <Col className="text-center mb-0 m-auto" xs={1}>
          <Text style={{ fontWeight: 'bold' }} type="body">Urutkan</Text>
        </Col>
        <Col xs={3}>
          <Form.Control className="body-text" as="select" custom>
            <option>Urutkan nama A-Z</option>
            <option>Urutkan nama Z-A</option>
          </Form.Control>
        </Col>
      </Row>
      <Row>
        <_CardDeck type="category" array={categoryList} url={url} md={2} xs={4} />
      </Row>
    </Container>
  )
}
