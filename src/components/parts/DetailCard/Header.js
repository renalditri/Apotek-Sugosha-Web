import React from 'react';
import { Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import Text from '../Text';
import Currency from '../../../Currency';
import { LinkContainer } from 'react-router-bootstrap';

export default function Header(props) {
  const { keyHeader, data, cancel, checkout, delivered } = props;
  const key = keyHeader;

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
  
  const chgTrxNbr = (transactionNumber) => {
    return `TRX${transactionNumber.toString().padStart(4, '0')}`;
  }

  if(data.jenis == 0) {
    return (
      <Row key={'row-1-' + key}>
        <Col key={'col-1-' + key} className="d-flex" style={{ minHeight: '5.5rem' }}>
          <div key={'div-1-' + key} style={{ flexGrow: 3 }}>
            <Text key={'text-1-' + key} type="large-label">Nomor Transaksi : {chgTrxNbr(data.nomor_transaksi)}</Text>
            <Text key={'text-2-' + key} type="body">Tanggal Transaksi : {convertdate(data.tanggal)}</Text>
          </div>
          <div key={'div-2-' + key} className="pl-4" style={{ flexGrow: 3 }}>
            <Text key={'text-3-' + key} type="large-label">Jenis Transaksi : </Text>
            <Text key={'text-4-' + key} type="body">{(data.jenis === 0) ? "Pembelian Obat" : "Tebus Resep"}</Text>
          </div>
          <div key={'div-3-' + key} className="pl-4" style={{ flexGrow: 3 }}>
            <Text key={'text-5-' + key} type="large-label">Status : </Text>
            <Text key={'text-6-' + key} type="body">{getStatus(data.status)}</Text>
          </div>
          {HeaderButton(data.status, key, cancel, checkout, delivered)}
        </Col>
      </Row>
    )
  }

  
  return (
    <Row key={'row-1-' + key}>
      <Col key={'col-1-' + key} className="d-flex" style={{ minHeight: '5.5rem' }}>
        <div key={'div-1-' + key} style={{ flexGrow: 3 }}>
          <Text key={'text-1-' + key} type="large-label">Nomor Transaksi : </Text>
          <Text key={'text-2-' + key} type="body">{chgTrxNbr(data.nomor_transaksi)}</Text>
        </div>
        <div key={'div-2-' + key} className="pl-4" style={{ flexGrow: 3 }}>
          <Text key={'text-3-' + key} type="large-label">Tanggal Transaksi : </Text>
          <Text key={'text-4-' + key} type="body">{convertdate(data.tanggal)}</Text>
        </div>
        <div key={'div-3-' + key} className="pl-4" style={{ flexGrow: 3 }}>
          <Text key={'text-5-' + key} type="large-label">Status : </Text>
          <Text key={'text-6-' + key} type="body">{getStatus(data.status)}</Text>
        </div>
        {HeaderButton(data.status, key, cancel, checkout, delivered)}
      </Col>
    </Row>
  )
}

function SweetAlert(onClick, buttonText, text) {
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
    text: text ?? undefined,
    icon: 'warning',
    showDenyButton: true,
    confirmButtonText: buttonText,
    denyButtonText: `Kembali`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      onClick()
    }
  })
}

function HeaderButton(status, key, cancel, checkout, delivered) {
  switch (status) {
    case 0:
      return (
        <div className="pl-3" style={{ flexGrow: 1 }}>
          <Button
            key={'button-2-' + key}
            className="text-center align-bottom mt-3"
            variant="outline-status"
            style={{ minWidth: '8rem', maxHeight: '3rem' }}
            onClick={() => SweetAlert(cancel, 'Batalkan Transaksi')}
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
              onClick={() => SweetAlert(cancel, 'Batalkan Transaksi')}
            >
              Batal Transaksi
            </Button>
            <Button
              key={'button-2-' + key}
              className="text-center align-bottom mt-1"
              variant="outline-status"
              style={{ minWidth: '6rem', maxHeight: '3rem' }}
              onClick={() => SweetAlert(checkout, 'Lanjutkan', 'Lanjutkan mengisi data pengiriman dan melakukan pembayaran')}
            >
              Lanjut Bayar
            </Button>
          </ButtonGroup>
        </div>
      );
    case 3:
      return (
        <div className="pl-5 my-3" style={{ flexGrow: 1 }}>
          <Button
            key={'button-2-' + key}
            className="text-center align-bottom mt-1"
            variant="outline-status"
            style={{ minWidth: '6rem', maxHeight: '3rem' }}
            onClick={() => SweetAlert(delivered, 'Obat Diterima', 'Pastikan obat sudah diterima dengan lengkap')}
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
