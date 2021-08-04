import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { useLocation, useRouteMatch, Router, Link } from "react-router-dom";
import plCategories from '../assets/data/Categories.Data';
import plProducts from '../assets/data/Products.Data';
import { _CardDeck, Text, Breadcrumb } from '../components/parts';
import config from '../config.json';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Product() {
  const { url } = useRouteMatch();
  const path = [{ name: 'Home', to: '/' }]
  const current = 'Katalog Produk';
  const [categoryList, setCategoryList] = useState(plCategories);
  const [products, setProducts] = useState(plProducts);
  const [loading, setLoading] = useState(true);
  const query = useQuery();

  useEffect(() => {
    setLoading(true);
    fetch(`${config.base_url}/kategori`)
      .then(res => res.json())
      .then(res => {
        res.map(r => {
          r.id = r.id_kategori;
          delete r.id_kategori;
        })
        setCategoryList(res);
        return fetch(`${config.base_url}/produk`)
      })
      .then(res => res.json())
      .then(res => {
        res.map(r => {
          r.id = r.id_produk;
          delete r.id_produk;
          r.img_path = config.base_url + '/' + r.img_path;
        })
        setProducts(search(query.get('search'), res));
        console.log("resting")
      })
      .then(res => {
        setLoading(false);
      })
      .catch(err => {
        console.log("Error", err);
        setLoading(false);
      })
  }, [query.get('search')])


  const isReverse = (e) => {
    console.log(e.target.value);
    setProducts([...products.reverse()])
  }

  return (
    <Container>
      <div className={(loading) ? "loading d-flex justify-content-center align-items-center" : "done-loading"}>
        <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <Breadcrumb className="mt-5" url={path} current={current} />
      <Row className="mt-3">
        <Col md={3}>
          <Sidebar categories={categoryList} />
        </Col>
        <Col md={9}>
          <Row>
            <Col>
              <h1>Katalog Produk</h1>
              <Text type="lead">{(query.get('search')) ? 'Menampilkan Pencarian Produk ' + query.get("search") : ''}</Text>
            </Col>
          </Row>
          <Row className="mt-2 mb-4">
            <Col md={7} />
            <Col className="m-auto" md={1}>
              <Text style={{ fontWeight: 'bold' }} type="body">Urutkan</Text>
            </Col>
            <Col md={4}>
              <Form.Control className="body-text" as="select" custom onChange={(e) => { isReverse(e) }}>
                <option value="Urut">Urutkan nama A-Z</option>
                <option value="Balik">Urutkan nama Z-A</option>
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <_CardDeck key={products} type="product" array={products} url={url} md={4} />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

function search(value, productList) {
  if (value) {
    return productList.filter(product => {
      if (product.nama.toLowerCase().trim().includes(value.toLowerCase().trim())) return true;
      return false;
    })
  }
  return productList;
}


function Sidebar(props) {
  const kategoriID = parseInt(props.url);
  const categories = props.categories;
  const [categoryList, setCategoryList] = useState(props.categories);

  useEffect(() => {
    setCategoryList(props.categories)
  }, [categories])

  function search(e, categories) {
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
          <Form.Control
            className="body-text"
            onChange={(e) => { search(e, categories) }}
            type="text"
            placeholder="Cari Kategori"
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col style={{ maxHeight: "380px", overflowY: "scroll" }}>
          {categoryList.map((item, i) => {
            const isActive = (kategoriID == item.id) ? "active" : "";
            if (item.tampil) {
              return (
                <Row className="mt-1" key={`r-${i}`}>
                  <Col key={`c-${i}`}>
                    <Text isLink key={`ctgrs-${i}`} className={isActive} to={`/kategori/${item.id}`}>{item.nama}</Text>
                  </Col>
                </Row>
              )
            } else { return; }
          })}
        </Col>
      </Row>
    </Card>
  )
}

