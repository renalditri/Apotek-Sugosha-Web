import React, { useState } from 'react';
import { _CardDeck, Text, CheckoutCard } from '../components/parts';
import { Row, Col, Container, Form, Card, Button, Table } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";
import carts from '../assets/data/Carts.Data';
import userSavedData from '../assets/data/User.Data';
import Currency from '../Currency';

export default function Checkout() {
  const [stepCounter, setStep] = useState(1);
  const [userData, setUserData] = useState(userSavedData);

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <BackButton />
          <h1>Proses Checkout</h1>
          <Text type="subtitle-1">Nomor Transaksi: TEX0103</Text>
        </Col>
      </Row>
      <Row>
        <Col>
          <ProgressBar currentStep={stepCounter} />
        </Col>
      </Row>
      <FirstPage currentStep={stepCounter} onClick={() => next()} data={userData} />
      <SecondPage currentStep={stepCounter} onClick={() => next()} />
      <ThirdPage currentStep={stepCounter} onClick={() => next()} />
    </Container>
  )

  function BackButton() {
    const svg = (
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
    );

    if (stepCounter > 1) {
      return (
        <div style={{ cursor: 'pointer' }} onClick={prev}>
          {svg}
          <Text
            style={{ textAlign: 'center', verticalAlign: 'middle' }}
            inline type="large-label"
          >
            {(stepCounter === 2) ? 'Data Pengiriman' : 'Pembayaran'}
          </Text>
        </div>
      )
    }

    return (
      <Link className="no-hover" to='/cart'>
        {svg}
        <Text
          style={{ textAlign: 'center', verticalAlign: 'middle' }}
          inline type="large-label"
        >
          Keranjang
        </Text>
      </Link>
    )
  }

  function next() {
    if (stepCounter < 4) {
      setStep(stepCounter + 1);
    }
  }

  function prev() {
    if (stepCounter > 0) {
      setStep(stepCounter - 1);
    }
  }

  function ProgressBar(props) {
    const { currentStep } = props;
    let class1 = (currentStep > 1) ? 'progress-item bar-active' : 'progress-item';
    let class2 = (currentStep > 2) ? 'progress-item bar-active' : 'progress-item';
    return (
      <div className="progress-container">
        <div className="bullet">
          <div className={class1}>
            1
          </div>
        </div>
        <div className="bullet">
          <div className={class2}>
            2
          </div>
        </div>
        <div className="bullet">
          <div className='progress-item'>
            3
          </div>
        </div>
      </div>
    )
  }

  function FirstPage(props) {
    const { currentStep, onClick, data } = props;
    if (currentStep !== 1) return null;

    return (
      <Row className="mt-5">
        <Col md={8}>
          <Row>
            <Col>
              <h2>Data Pengiriman</h2>
              <Text type="subtitle-1">Lengkapi semua form terlebih dahulu</Text>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="mt-3 px-4 pt-2 pb-5">
                <Row>
                  <Col>
                    <Form.Label>Nama Penerima</Form.Label>
                    <Form.Control type="text" value={data.nama}></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label>No Telepon Penerima</Form.Label>
                    <Form.Control type="tel" value={data.nomor}></Form.Control>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={6}>
                    <Form.Label>Kota</Form.Label>
                    <Form.Control className="body-text" as="select" custom>
                      <option value="" selected disabled hidden>Pilih kota anda</option>
                      <option>Denpasar</option>
                      <option>Ubud</option>
                      <option>Kuta</option>
                    </Form.Control>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Label>Alamat Lengkap</Form.Label>
                    <Form.Control as="textarea" value={data.alamat}></Form.Control>
                    <Form.Check
                      className="mt-2"
                      type="checkbox"
                      label="Simpan informasi ini untuk transaksi berikutnya">
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Label>Kurir</Form.Label>
                    <Form.Control className="body-text" as="select" custom>
                      <option>Gojek - bayar di tujuan ongkir min.  Rp10.000</option>
                      <option>Grab - bayar di tujuan ongkir min.  Rp10.000</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <CheckoutCard onClick={onClick} array={carts.produk} />
        </Col>
      </Row>
    )
  }

  function SecondPage(props) {
    const { currentStep, onClick } = props;
    const items = () => {
      let x = { jumlah: 0, harga: 0, };
      carts.produk.forEach((cart) => {
        x.jumlah += cart.jumlah;
        x.harga += cart.harga * cart.jumlah;
      })
      return x;
    }
    if (currentStep !== 2) return null;

    return (
      <>
        <Row className="mt-3">
          <Col>
            <h2>Pembayaran</h2>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={8}>
            <Card className="px-3 py-3 pb-5">
              <Row>
                <Col className="justify-content-center align-self-center" md={5}>
                  <img style={{ display: 'block' }} className="img-fluid m-auto" src="/img/BCA.png" />
                </Col>
                <Col md={7}>
                  <h3>Transfer ke</h3>
                  <Text type="subtitle-1">Bank : BCA</Text>
                  <Text type="subtitle-1">No. Rekening :12738725362363</Text>
                  <Text type="subtitle-1">Penerima : Apotek Sugosha</Text>
                  <h4 className="text-green mt-2">Sebesar : {Currency.format(items().harga)}</h4>
                </Col>
              </Row>
            </Card>
            <h2 className="my-5">Detail Pembayaran</h2>
            <Card className="p-3">
              <Table className="w-100 body-text">
                <DetailBarang />
                <tr className="table-borderless">
                  <td colSpan="2">
                    <Text type="body" green>Total ({carts.produk.length} Obat)</Text>
                  </td>
                  <td className="p-2">
                    <Text type="body" green>{Currency.format(items().harga)}</Text>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    Pengiriman ke {userData.alamat}, {userData.kota}, a/n {userData.nama} ({userData.nomor})
                  </td>
                  <td className="p-2">
                    Gojek - bayar di tujuan ongkir min.  Rp10.000
                  </td>
                </tr>
              </Table>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-4">
              <Text type="large-label">Lanjutkan Checkout</Text>
              <Button onClick={onClick} className="mt-3 w-100">Konfirmasi Pembayaran</Button>
            </Card>
          </Col>
        </Row>
      </>
    )
  }

  function DetailBarang() {
    return carts.produk.map((cart, i) => {
      return (
        <tr className="table-borderless">
          <td colSpan="2">
            {cart.nama} ({cart.jumlah} {cart.satuan})
          </td>
          <td className="p-2" style={{ width: '30%' }}>
            {Currency.format(cart.harga)}/{cart.satuan}
          </td>
        </tr>
      )
    })
  }

  function ThirdPage(props) {
    const { currentStep, onClick } = props;
    if (currentStep !== 3) return null;

    return (
      <>
        <Row className="mt-3">
          <Col>
            <h2>Pembayaran</h2>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={8}>
            <ImageInput />
          </Col>
          <Col md={4}>
            <Card className="p-4">
              <Text type="large-label">Lanjutkan Checkout</Text>
              <Button onClick={onClick} className="mt-3 w-100">Kirim bukti transfer</Button>
            </Card>
          </Col>
        </Row>
      </>
    )


    function ImageInput() {
      const [img, setImg] = useState()
      return (
        <Card className="p-2">
          <div className="p-1 text-center" style={{ border: '4px dashed #25B013', minHeight: '100px' }}>
            <img className="img-fluid w-100 text-center" src={img} alt="Foto Resep" />
          </div>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            hidden
            onChange={imageHandler}
            id="fileResep"
          />
          <label
            htmlFor={"fileResep"}
            className="btn btn-primary w-100 px-2 py-2 mt-3"
          >
            <h5 className="text-white">Upload Foto</h5>
          </label>
        </Card>
      )

      function imageHandler(e) {
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () => {
          setImg(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }


}
