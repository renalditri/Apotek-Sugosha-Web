import React from 'react';
import Text from '../parts/Text';

export default function Breadcrumb(props) {
  const className = [props.className];
  return (
    <div className={className.join(" ")}>
      {previousUrl()}
      <Text inline type="large-label">{props.current}</Text>
    </div>
  )

  function previousUrl() {
    return props.url.map((item, i) => {
      return (
        <>
          <Text key={'bread-'+i} keyProp={i} inline green isLink type="large-label" to={item.to}>{item.name}</Text>
          <Text key={'crumb-'+i} keyProp={i+1} inline type="large-label"> / </Text>
        </>
      )
    })
  }
}
