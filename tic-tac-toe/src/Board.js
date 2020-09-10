import React from 'react';
import Cell from './Cell'

const Board = (props) => (
    <div id="board">
    {Array(9)
        .fill()
        .map((_, i) => (
        <Cell 
            key={i}
            getValue={() => props.getCellValue(i)}
            onClick={() => props.onCellClick(i) } />
        ))}
    </div>
);

export default Board;
