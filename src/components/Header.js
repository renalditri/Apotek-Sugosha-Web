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
  InputGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory, Router } from "react-router-dom";
import cart from "../assets/img/Cart.png";
import logo from "../assets/img/logo.png";
import { authenticationService } from '../services/authentication';

export default function Header(props) {
  const history = useHistory();
  const search = (e) => {
    if (e.key === 'Enter') {
      history.push(`/produk?search=${e.target.value}`)
    }
  }

  const cartLogo = () => {
    const currentUser = authenticationService.currentUser;
    if (!currentUser) {
      return <div></div>;
    }

    return (
      <LinkContainer to="/cart">
        <Nav.Link>
          <img src={cart} width="24" height="24" />
        </Nav.Link>
      </LinkContainer>
    );
  }

  const userLoggedIn = () => {
    const currentUser = authenticationService.currentUser;
    if (!currentUser) {
      return (
        <>
          <LinkContainer to="/login" style={{ borderRadius: "8px", background: "#B8FFBA", borderColor: '#B8FFBA' }}>
            <Button
              className="px-4 py-2 mr-2 medium-label d-inline text-green"
            >
              Login
            </Button>
          </LinkContainer>
          <LinkContainer to="/daftar" style={{ borderRadius: "8px" }}>
            <Button
              className="px-4 py-2 medium-label d-inline"
            >
              Daftar
            </Button>
          </LinkContainer>
        </>
      )
    }
    return (
      <NavDropdown title={"Hi, " + JSON.parse(currentUser).nama} id="basic-nav-dropdown">
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
    )
  }

  return (
    <Navbar
      fixed="top"
      className="py-3 medium-label"
      expand="lg"
      style={{ background: "white", boxShadow: "0px 1px 0px #E5E9F2" }}
    >
      <Container>
        <Nav className="w-100">
          <Row className="w-100">
            <Col md={2} className="my-auto">
              <LinkContainer to="/">
                <Nav.Link>
                  <img className="img-fluid" src={logo} />
                </Nav.Link>
              </LinkContainer>
            </Col>
            <Col md={1} className="my-auto">
              <LinkContainer to="/kategori">
                <Nav.Link>Kategori</Nav.Link>
              </LinkContainer>
            </Col>
            <Col md={2} className="my-auto">
              <LinkContainer to="/resep">
                <Nav.Link className="text-center">Tebus Resep</Nav.Link>
              </LinkContainer>
            </Col>
            <Col md={4} className="my-auto">
              <Form inline onSubmit={e => { e.preventDefault(); }}>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="p-3"
                  style={{ borderRadius: "16px", background: "#EFF0F6", fontFamily: "Poppins" }}
                  onKeyDown={(e) => { search(e) }}
                />
              </Form>
            </Col>
            <Col md={1} className="my-auto">
              {cartLogo()}
            </Col>
            <Col md={2} className="my-auto">
              {userLoggedIn()}
            </Col>
          </Row>
        </Nav>
      </Container>
    </Navbar>
  );
}
