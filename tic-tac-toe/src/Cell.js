import React from 'react';

const Cell = (props) => (
  <div 
    className="cell" 
    onClick={props.onClick}>
        {props.getValue()}
  </div>
);

export default Cell;