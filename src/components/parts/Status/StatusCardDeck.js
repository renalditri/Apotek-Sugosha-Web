import React from 'react';
import StatusCard from './StatusCard';

export default function StatusCardDeck(props) {
  const { datas, status, jenis } = props;
  return datas.map((data, i) => {
    const filter1 = data.status === status || status === 6;
    const filter2 = data.jenis === jenis || jenis === 2;
    if (filter1 && filter2) {
      return (
        <StatusCard data={data} thisKey={i} key={'statuscard' + i} />
      )
    }
    return '';
  })
}
