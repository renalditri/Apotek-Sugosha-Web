import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';
import Text from '../Text';
import Currency from '../../../Currency';

export default function Products(props) {
  const { statusData } = props;
  const size1 = (statusData.jenis != 0) ? 8 : 9;
  const size2 = (statusData.jenis != 0) ? 4 : 3;

  const produk = () => {
    return statusData.produk.map((data, i) => {
      return (
        <tr key={"table-row-" + i} className={(i == 0) ? "table-borderless" : ""}>
          <td key={"col-" + i} colSpan="100%">
            <Row key={"row-" + i} style={{ minWidth: "100%" }}>
              {resep(data, i)}
            </Row>
          </td>
        </tr>
      );
    });
  }

  const resep = (data, i) => {
    return (statusData.jenis == 1) ?
      <>
        <Col
          key={"col-name-" + i}
          md={size1}
          className="d-flex align-items-center large-label">{data.nama_produk} ({data.jumlah} {data.satuan})</Col>
        <Col
          key={"col-price-" + i}
          md={size2}
          className="d-flex align-items-center body-text">{Currency.format(data.harga)}/{data.satuan}</Col>
      </>
      :
      <>
        <Col key={"col-img-" + i} md={2}><img src={data.img_path} className="img-fluid" /></Col>
        <Col
          key={"col-name-" + i}
          md={7}
          className="d-flex align-items-center large-label"
        >
          {data.nama_produk} ({data.jumlah} {data.satuan})
        </Col>
        <Col
          key={"col-price-" + i}
          md={3}
          className="d-flex align-items-center body-text"
        >
          {Currency.format(data.harga)}/{data.satuan}
        </Col>
      </>
  }

  const noProduk = () => {
    return (
      <tr className="table-borderless">
        <td colSpan="100%">
          <Row style={{ minWidth: "100%" }}>
            <Col md={size1} className="d-flex align-items-center large-label">-</Col>
            <Col md={size2} className="d-flex align-items-center body-text">Rp -</Col>
          </Row>
        </td>
      </tr>
    );
  }

  const pengiriman = () => {
    return (Object.keys(statusData.data_pengiriman).length > 0) ?
      <Row style={{ minWidth: "100%" }}>
        <Col md={size1} className="body-text">
          <b>Pengiriman ke {statusData.data_pengiriman.alamat}, {statusData.data_pengiriman.kota}, a/n {statusData.nama} ({statusData.nomor_telepon})</b>
        </Col>
        <Col
          md={size2}
          className="d-flex align-items-center body-text"
          style={{
            color:
              "#FE9A22"
          }}>
          <b>
            {(statusData.data_pengiriman.nomor_telepon) ? statusData.data_pengiriman.pengiriman.split('-')[0] : statusData.data_pengiriman.pengiriman}
            {(statusData.data_pengiriman.nomor_telepon) ? ' - Nomor Kurir: ' + statusData.data_pengiriman.nomor_telepon : ''}
          </b>
        </Col>
      </Row>
      :
      <Row style={{ minWidth: "100%" }}>
        <Col md={size1} className="body-text"><b>Pengiriman ke -</b></Col>
        <Col md={size2} className="d-flex align-items-center body-text"></Col>
      </Row>
  }

  return (
    <Table className="body-text mt-3">
      {
        (!statusData.produk || statusData.produk.length <= 0) ? noProduk() : produk()
      }
      {
        statusData.jenis == 0 ?
          <tr style={{ height: "0.2rem" }}>
            <td colSpan="100%" style={{ height: "0.2rem" }}></td>
          </tr>
          : ''
      }
      <tr>
        <td colSpan="100%">
          <Row style={{ minWidth: "100%" }}>
            <Col md={size1} className="body-text text-green"><b>Total</b></Col>
            <Col md={size2} className="d-flex align-items-center body-text text-green"><b>{Currency.format(statusData.total)}</b></Col>
          </Row>
        </td>
      </tr>
      <tr>
        <td colSpan="100%">
          {pengiriman()}
        </td>
      </tr>
    </Table>
  );
}