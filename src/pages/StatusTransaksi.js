import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Text } from '../components/parts';
import plStatusTransaksi from '../assets/data/Status.Data';
import Currency from '../Currency';
import StatusCardDeck from '../components/parts/Status/StatusCardDeck';
import { authenticationService } from '../services/authentication';
import config from '../config.json';

const user_id = authenticationService.user_id;

export default function StatusTransaksi() {
  const statusCode = {
    SEMUA: 6,
    VERIFIKASI_RESEP: 0,
    MENUNGGU_PEMBAYARAN: 1,
    VERIFIKASI_PEMBAYARAN: 2,
    PROSES_PENGIRIMAN: 3,
    TRANSAKSI_SELESAI: 4,
    TRANSAKSI_GAGAL: 5,
  }
  const jenisCode = {
    SEMUA: 2,
    PEMBELIAN_OBAT: 0,
    TEBUS_RESEP: 1,
  }
  const [filterStatus, setFilterStatus] = useState(statusCode.SEMUA);
  const [filterJenis, setFilterJenis] = useState(jenisCode.SEMUA);
  const [statusTransaksi, setStatusTransaksi] = useState(plStatusTransaksi);
  const [loading, setLoading] = useState(true);
  const Swal = require("sweetalert2");

  /* fungsi date and time */
  function convertdate(date_str) {
    let tanggal = new Date(date_str);
    let yr, mn, dt, hr, mnt, sec;
    tanggal.setHours(tanggal.getHours() + 0);
    yr = tanggal.getFullYear();
    tanggal.setMonth(tanggal.getMonth() + 1);
    mn = tanggal.getMonth().toString();

    if (mn.length < 2) {
      mn = "0" + mn;
    }
    dt = tanggal.getDate().toString();
    if (dt.length < 2) {
      dt = "0" + dt;
    }
    hr = tanggal.getHours().toString();
    if (hr.length < 2) {
      hr = "0" + hr;
    }
    mnt = tanggal.getMinutes().toString();
    if (mnt.length < 2) {
      mnt = "0" + mnt;
    }

    return `${dt}/${mn}/${yr} ${hr}:${mnt} WITA`;
  }

  useEffect(() => {
    setLoading(true);
    fetch(`${config.base_url}/transaksi/pembeli/${user_id}`)
      .then(res => res.json())
      .then(resolve => {
        console.log('tes', resolve)
        resolve.map(res => {
          if (res.foto_resep) { res.foto_resep = config.base_url + '/' + res.foto_resep }
          if (res.bukti_pembayaran) { res.bukti_pembayaran = config.base_url + res.bukti_pembayaran }
          if (res.produk) {
            res.produk.map(r => {
              if (r.img_path) { r.img_path = config.base_url + '/' + r.img_path }
            })
          }
          res.tanggal = convertdate(res.tanggal);
        })
        console.log(resolve)
        setStatusTransaksi(resolve);
      })
      .then(res => {
        setLoading(false);
      })
      .catch(err => {
        setStatusTransaksi([]);
        console.log(err);
        setLoading(false);
      })

    console.log('tes')
  }, [])

  const onClickDiterima = (nomor_transaksi) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("status", "4");

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
    };
    fetch(`${config.base_url}/status/${nomor_transaksi}`, requestOptions)
      .then(res => res.json())
      .then(res => {
        console.log('yang ini kan?');
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

  return (
    <Container>
      <div className={(loading) ? "loading d-flex justify-content-center align-items-center" : "done-loading"}>
        <div className="spinner-border text-primary" style={{ width: '5rem', height: '5rem' }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <Row className="mt-3">
        <Col>
          <h1>Status Transaksi</h1>
          <Text type="subtitle-1">Filter Status Transaksi</Text>
          <div className="mt-3" style={{ display: "flex", justifyContent: "space-around", marginRight: "10rem" }}>
            <ButtonDeck status={filterStatus} onclick={(i) => filterOnclick(i)} />
          </div>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={9} />
        <Col className="m-auto" md={1}>
          <Text style={{ fontWeight: 'bold' }} type="body">Urutkan</Text>
        </Col>
        <Col md={2}>
          <Form.Control className="body-text" as="select" onChange={(e) => filterOnChange(e)} custom>
            <option value={jenisCode.SEMUA}>Semua</option>
            <option value={jenisCode.PEMBELIAN_OBAT}>Pembelian Obat</option>
            <option value={jenisCode.TEBUS_RESEP}>Tebus Resep</option>
          </Form.Control>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <StatusCardDeck datas={statusTransaksi} status={filterStatus} jenis={filterJenis} onclick={onClickDiterima} />
        </Col>
      </Row>
    </Container>
  )

  function filterOnChange(event) {
    const value = event.target.value;
    setFilterJenis(parseInt(value));
  }

  function filterOnclick(i) {
    setFilterStatus((i));
  }

  function ButtonDeck(props) {
    const { status = 6, onclick } = props;
    const tombol = [
      "Semua",
      "Verifikasi Resep",
      "Menunggu Pembayaran",
      "Verifikasi Pembayaran",
      "Proses Pengiriman",
      "Transaksi Selesai",
      "Transaksi Gagal"
    ]

    return tombol.map((item, i) => {
      return (
        <Button
          key={"status-" + i}
          variant="outline-status"
          className={(i - 1 === status || ((i === 0) && (status === 6))) ? "active" : " "}
          onClick={() => onclick((i === 0) ? 6 : (i - 1))}
        >
          {item}
        </Button>
      )
    })
  }
}
