import React, { useState, useEffect } from 'react';
import { _CardDeck, Text, CheckoutCard } from '../components/parts';
import { Row, Col, Container, Form, Card, Button, Table } from 'react-bootstrap';
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import plCarts from '../assets/data/Carts.Data';
import plUserData from '../assets/data/User.Data';
import Currency from '../Currency';
import { authenticationService } from '../services/authentication';

const user_id = authenticationService.user_id;
const base_url = 'http://localhost:4000'

export default function Checkout(props) {
  const [stepCounter, setStep] = useState(1);
  const [userData, setUserData] = useState(plUserData);
  const { nomorTR } = useParams();
  const [dataTransaksi, setData] = useState(plCarts);
  const [dataPengiriman, setDataPengiriman] = useState();

  useEffect(() => {
    fetch('http://localhost:4000/pembeli/' + user_id)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setUserData(res);
        const url = (nomorTR) ? `${base_url}/transaksi/${nomorTR}` : `${base_url}/keranjang/${user_id}`;
        return fetch(url)
      })
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          if (res.status !== 1 || res.jenis !== 1) {
            alert('Anda tidak dapat mengakses transaksi ini!');
            props.history.push('/');
            return;
          }
        }
        if (user_id !== res.id_pembeli) {
          alert('Anda tidak dapat mengakses transaksi ini!');
          props.history.push('/');
          return;
        }
        console.log(res);
        setData(res);
      })
  }, [])

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <BackButton />
          <h1>Proses Checkout</h1>
          {(!nomorTR) ? '' :
            <Text type="subtitle-1">Nomor Transaksi: {nomorTR}</Text>
          }
        </Col>
      </Row>
      <Row>
        <Col>
          <ProgressBar currentStep={stepCounter} />
        </Col>
      </Row>
      <FirstPage currentStep={stepCounter} onClick={() => next()} data={userData} />
      <SecondPage currentStep={stepCounter} onClick={() => next()} data={dataTransaksi} />
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

    if (nomorTR) {
      return (
        <Link className="no-hover" to='/status'>
          {svg}
          <Text
            style={{ textAlign: 'center', verticalAlign: 'middle' }}
            inline type="large-label"
          >
            Keluar
          </Text>
        </Link>
      )
    } else {
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
    const gojek = "Gojek - bayar di tujuan ongkir min.  Rp10.000";
    const grab = "Grab - bayar di tujuan ongkir min.  Rp10.000"
    const { currentStep, onClick, data } = props;
    const [nama, setNama] = useState();
    const [nomor_telepon, setNomor] = useState();
    const [kota, setKota] = useState('');
    const [alamat, setAlamat] = useState();
    const [simpan, setSimpan] = useState(false);
    const [kurir, setKurir] = useState(gojek);

    useEffect(() => {
      if (data.nomor_telepon == '08xxxxxxxxx') { return; }
      console.log('DATA: ', data)
      setNama(data.nama);
      setNomor(data.nomor_telepon);
      if (data.saved_data) {
        setKota(data.saved_data.kota);
        setAlamat(data.saved_data.alamat);
      }
    }, [data, currentStep])

    if (currentStep !== 1) { return null; };


    const checkData = () => {
      const validate = [nama, nomor_telepon, kota, alamat];
      const pesan = []
      const keys = ['Nama', 'Nomor Telepon', 'Kota', 'Alamat']
      validate.forEach((d, i) => {
        if (d === '' || d === null || !d) {
          pesan.push(keys[i])
        }
      })
      if (pesan.length > 0) {
        alert(`Mohon isi ${pesan.join(' dan ')} anda`);
        return;
      }

      if (simpan) {
        const bodySavedData = {
          kota: kota,
          alamat: alamat
        }
        fetch(`http://localhost:4000/pembeli/${user_id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ saved_data: JSON.stringify(bodySavedData) })
        })
          .then(res => console.log(res))
          .then(res => {
            setDataPengiriman({
              nama: nama,
              nomor_telepon: nomor_telepon,
              kota: kota,
              alamat: alamat,
              kurir: kurir
            })
            alert(dataTransaksi)
            next();
          })
      } else {
        setDataPengiriman({
          nama: nama,
          nomor_telepon: nomor_telepon,
          kota: kota,
          alamat: alamat,
          kurir: kurir
        })
        alert(dataTransaksi)
        next();
      }
    }

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
                    <Form.Control onChange={(e) => { setNama(e.target.value) }} type="text" value={nama ?? data.nama}></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label>No Telepon Penerima</Form.Label>
                    <Form.Control disabled type="tel" value={data.nomor_telepon}></Form.Control>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={6}>
                    <Form.Label>Kota</Form.Label>
                    <Form.Control onChange={(e) => { setKota(e.target.value) }}
                      className="body-text"
                      as="select"
                      custom
                      defaultValue={''}
                      value={kota}
                    >
                      <option value="" disabled hidden>Pilih kota/kabupaten anda</option>
                      <option value="Kabupaten Badung">Kabupaten Badung</option>
                      <option value="Kabupaten Gianyar">Kabupaten Gianyar</option>
                      <option value="Kota Denpasar">Kota Denpasar</option>
                    </Form.Control>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Label>Alamat Lengkap</Form.Label>
                    <Form.Control
                      onChange={(e) => { setAlamat(e.target.value) }}
                      as="textarea"
                    >{alamat ?? (data.saved_data) ? data.saved_data.alamat : ''}</Form.Control>
                    <Form.Check
                      className="mt-2"
                      type="checkbox"
                      label="Simpan informasi ini untuk transaksi berikutnya"
                      onChange={(e) => { setSimpan(e.target.checked) }}
                    >
                    </Form.Check>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <Form.Label>Kurir</Form.Label>
                    <Form.Control
                      onChange={(e) => { setKurir(e.target.value) }}
                      className="body-text"
                      as="select"
                      custom
                    >
                      <option value={gojek}>{gojek}</option>
                      <option value={grab}>{grab}</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <CheckoutCard onClick={checkData} array={dataTransaksi.produk} />
        </Col>
      </Row>
    )
  }

  function SecondPage(props) {
    const { currentStep, onClick } = props;

    console.log(dataTransaksi);

    const items = () => {
      let x = { jumlah: 0, total: 0, };
      dataTransaksi.produk.forEach((cart) => {
        x.jumlah += cart.jumlah;
        x.total += cart.harga * cart.jumlah;
      })
      if (dataTransaksi.total) {
        return {
          jumlah: x.jumlah,
          total: dataTransaksi.total
        };
      }
      return x;
    }

    console.log('item', items())
    console.log(dataPengiriman)

    if (currentStep !== 2) { return null; };

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
                  <h4 className="text-green mt-2">Sebesar : {Currency.format(items().total)}</h4>
                </Col>
              </Row>
            </Card>
            <h2 className="my-5">Detail Pembayaran</h2>
            <Card className="p-3">
              <Table className="w-100 body-text">
                <DetailBarang />
                <tr className="table-borderless">
                  <td colSpan="2">
                    <Text type="body" green>Total ({dataTransaksi.produk.length} Obat)</Text>
                  </td>
                  <td className="p-2">
                    <Text type="body" green>{Currency.format(items().total)}</Text>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    Pengiriman ke {dataPengiriman.alamat}, {dataPengiriman.kota}, a/n {dataPengiriman.nama} ({dataPengiriman.nomor_telepon})
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
    return dataTransaksi.produk.map((cart, i) => {
      return (
        <tr className="table-borderless">
          <td colSpan="2">
            {cart.nama_produk} ({cart.jumlah} {cart.satuan})
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
    const [img, setImg] = useState();
    const [preview, setPreview] = useState();
    if (currentStep !== 3) return null;

    const sendTransaksi = () => {
      if (!img) {
        alert('Masukkan gambar bukti transaksi terlebih dahulu');
        return;
      }
      const formData = new FormData();
      if (nomorTR) {
        formData.append("nomor_transaksi", nomorTR);
        formData.append("bukti", img);
        fetch(base_url + '/upload/bukti', {
          method: 'POST',
          body: formData,
        })
          .then(res => res.json())
          .then(res => console.log(res))
          .catch(err => console.log(err))
      } else {
        const dataSend = {
          id_pembeli: user_id,
          data_pengiriman: {
            kota: dataPengiriman.kota,
            alamat: dataPengiriman.alamat,
            kurir: dataPengiriman.kurir
          },
          status: 2,
          jenis: 0,
          produk: dataTransaksi.produk.map(p => { return {id_produk: p.id_produk, jumlah: p.jumlah} })
        }
        console.log(JSON.stringify(dataSend));
        fetch(base_url + '/transaksi', {
          method: 'POST',
          headers: {
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(dataSend),
        })
        .then(res => res.json())
        .then(res => {
          if(res.id) {
            formData.append("nomor_transaksi", res.id);
            formData.append("bukti", img);
            return fetch(base_url + '/upload/bukti', {
              method: 'POST',
              body: formData,
            })
          }
          console.log(res);
        })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          alert('Transaksi telah dilakukan');
          return fetch(base_url + '/keranjang/' + user_id, { method: 'DELETE' })
        })
        .then(res => { onClick() })
        .catch(err => console.log(err))
      }
    }

    return (
      <>
        <Row className="mt-3">
          <Col>
            <h2>Pembayaran</h2>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={8}>
            <ImageInput setImg={setImg} preview={preview} setPreview={setPreview} />
          </Col>
          <Col md={4}>
            <Card className="p-4">
              <Text type="large-label">Lanjutkan Checkout</Text>
              <Button onClick={() => sendTransaksi()} className="mt-3 w-100">Kirim bukti transfer</Button>
            </Card>
          </Col>
        </Row>
      </>
    )


    function ImageInput(props) {
      const { setImg, preview, setPreview } = props;
      return (
        <Card className="p-2">
          <div className="p-1 text-center" style={{ border: '4px dashed #25B013', minHeight: '100px' }}>
            <img className="img-fluid w-100 text-center" src={preview} alt="Foto Bukti Pembayaran" />
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
        const maxSize = 4194304
        const file = e.target.files[0];
        console.log(file);
        if (file.size < maxSize) {
          let reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result)
            setImg(file);
          };
          reader.readAsDataURL(file);
        } else {
          alert('Besar file gambar tidak boleh melebihi 4 MB')
        }
      }
    }
  }


}
