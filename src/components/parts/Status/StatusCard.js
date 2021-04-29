import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Text from '../Text';
import Currency from '../../../Currency';

export default function StatusCard(props) {
  const { data, thisKey } = props;
  const key = thisKey;
  const produkUtama = data.produk[0];
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

  if (data.jenis === 0) {
    return (
      <Card className="px-3 py-3 mb-4" key={'status-card-' + key}>
        <Row key={'row-1-' + key}>
          <Col key={'col-1-' + key} className="d-flex" style={{ minHeight: '5.5rem' }}>
            <div key={'div-1-' + key}>
              <Text key={'text-1-' + key} type="large-label">Nomor Transaksi : </Text>
              <Text key={'text-2-' + key} type="body">{data.nomor_transaksi}</Text>
            </div>
            <div key={'div-2-' + key} className="pl-5" style={{ flexGrow: 3 }}>
              <Text key={'text-3-' + key} type="large-label">Tanggal Transaksi : </Text>
              <Text key={'text-4-' + key} type="body">{data.tanggal}</Text>
            </div>
            <div key={'div-3-' + key} className="pl-5" style={{ flexGrow: 3 }}>
              <Text key={'text-5-' + key} type="large-label">Status : </Text>
              <Text key={'text-6-' + key} type="body">{getStatus(data.status)}</Text>
            </div>
          </Col>
        </Row>
        <Row key={'row-2-' + key}>
          <Col key={'col-2-' + key} className="d-flex">
            <div key={'div-4-' + key} className="d-flex align-items-start justify-content-start" style={{ maxWidth: '9rem' }}>
              <img key={'img-1-' + key} src={produkUtama.img_path} className="img-fluid h-100" />
            </div>
            <div key={'div-5-' + key} className="d-flex flex-column align-items-start justify-content-start p-3" style={{ flexGrow: 3 }}>
              <Text key={'text-7-' + key} type="large-label">{produkUtama.nama} ({produkUtama.jumlah} {produkUtama.satuan})</Text>
              {(data.produk.length > 1) ? <Text key={'text-8-' + key} green type="body">Dan {data.produk.length - 1} produk lainnya</Text> : ''}
            </div>
            <div key={'div-6-' + key} className="d-flex flex-column align-items-start justify-content-start p-3" style={{ flexGrow: 2 }}>
              <Text key={'text-9-' + key} type="large-label">Total Harga : </Text>
              <Text key={'text-10-' + key} type="large-label" green>{Currency.format(data.total)}</Text>
            </div>
            <div key={'div-7-' + key} className="d-flex flex-column align-items-start justify-content-start px-3 py-1" style={{ flexGrow: 2 }}>
              <Button key={'button-1-' + key} className="mb-1" style={{ minWidth: '10rem' }}>Detail Pesanan</Button>
              <Button key={'button-2-' + key} className="mt-1" style={{ minWidth: '10rem' }}>Obat Diterima</Button>
            </div>
          </Col>
        </Row>
      </Card>
    )
  }

  return "Belom";
}



