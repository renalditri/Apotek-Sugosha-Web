import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import cart from "../assets/img/Cart.png";
import logo from "../assets/img/logo.png";

export default class Header extends Component {
  render() {
    return (
      <Navbar fixed="top" className="py-3 medium-label" bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Row className="w-100">
            <Col>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <img src={logo} />
                </Navbar.Brand>
              </LinkContainer>
            </Col>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="w-100">
                <Col>
                  <LinkContainer to="/kategori">
                    <Nav.Link>Kategori</Nav.Link>
                  </LinkContainer>
                </Col>
                <Col>
                  <LinkContainer to="/resep">
                    <Nav.Link>Tebus Resep</Nav.Link>
                  </LinkContainer>
                </Col>
                <Col md={6}>
                  <Form inline>
                    <FormControl
                      type="text"
                      placeholder="Search"
                      className="mr-sm-2 w-100"
                    />
                  </Form>
                </Col>
              </Nav>
            </Navbar.Collapse>
            <Col>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <img src={cart} width="24" height="24" />
                </Nav.Link>
              </LinkContainer>
            </Col>
            <Col>
              <NavDropdown title="Hi, nama orang" id="basic-nav-dropdown">
                <LinkContainer className="small-label" to="/status">
                  <NavDropdown.Item>Status Transaksi</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer className="small-label" to="/profil">
                  <NavDropdown.Item>Profil</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer
                  className="small-label dropdown-logout"
                  to="/logout"
                >
                  <NavDropdown.Item>Log Out</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Col>
          </Row>
        </Container>
      </Navbar>
    );
  }
}
