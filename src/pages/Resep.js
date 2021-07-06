import React, { useState } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { Text } from '../components/parts'
import { authenticationService } from '../services/authentication';

const user_id = authenticationService.user_id;

function Resep(props) {
  const [img, setImg] = useState()

  const postResep = () => {
    if(!img) {
      console.log(img);
      alert('Isi gambar terlebih dahulu')
    } else {
      const formData = new FormData();
      formData.append("id_pembeli", user_id);
      formData.append("data_pengiriman", "{}");
      formData.append("status", 0);
      formData.append("jenis", 1);
      formData.append("resep", img);
      fetch('http://localhost:4000/transaksi/resep', {
        method: 'POST',
        body: formData
      })
      .then(res => {
        if(res.status == 200) {
          console.log(res);
          alert('Resep berhasil dikirim!');
          props.history.push('/');
        } else {
          console.log(res);
          alert('Resep gagal terkirim');
        }
      })
      .catch(err => {
        console.log('Err: ', err);
        alert('Resep gagal terkirim');
      })
    }
  }

  return (
    <Container>
      <Row className="mt-3">
        <Col className="mb-4">
          <h1>Tebus Resep</h1>
          <Text type="subtitle-1">Untuk melakukan tebus resep silahkan upload foto resep yang dimilki, kemudian klik kirim resep</Text>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ImageInput setImg={setImg} />
        </Col>
        <Col md={4}>
          <Card className="px-3 pt-1 pb-3">
            <Text className="mb-2" type="large-label">Perhatian</Text>
            <Text className="mb-2" type="body">Harap cek foto resep agar tulisan pada resep terlihat jelas dan dapat dibaca</Text>
            <Button onClick={() => {postResep()}}>Kirim resep</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

function ImageInput(props) {
  const { setImg } = props
  const [preview, setPreview] = useState()
  return (
    <Card className="p-2">
      <div className="p-1 text-center" style={{border: '4px dashed #25B013', minHeight: '100px'}}>
        <img className="img-fluid w-100 text-center" src={preview} alt="Foto Resep" />
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
    if(file.size < maxSize) {
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

export default Resep;
