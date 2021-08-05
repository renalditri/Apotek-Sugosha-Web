import React, { useState, useEffect } from "react";
import Welcome from '../components/Welcome';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import categories from '../assets/data/Categories.Data';
import products from '../assets/data/Products.Data';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { _CardDeck, Text } from '../components/parts'
import { authenticationService } from '../services/authentication';
import config from '../config.json';

function Home(props) {
  const [categoryList, setCategoryList] = useState(categories);
  const [productList, setProductList] = useState(products);
  const [loading, setLoading] = useState(true);
  const currentUser = authenticationService.currentUser;
  const Swal = require("sweetalert2");

  useEffect(() => {
    let dataFetch = {};
    fetch(`${config.base_url}/kategori`)
      .then(res => res.json())
      .then(res => {
        let arr = []
        res.map(r => {
          if (r.tampil) {
            arr.push({
              id: r.id_kategori,
              nama: r.nama,
              img_path: config.base_url + '/' + r.img_path
            })
          }
        })
        dataFetch.category = arr.slice(0, 6);
      })
      .then(res => {
        return fetch(`${config.base_url}/top`);
      })
      .then(res => res.json())
      .then(res => {
        res.map(r => {
          r.id = r.id_produk;
          r.img_path = config.base_url + '/' + r.img_path
        })
        dataFetch.product = res;
      })
      .then(res => {
        console.log('tes', dataFetch)
        setCategoryList(dataFetch.category);
        setProductList(dataFetch.product);
        if (props.history.location.state) {
          console.log(props.history.location.state)
          if (props.history.location.state.from.pathname == "/resep" && !currentUser) {
            Swal.fire({
              icon: 'error',
              title: 'Gagal',
              text: 'Anda perlu Log In terlebih dahulu'
            })
          }
        }
      })
      .then(res => {
        setLoading(false);
      })
      .catch(err => {
        console.error('Error: ', err);
        setLoading(false);
      })
  }, []);

  return (
    <Container fluid>
      <div className={(loading) ? "loading d-flex justify-content-center align-items-center" : "done-loading"}>
        <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
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
                <h2>Kategori Obat</h2>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex flex-row-reverse" xs={12}>
                <Text type="medium-label" isLink green to="/kategori">Lihat Semua</Text>
              </Col>
              <_CardDeck type="category" array={categoryList} url={'/kategori'} md={2} />
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
              <_CardDeck type="product" array={productList} url={'/produk'} md={3} />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="mt-5">
            <a href="https://api.whatsapp.com/send?phone=62811397719" target="_blank" >
              <img className="img-fluid" src="/img/whatsapp.png" />
            </a>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home;