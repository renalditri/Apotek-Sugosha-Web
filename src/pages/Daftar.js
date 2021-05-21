import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";

function Daftar() {
  const [Nama, setNama] = useState("");
  const [TglLahir, setTglLahir] = useState("");
  const [NoHP, setNoHP] = useState("");
  const [password, setpassword] = useState("");
  const Swal = require("sweetalert2");
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
    console.log(Nama);
    console.log(TglLahir);
    console.log(NoHP);
    console.log(password);

    if (isValid()) {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Pendaftaran akun berhasil",
        showConfirmButton: false,
        timer: 800,
      });
      setTimeout(function () {
        window.location.href = "/";
      }, 900);
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Silahkan melengkapi data yang diperlukan",
        showConfirmButton: false,
        timer: 800,
      });
    }
  };
  return (
    <Container>
      <h1>Daftar</h1>
      <div className="logincontainer mx-auto">
        <Button
          variant="outline-dark"
          size="lg"
          block
          className="mb-3 button_login"
        >
          <b>Daftar Dengan Google</b>
        </Button>
        <div class="separator" style={{ color: "##6E7191" }}>
          Atau
        </div>
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
