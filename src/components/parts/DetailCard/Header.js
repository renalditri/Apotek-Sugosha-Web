import React from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import Text from '../Text';
import Currency from '../../../Currency';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header(props) {
  const { keyHeader, data, cancel, checkout } = props;
  const key = keyHeader;
  return (
    <Row key={'row-1-' + key}>
      <Col key={'col-1-' + key} className="d-flex" style={{ minHeight: '5.5rem' }}>
        <div key={'div-1-' + key} style={{ flexGrow: 3 }}>
          <Text key={'text-1-' + key} type="large-label">Nomor Transaksi : {data.nomor_transaksi}</Text>
          <Text key={'text-2-' + key} type="body">Tanggal Transaksi : {data.tanggal}</Text>
        </div>
        <div key={'div-2-' + key} className="pl-4" style={{ flexGrow: 3 }}>
          <Text key={'text-3-' + key} type="large-label">Jenis Transaksi : </Text>
          <Text key={'text-4-' + key} type="body">{(data.jenis === 0) ? "Pembelian Obat" : "Tebus Resep"}</Text>
        </div>
        <div key={'div-3-' + key} className="pl-4" style={{ flexGrow: 3 }}>
          <Text key={'text-5-' + key} type="large-label">Status : </Text>
          <Text key={'text-6-' + key} type="body">{getStatus(data.status)}</Text>
        </div>
        {HeaderButton(data.status, key, cancel, checkout)}
      </Col>
    </Row>
  )
}

function HeaderButton(status, key, cancel, checkout) {
  switch (status) {
    case 0:
      return (
        <div className="pl-3" style={{ flexGrow: 1 }}>
          <Button
            key={'button-2-' + key}
            className="text-center align-bottom mt-3"
            variant="outline-status"
            style={{ minWidth: '8rem', maxHeight: '3rem' }}
            onClick={() => cancel()}
          >
            Batal Transaksi
          </Button>
        </div>
      );
    case 1:
      return (
        <div className="pl-3" style={{ flexGrow: 1 }}>
          <ButtonGroup vertical>
            <Button
              key={'button-2-' + key}
              className="text-center align-bottom"
              variant="outline-status"
              style={{ minWidth: '6rem', maxHeight: '3rem' }}
              onClick={() => cancel()}
            >
              Batalkan Bayar
            </Button>
            <Button
              key={'button-2-' + key}
              className="text-center align-bottom mt-1"
              variant="outline-status"
              style={{ minWidth: '6rem', maxHeight: '3rem' }}
              onClick={() => checkout()}
            >
              Lanjutkan Bayar
            </Button>
          </ButtonGroup>
        </div>
      );
    case 3:
      return (
        <div className="pl-5" style={{ flexGrow: 1 }}>
          <Button
            key={'button-2-' + key}
            className="text-center align-bottom mt-1"
            variant="outline-status"
            style={{ minWidth: '6rem', maxHeight: '3rem' }}
          >
            Obat Diterima
          </Button>
        </div>
      )
    default:
      return;
  }
}

function getStatus(key) {
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
