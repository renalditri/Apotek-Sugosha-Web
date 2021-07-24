import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import Text from '../Text';
import Currency from '../../../Currency';
import { LinkContainer } from 'react-router-bootstrap';

export default function StatusCard(props) {
  const { data, thisKey, onclick } = props;
  const key = thisKey;
  if(data.produk.length < 1 && data.jenis == 0) {
    console.log('BATAL', data);
    return "";
  }
  console.log('JADI', data);
  const produkUtama = data.produk[0];
  const isResep = (data.jenis === 1) ? true : false;
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

  const chgTrxNbr = (transactionNumber) => {
    return `TRX${transactionNumber.toString().padStart(4, '0')}`;
  }

  const usedData = {
    "img_path": ((isResep) ? data.foto_resep : produkUtama.img_path),
    "produk_text": ((isResep) ? `Tebus Resep (${data.id_resep})` : `${produkUtama.nama_produk} (${produkUtama.jumlah} ${produkUtama.satuan})`),
    "total_harga": ((isResep && data.status === 0) ? "Menunggu Verifikasi" : Currency.format(data.total))
  }

  const confirmOnclick = () => {
    console.log('testeasfad')
    const Swal = require("sweetalert2");
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mr-2',
        denyButton: 'btn btn-outline-dark ml-2'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Anda Yakin?',
      icon: 'warning',
      text: 'Pastikan obat sudah diterima dengan lengkap',
      showDenyButton: true,
      confirmButtonText: 'Obat Diterima',
      denyButtonText: `Kembali`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        onclick(data.nomor_transaksi)
      }
    })
  }

  const CardHeader = () => (
    <Row key={'row-1-' + key}>
      <Col key={'col-1-' + key} className="d-flex" style={{ minHeight: '5.5rem' }}>
        <div key={'div-1-' + key}>
          <Text key={'text-1-' + key} type="large-label">Nomor Transaksi : </Text>
          <Text key={'text-2-' + key} type="body">{chgTrxNbr(data.nomor_transaksi)}</Text>
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
  )

  return (
    <Card className="px-3 py-3 mb-4" key={'status-card-' + key}>
      <CardHeader />
      <Row key={'row-2-' + key}>
        <Col key={'col-2-' + key} className="d-flex">
          <div key={'div-4-' + key} className="d-flex align-items-start justify-content-start" style={{ width: '9rem' }}>
            <img key={'img-1-' + key} src={usedData.img_path} className="img-fluid h-100 w-100" />
          </div>
          <div key={'div-5-' + key} className="d-flex flex-column align-items-start justify-content-start p-3" style={{ flexGrow: 3 }}>
            <Text key={'text-7-' + key} type="large-label">{usedData.produk_text}</Text>
            {(data.produk.length > 1 && data.jenis === 0) ? <Text key={'text-8-' + key} green type="body">Dan {data.produk.length - 1} produk lainnya</Text> : ''}
          </div>
          <div key={'div-6-' + key} className="d-flex flex-column align-items-start justify-content-start p-3" style={{ flexGrow: 2 }}>
            <Text key={'text-9-' + key} type="large-label">Total Harga : </Text>
            <Text key={'text-10-' + key} type="large-label" green>{usedData.total_harga}</Text>
          </div>
          <div key={'div-7-' + key} className="d-flex flex-column align-items-start justify-content-start px-3 py-1" style={{ flexGrow: 2 }}>
            <LinkContainer to={"/status/" + data.nomor_transaksi} style={{ minWidth: '10rem', borderRadius: '8px' }}>
              <Button key={'button-1-' + key} className={(data.status !== 3) ? 'my-auto' : 'mt-3'}>Detail Pesanan</Button>
            </LinkContainer>
            {(data.status === 3) ? 
            <Button
             key={'button-2-' + key} 
             className="mt-2" 
             style={{ minWidth: '10rem', borderRadius: '8px' }}
             onClick={() => {confirmOnclick()}}
             >
              Obat Diterima
              </Button> 
              : 
            ''}
          </div>
        </Col>
      </Row>
    </Card>
  )
}



