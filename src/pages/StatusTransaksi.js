import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Text } from '../components/parts';
import statusTransaksi from '../assets/data/Status.Data';
import Currency from '../Currency';
import StatusCardDeck from '../components/parts/Status/StatusCardDeck';

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
  return (
    <Container>
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
          <StatusCardDeck datas={statusTransaksi} status={filterStatus} jenis={filterJenis} />
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