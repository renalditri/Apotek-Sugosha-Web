import React from 'react';
import { Row, Col, Container, Card, Button, Table } from 'react-bootstrap';
import { Text } from '../components/parts';
import { useParams, useRouteMatch, Router, Link } from "react-router-dom";
import statusTransaksi from '../assets/data/Status.Data';
import userSavedData from '../assets/data/User.Data';
import Currency from '../Currency';

export default function DetailTransaksi() {
  const { statusID } = useParams();
  const { url } = useRouteMatch();
  const statusData = () => {
    return statusTransaksi.find(status => {
      return status.nomor_transaksi == statusID;
    })
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

  const CardHeader = (props) => {
    const { keyHeader, data } = props;
    const key = keyHeader;
    const getStatus = (key) => {
      const status = {
        0: "Verifikasi Resep",
        1: "Menunggu Pembayaran",
        2: "Verifikasi Pembayaran",
        3: "Proses Pengiriman",
        4: "Transaksi Selesai",
        5: "Transaksi Gagal",
      }
      return status[key];
    }
    return (
      <Row key={'row-1-' + key}>
        <Col key={'col-1-' + key} className="d-flex" style={{ minHeight: '5.5rem' }}>
          <div key={'div-1-' + key} style={{ flexGrow: 3 }}>
            <Text key={'text-1-' + key} type="large-label">Nomor Transaksi : {data.nomor_transaksi}</Text>
            <Text key={'text-2-' + key} type="body">Tanggal Transaksi : {data.tanggal}</Text>
          </div>
          <div key={'div-2-' + key} className="pl-5" style={{ flexGrow: 3 }}>
            <Text key={'text-3-' + key} type="large-label">Jenis Transaksi : </Text>
            <Text key={'text-4-' + key} type="body">{(statusData().jenis === 0) ? "Pembelian Obat" : "Tebus Resep"}</Text>
          </div>
          <div key={'div-3-' + key} className="pl-5" style={{ flexGrow: 3 }}>
            <Text key={'text-5-' + key} type="large-label">Status : </Text>
            <Text key={'text-6-' + key} type="body">{getStatus(data.status)}</Text>
          </div>
          {
            (data.status === 3) ? (
              <div className="pl-5" style={{ flexGrow: 2 }}>
                <Button
                  key={'button-2-' + key}
                  className="mt-2"
                  style={{ minWidth: '10rem' }}
                >
                  Obat Diterima
                  </Button>
              </div>
            ) : ''
          }
        </Col>
      </Row>
    )
  }

  return (
    <Container>
      <Row>
        <Col>
          <BackButton />
          <h1>Detail Transaksi</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="pt-4 px-3">
            <CardHeader data={statusData()} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card className="p-3 mt-3">
            <Table className="body-text mt-3">
              {
                statusData().produk.map((data, i) => {
                  return (
                    <tr key={"table-row-" + i} className={(i == 0) ? "table-borderless" : ""}>
                      <td key={"col-" + i}  colSpan="100%">
                        <Row key={"row-" + i} style={{ minWidth: "100%" }}>
                          <Col key={"col-img-" + i} md={2}><img src={data.img_path} className="img-fluid" /></Col>
                          <Col key={"col-name-" + i} md={7} className="d-flex align-items-center large-label">{data.nama} ({data.jumlah} {data.satuan})</Col>
                          <Col key={"col-price-" + i} md={3} className="d-flex align-items-center body-text">{Currency.format(data.harga)}/{data.satuan}</Col>
                        </Row>
                      </td>
                    </tr>
                  );
                })
              }
              <tr style={{height: "1rem"}}>
                <td colSpan="100%" style={{height: "1rem"}}></td>
              </tr>
              <tr>
                <td colSpan="100%">
                  <Row style={{ minWidth: "100%" }}>
                    <Col md={9} className="body-text text-green"><b>Total</b></Col>
                    <Col md={3} className="d-flex align-items-center body-text text-green"><b>{Currency.format(statusData().total)}</b></Col>
                  </Row>
                </td>
              </tr>
              <tr>
                <td colSpan="100%">
                  <Row style={{ minWidth: "100%" }}>
                    <Col md={9} className="body-text"><b>Pengiriman ke {userSavedData.alamat}, {userSavedData.kota}, a/n {userSavedData.nama} ({userSavedData.nomor})</b></Col>
                    <Col md={3} className="d-flex align-items-center justify-content-center body-text">Gojek - bayar di tujuan ongkir min.  Rp10.000</Col>
                  </Row>
                </td>
              </tr>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
