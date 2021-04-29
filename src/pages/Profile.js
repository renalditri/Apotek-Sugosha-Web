import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

export default function Profile() {
  return (
    <Container className="body-text">
      <Form>
        <Row className="mt-3">
          <Col>
            <h1>Profil Saya</h1>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={3}>
            <Card className="p-3">
              <img className="img-fluid" src="/img/Profile.png" />
            </Card>
          </Col>
          <Col md={9}>
            <Card className="p-4">
              <Row>
                <Col>
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control type="text"></Form.Control>
                </Col>
                <Col>
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control type="text"></Form.Control>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Label>No. Handphone</Form.Label>
                  <Form.Control type="text"></Form.Control>
                </Col>
                <Col>
                  <Form.Label>Asal Kota</Form.Label>
                  <Form.Control type="text"></Form.Control>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Label>Alamat Lengkap</Form.Label>
                  <Form.Control as="textarea"></Form.Control>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={{span: 4, offset: 8}}>
                  <Button className="py-2 px-3 w-100 large-label">Simpan Perubahan</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}
