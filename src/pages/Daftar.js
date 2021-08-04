import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { authenticationService } from "../services/authentication";
import config from '../config.json';

function Daftar(props) {
  const [Nama, setNama] = useState("");
  const [TglLahir, setTglLahir] = useState("");
  const [NoHP, setNoHP] = useState("");
  const [password, setpassword] = useState("");
  const Swal = require("sweetalert2");

  if(authenticationService.currentUser) { props.history.push('/') }

  const isValid = () => {
    let valid = true;
    if (Nama === "") {
      valid = false;
    }
    if (TglLahir === "") {
      valid = false;
    }
    if (NoHP === "") {
      valid = false;
    }
    if (password === "") {
      valid = false;
    }
    return valid;
  };

  const handleDaftar = () => {
    const body = {
      nama: Nama,
      nomor_telepon: NoHP,
      tanggal_lahir: TglLahir,
      password: password
    }
    
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(body),
    }

    if (isValid()) {
      fetch(`${config.base_url}/pembeli`, requestOptions)
      .then(res => res.json())
      .then(res => {
        return authenticationService.login(res.nomor_telepon, password);
      })
      .then( user => {
        console.log(user);
        window.location.reload();
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Login berhasil",
          showConfirmButton: false,
          timer: 1800,
        });
      })
      .then(res => {
        props.history.push('/');
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: err,
          showConfirmButton: false,
          timer: 1800,
        });
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Silahkan melengkapi data yang diperlukan",
        showConfirmButton: false,
        timer: 1800,
      });
    }
  };
  return (
    <Container>
      <h1 className="ml-5">Daftar</h1>
      <div className="logincontainer mx-auto">
        <Form.Group>
          <Form.Label>Nama Lengkap</Form.Label>
          <Form.Control
            className="block"
            type="text"
            placeholder="Ketik nama lengkap anda"
            onChange={(e) => {
              setNama(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tanggal Lahir</Form.Label>
          <Form.Control
            className="block"
            type="date"
            placeholder="tgl/bulan/tahun kelahiran"
            onChange={(e) => {
              setTglLahir(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>No. Handphone</Form.Label>
          <Form.Control
            className="block"
            type="text"
            placeholder="08xxxxxxxxxx"
            onChange={(e) => {
              setNoHP(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Masukan password</Form.Label>
          <Form.Control
            className="block"
            type="password"
            placeholder="Masukan password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </Form.Group>

        <Button
          onClick={handleDaftar}
          variant="primary"
          size="lg"
          block
          className="mb-2"
        >
          Daftar Sekarang
        </Button>
        <span>
          Sudah Memiliki akun?{" "}
          <a href="/Daftar" style={{ color: "#25b013" }}>
            {" "}
            <b>Login</b>
          </a>
        </span>
      </div>
    </Container>
  );
}
export default Daftar;
