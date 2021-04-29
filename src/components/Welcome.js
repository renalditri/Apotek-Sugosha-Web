import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap';
import Text from './parts/Text';
import { LinkContainer } from 'react-router-bootstrap';

export default class Welcome extends Component {
  render() {
    return (
      <>
        <Col md={{ span: 5, order: 'first' }} xs={{ span: 12, order: 'last' }} >
          <div>
            <h1 style={{ width: '50%' }}>Selamat Datang</h1>
            <Text type="lead">Silahkan, ada yang bisa kami bantu?</Text>
            <LinkContainer to="/produk">
              <Button
                className="px-4 py-2 mr-3 mt-3 large-label"
                style={{
                  display:
                    'inline'
                }}
              >
                Cari Obat
            </Button>
            </LinkContainer>
            <LinkContainer to="/resep">
              <Button
                variant="no-outline-primary"
                className="px-4 py-2 mt-3 large-label"
                style={{
                  display:
                    'inline'
                }}
              >
                Tebus Resep
            </Button>
            </LinkContainer>
          </div>
        </Col>
        <Col md={{ span: 7, order: 'last' }} xs={{ span: 12, order: 'first' }}>
          <img className="img-fluid" src="img/welcome.png" />
        </Col>
        {/* <Col sm={2} md={3} lg={4} style={{backgroundColor: 'red', border: '1px blue'}}>
          a
        </Col>
        <Col sm={2} md={3} lg={4} style={{backgroundColor: 'red', border: '1px blue'}}>
          a
        </Col>
        <Col sm={2} md={3} lg={4} style={{backgroundColor: 'red', border: '1px blue'}}>
          a
        </Col> */}
      </>
    )
  }
}
