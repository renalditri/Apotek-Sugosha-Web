import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { authenticationService } from "../services/authentication";
import config from '../config.json';

export default function Profile() {
  const [nama, setNama] = useState();
  const [nomor_telepon, setNomor] = useState();
  const [kota, setKota] = useState('');
  const [alamat, setAlamat] = useState('');
  const [TglLahir, setTglLahir] = useState('');
  const { token, ...user_data } = JSON.parse(authenticationService.currentUser);
  const [style, setStyle] = useState(Array(5).fill({}))
  const isSavedData = (user_data.saved_data) ? true : false;
  const Swal = require("sweetalert2");

  useEffect(() => {
    setNama(user_data.nama);
    setNomor(user_data.nomor_telepon);
    setTglLahir(user_data.tanggal_lahir);
    if (isSavedData) {
      setKota(user_data.saved_data.kota);
      setAlamat(user_data.saved_data.alamat)
    }
  }, [])

  const handleChange = (i, e) => {
    let newArr = [];
    const defValue = [
      user_data.nama,
      user_data.tanggal_lahir,
      user_data.nomor_telepon,
      (isSavedData) ? user_data.saved_data.kota : '',
      (isSavedData) ? user_data.saved_data.alamat : '',
    ];
    const defSet = [setNama, setTglLahir, setNomor, setKota, setAlamat];
    let newStyle = (!isChanged(defValue[i], e)) ? {} :
      (validation(i, e)) ? { borderColor: '#25B013' } : { borderColor: '#F46F6F' }
    style.forEach((s, index) => {
      if (i == index) { newArr[index] = newStyle }
      else { newArr[index] = s }
    })
    setStyle(newArr)
    defSet[i](e);
  }

  const isChanged = (def, val) => {
    if (def == val) {
      return false;
    }
    return true;
  }

  const handleClick = () => {
    const validData = {
      changedData: [],
      invalidData: []
    };
    const inputData = [nama, TglLahir, nomor_telepon, kota, alamat];
    const defValue = [
      user_data.nama,
      user_data.tanggal_lahir,
      user_data.nomor_telepon,
      (isSavedData) ? user_data.saved_data.kota : '',
      (isSavedData) ? user_data.saved_data.alamat : '',
    ];
    inputData.forEach((data, i) => {
      if (!validation(i, data)) {
        validData.invalidData.push(data);
      }
      if (isChanged(defValue[i], data)) {
        validData.changedData.push(data);
      }
    })
    const first_condition = (validData.invalidData.length == 0)
    const second_condition = (validData.changedData.length > 0);
    if (first_condition && second_condition) {
      const body = {
        nama: nama,
        nomor_telepon: nomor_telepon,
        tanggal_lahir: TglLahir,
        saved_data: (kota == '' && alamat == '') ? '' : JSON.stringify({
          kota: kota,
          alamat: alamat
        })
      }
      const reqOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
      fetch(config.base_url + '/pembeli/' + user_data.id_pembeli, reqOptions)
        .then(res => res.json())
        .then(res => {
          console.log('old', user_data);
          delete res.id;
          console.log('response: ', res);
          const newData = { ...user_data };
          Object.entries(res).forEach(([key, value]) => {
            if (key == 'saved_data') { value = JSON.parse(value); }
            console.log('data - key :' + key + ', value: ' + value);
            newData[key] = value;
          })
          return newData;
        })
        .then(res => {
          localStorage.setItem('currentUser', JSON.stringify({
            token: token,
            ...res
          }));
          Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'Data anda berhasil disimpan',
          });
          setTimeout(function () {
            window.location.reload();
          }, 1800);
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Terdapat masalah saat menyimpan data',
            timer: 3000,
          });
          console.log('Error: ', err);
        })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: (validData.invalidData.length > 0) ?
          'Periksa lagi data yang anda masukkan' : 'Data tidak ada yang diubah'
      })
    }
  }

  const validation = (i, data) => {
    switch (i) {
      case 2: {
        if (data != '' && data != 0 && !isNaN(parseInt(data)) && !isNaN(data) && data.length < 14) return true;
        return false;
      }
      default: {
        if (data != '') return true
        return false;
      }
    }
  }

  return (
    <Container className="body-text">
      <Form>
        <Row className="mt-3">
          <Col>
            <h1>Profil Saya</h1>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={3}>
            <Card className="p-3">
              <img className="img-fluid" src="/img/Profile.png" />
            </Card>
          </Col>
          <Col md={9}>
            <Card className="p-4">
              <Row>
                <Col>
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control
                    onChange={(e) => { handleChange(0, e.target.value) }}
                    type="text"
                    value={nama}
                    style={style[0]}
                  ></Form.Control>
                </Col>
                <Col>
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control
                    className="block"
                    type="date"
                    placeholder="tgl/bulan/tahun kelahiran"
                    onChange={(e) => { handleChange(1, e.target.value); }}
                    value={TglLahir}
                    style={style[1]}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Label>No. Handphone</Form.Label>
                  <Form.Control
                    onChange={(e) => { handleChange(2, e.target.value); }}
                    type="text"
                    value={nomor_telepon}
                    style={style[2]}
                  ></Form.Control>
                </Col>
                <Col>
                  <Form.Label>Asal Kota</Form.Label>
                  <Form.Control
                    onChange={(e) => { handleChange(3, e.target.value) }}
                    as="select"
                    custom
                    value={kota}
                    style={style[3]}
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
                    as="textarea"
                    onChange={(e) => { handleChange(4, e.target.value) }}
                    value={alamat}
                    style={style[4]}
                  ></Form.Control>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={{ span: 4, offset: 8 }}>
                  <Button
                    className="py-2 px-3 large-label float-right"
                    style={{ fontSize: '18px', borderRadius: '8px' }}
                    onClick={() => { handleClick() }}
                  >
                    Simpan perubahan
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}
