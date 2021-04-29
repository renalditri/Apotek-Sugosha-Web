import React from "react";
import Welcome from '../components/Welcome';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import categories from '../assets/data/Categories.Data';
import products from '../assets/data/Products.Data';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { _CardDeck, Text } from '../components/parts'

function Home() {
  return (
    <Container fluid>
      <Row className="home pt-5" style={{ backgroundImage: "url('/img/Circle.png')" }}>
        <Container>
          <Row>
            <Welcome />
          </Row>
        </Container>
      </Row>
      <Container>
        <Row className="mt-5">
          <Col className="mt-5">
            <Row>
              <Col>
                <h2>Kategori Populer</h2>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex flex-row-reverse" xs={12}>
                <Text type="medium-label" isLink green to="/kategori">Lihat Semua</Text>
              </Col>
              <_CardDeck type="category" array={categories} url={'/kategori'} md={2} />
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Row>
              <Col>
                <h2>Produk Populer</h2>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex flex-row-reverse" xs={12}>
                <Text type="medium-label" isLink green to="/produk">Lihat Semua</Text>
              </Col>
              <_CardDeck type="product" array={products} url={'/produk'} md={3} />
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home;