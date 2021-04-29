import React from 'react';
import Text from './Text'
import Currency from '../../Currency';
import { Card, Button } from 'react-bootstrap';

export default function CheckoutCard(props) {
  const { array, onClick } = props;
  const items = () => {
    let x = { jumlah: 0, harga: 0, };
    array.forEach((cart) => {
      x.jumlah += cart.jumlah;
      x.harga += cart.harga * cart.jumlah;
    })
    return x;
  }
  return (
    <Card className="p-3">
      <Text className="mb-3" type="large-label">Ringkasan Keranjang</Text>
      <div>
        <Text type="body" className="m-0 my-1" style={{ float: "left" }}>Total Obat</Text>
        <Text type="body" className="m-0 my-1" style={{ float: "right" }}>{items().jumlah} Obat</Text>
      </div>
      <div className="active">
        <Text green type="large-label" style={{ float: "left" }}>Total Harga</Text>
        <Text green type="large-label" style={{ float: "right" }}>{Currency.format(items().harga)}</Text>
      </div>
      <Button onClick={onClick} className="mt-3 w-100">Lanjut Pembayaran</Button>
    </Card>
  )
}
