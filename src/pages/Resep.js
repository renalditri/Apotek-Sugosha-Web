import React, { useState } from 'react'
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { Text } from '../components/parts'

function Resep() {
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
          {ImageInput()}
        </Col>
        <Col md={4}>
          <Card className="px-3 pt-1 pb-3">
            <Text className="mb-2" type="large-label">Perhatian</Text>
            <Text className="mb-2" type="body">Harap cek foto resep agar tulisan pada resep terlihat jelas dan dapat dibaca</Text>
            <Button>Kirim resep</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

function ImageInput() {
  const [img, setImg] = useState()
  return (
    <Card className="p-2">
      <div className="p-1 text-center" style={{border: '4px dashed #25B013', minHeight: '100px'}}>
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

export default Resep;
