import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Text(props) {
  const { type = 'body', isLink = false, to = false, green = false, inline = false, keyProp = false } = props;
  const className = [props.className];
  const key = (keyProp) ? 'text-'+keyProp : false;
  if (green) className.push('text-green');
  if (type == 'subtitle-1') className.push('subtitle-1');
  if (type == 'subtitle-2') className.push('subtitle-2');
  if (type == 'body') className.push('body-text');
  if (type == 'large-label') className.push('large-label');
  if (type == 'medium-label') className.push('medium-label');
  if (type == 'small-label') className.push('small-label');
  if (type == 'lead') className.push('lead');

  if (isLink) {
    return (
      <Link className={className.join(' ')} to={to} style={props.style} key={key}>
        {props.children}
      </Link>
    )
  }
  if (inline) {
    return (
      <span className={className.join(' ')} style={props.style} key={key}>
        {props.children}
      </span>
    )
  }
  return (
    <p className={className.join(' ')} style={props.style} key={key}>
      {props.children}
    </p>
  )
}

