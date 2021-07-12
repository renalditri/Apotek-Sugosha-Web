import React from 'react';
import Text from '../parts/Text';

export default function Breadcrumb(props) {
  const className = [props.className];
  return (
    <div className={className.join(" ")}>
      {previousUrl()}
      <Text key="breadcrumb" inline type="large-label">{props.current}</Text>
    </div>
  )

  function previousUrl() {
    return props.url.map((item, i) => {
      return (
        <span key={i}>
          <Text key={'bread-'+i} keyProp={i+1} inline green isLink type="large-label" to={item.to}>{item.name}</Text>
          <Text key={'crumb-'+i} keyProp={i+2} inline type="large-label"> / </Text>
        </span>
      )
    })
  }
}
