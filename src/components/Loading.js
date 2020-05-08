import React from 'react';
import './component.css';



export default function Loading(props) {
  const { open } = props;
  return (
      <div style={{display: open ? 'block' : 'none'}} id="loading_background">
        <div style={{display: open ? 'block' : 'none'}} id='loading'/>
      </div>
  );
}
