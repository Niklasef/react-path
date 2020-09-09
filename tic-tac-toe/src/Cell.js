import React from 'react';

const Cell = (props) => 
  <div 
    className="cell" 
    onClick={props.onClick}>
        {props.getCellValue()}
  </div>

export default Cell;