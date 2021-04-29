import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class Footer extends Component {
  render() {
    return (
      <Container fluid id="footer" className='footer bg-dark text-white px-5'>
        <Container style={{minHeight: '15rem'}}>
          <Row className="h-100">
            <Col md={4} sm={12} className='p-5 justify-content-center align-self-center body-text'>
              Sugosha Apotek<br />
              Copyright © 2021 Apotek Sugosha. <br />
              All rights reserved
            </Col>

            <Col md={4} sm={12} className='p-md-5 p-sm-3'>
              <Row>
                <h6>Kontak Kami</h6>
              </Row>
              <Row>
                <p className="body-text">Jl. Sedap Malam No.393x, Kesiman, Kec. Denpasar Tim., Kota Denpasar, Bali 80237</p>
              </Row>
              <Row>
                <p className="body-text">0878-6196-2010</p>
              </Row>
            </Col>

            <Col md={4} sm={12} className='p-md-5 p-sm-3 my-3 my-md-0'>
              <Row>
                <h6>Ikuti Sosmed kami</h6>
              </Row>
              <Row>
                <p className="body-text">@apoteksugosha</p>
              </Row>
              <Row>
                <p className="body-text">apotek sugosha</p>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    )
  }
}
