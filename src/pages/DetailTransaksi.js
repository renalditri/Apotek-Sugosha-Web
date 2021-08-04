import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Card, Button, Table } from 'react-bootstrap';
import { Text } from '../components/parts';
import { Header, Img, Products } from '../components/parts/DetailCard';
import { useParams, useRouteMatch, Router, Link } from "react-router-dom";
import statusTransaksi from '../assets/data/Status.Data';
import config from '../config.json';

let update = false;

export default function DetailTransaksi(props) {
  const { statusID } = useParams();
  const { url } = useRouteMatch();
  const [statusData, setStatusData] = useState(statusTransaksi[0]);
  const [not_found, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const Swal = require("sweetalert2");

  useEffect(() => {
    setLoading(true);
    fetch(`${config.base_url}/transaksi/` + statusID)
      .then(res => res.json())
      .then(res => {
        if (res.foto_resep) {
          res.foto_resep = config.base_url + '/' + res.foto_resep;
        }
        if (res.produk) {
          res.produk.map(r => {
            r.img_path = config.base_url + '/' + r.img_path;
          })
        }
        setStatusData(res);
        return;
      })
      .then(res => {
        setLoading(false);
      })
      .catch(err => {
        console.log('Err : ', err);
        setNotFound(true);
        setLoading(false);
      })
  }, [update])

  const cancelTransaksi = () => {
    fetch(`${config.base_url}/transaksi/${statusData.nomor_transaksi}/cancel`, { method: 'PUT' })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Transaksi Dibatalkan",
          showConfirmButton: false,
          timer: 1800,
        });
        setTimeout(function () {
          window.location.reload();
        }, 800)
      })
  }

  const checkoutTransaksi = () => {
    props.history.push("/checkout/" + statusData.nomor_transaksi);
  }

  const delivered = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("status", "4");

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
    };
    fetch(`${config.base_url}/status/${statusData.nomor_transaksi}`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        Swal.fire({
          icon: "success",
          title: "Obat Diterima",
          text: "Transaksi telah selesai",
          showConfirmButton: false,
          timer: 1800,
        });
        setTimeout(function () {
          window.location.reload();
        }, 1800)
      })
  }

  if (statusData.message) {
    return (
      <div>404 Not Found</div>
    )
  }

  function BackButton() {
    return (
      <Link className="no-hover mt-3" to='/status' style={{ display: "block" }}>
        <svg
          className="mr-2" style={{ verticalAlign: 'middle', display: 'inline' }}
          width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.96289 1L0.999718 7.96317L7.96289 14.9263"
            stroke="#14142B" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
        <Text
          style={{ textAlign: 'center', verticalAlign: 'middle' }}
          inline type="large-label"
        >
          Kembali
        </Text>
      </Link>
    )
  }

  return (
    <Container>
      <div className={(loading) ? "loading d-flex justify-content-center align-items-center" : "done-loading"}>
        <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <Row>
        <Col>
          <BackButton />
          <h1>Detail Transaksi</h1>
        </Col>
      </Row>
      <Row>
        <Img statusData={statusData} />
        <Col>
          <Row>
            <Col>
              <Card className="pt-4 px-3">
                <Header data={statusData} checkout={checkoutTransaksi} cancel={cancelTransaksi} delivered={delivered} />
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="p-3 mt-3">
                <Products statusData={statusData} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
