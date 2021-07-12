import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card } from 'react-bootstrap';
import { useParams, useRouteMatch, Router, Link } from "react-router-dom";
import plCategories from '../assets/data/Categories.Data';
import categoryProduct from '../assets/data/CategoryProduct.Data';
import products from '../assets/data/Products.Data';
import { _CardDeck, Text, Breadcrumb } from '../components/parts'

export default function Category(props) {
  const { kategoriID } = useParams();
  const { url } = useRouteMatch();
  const plCategory = { id: kategoriID, nama: 'TES' };
  const plProduct = (typeof (plCategory) !== 'undefined') ? findProducts(plCategory.id) : false;
  const [category, setCategory] = useState(plCategory);
  const [product, setProductList] = useState(plProduct);
  const [allCategory, setCategoryList] = useState(plCategories);
  const path = [{ name: 'Home', to: '/' }, { name: 'Kategori', to: '/kategori' }]
  const current = category.nama;

  useEffect(() => {
    fetch(`http://localhost:4000/kategori/${kategoriID}`)
    .then(res => res.json())
    .then(res => {
      if(res.tampil) {
        setCategory({
          id: res.id_kategori,
          nama: res.nama,
          img_path: 'http://localhost:4000/' + res.img_path,
          tampil: res.tampil
        })
        if(res.produk) {
          res.produk.map(prod => {
            prod.id = prod.id_produk;
            prod.img_path = 'http://localhost:4000/' + prod.img_path;
          })
          setProductList(res.produk)
        } else {
          setProductList([])
        }
        return fetch('http://localhost:4000/kategori')
      } else { setCategory(false) }
    })
    .then(res => res.json())
    .then(res => {
      res.map(r => {
        r.id = r.id_kategori;
        delete r.id_kategori;
      })
      setCategoryList(res);
    })
    .catch(err => {
      console.log("Error", err)
    })
  }, [kategoriID])

  
  const isReverse = (e) => {
    console.log(e.target.value);
    setProductList([...product.reverse()])
  }

  if (category) {
    return (
      <Container>
        <Breadcrumb className="mt-5" url={path} current={current} />
        <Row className="mt-3">
          <Col md={3}>
            <Sidebar url={kategoriID} categories={allCategory} />
          </Col>
          <Col md={9}>
            <Row>
              <Col>
                <h1>{category.nama}</h1>
                <Text type="lead">Menampilkan {product.length} Obat</Text>
              </Col>
            </Row>
            <Row className="mt-2 mb-4">
              <Col md={7} />
              <Col className="m-auto" md={1}>
                <Text style={{ fontWeight: 'bold' }} type="body">Urutkan</Text>
              </Col>
              <Col md={4}>
                <Form.Control className="body-text" as="select" onChange={(e) => {isReverse(e)}} custom>
                  <option>Urutkan nama A-Z</option>
                  <option>Urutkan nama Z-A</option>
                </Form.Control>
              </Col>
            </Row>
            <Row>
              <_CardDeck type="product" array={product} url={url} md={4} />
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
            if(item.tampil) {
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
  return plCategories.find(category => {
    return category.id == id;
  })
}