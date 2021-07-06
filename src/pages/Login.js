import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { authenticationService } from "../services/authentication"

function Login(props) {
  const [NoHP, setNoHP] = useState("");
  const [password, setpassword] = useState("");
  const [isChecked, setCheck] = useState(false);
  const Swal = require("sweetalert2");

  if(authenticationService.currentUser) { props.history.push('/') }

  const isValid = () => {
    let valid = true;
    if (NoHP === "") {
      valid = false;
    }
    if (password === "") {
      valid = false;
    }
    return valid;
  };

  const handleLogin = () => {
    console.log(NoHP);
    console.log(password);
    console.log(isChecked);
    if (isValid()) {
      authenticationService.login(NoHP, password)
      .then( user => {
        console.log(user);
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
        const wrongData = (err == 'Data yang dikirim tidak valid, mohon dicek kembali');
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: (wrongData) ? "Nomor Hp/Password yang dimasukkan salah" : "Terdapat masalah dalam proses login",
          showConfirmButton: false,
          timer: 1800,
        });
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Silahkan cek kembali data yang diinputkan",
        showConfirmButton: false,
        timer: 1800,
      });
    }
  };
  return (
    <Container>
      <h1>Login</h1>
      <div className="logincontainer mx-auto">
        <Button
          variant="outline-dark"
          size="lg"
          block
          className="mb-3 button_login"
        >
          <b>Login Dengan Google</b>
        </Button>
        <div class="separator" style={{ color: "##6E7191" }}>
          Atau
        </div>
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
        <Form.Group controlId="checkboxCategory">
          <Form.Check
            type="checkbox"
            label="Ingat saya"
            onChange={(e) => {
              setCheck(!isChecked);
            }}
          />
        </Form.Group>
        <Button
          onClick={handleLogin}
          variant="primary"
          size="lg"
          block
          className="mb-2"
        >
          Login
        </Button>
        <span>
          Belum Memiliki akun?{" "}
          <a href="/Daftar" style={{ color: "#25b013" }}>
            {" "}
            <b>Daftar Sekarang</b>
          </a>
        </span>
      </div>
    </Container>
  );
}
export default Login;
