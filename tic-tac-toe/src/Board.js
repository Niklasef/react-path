import React from 'react';
import Cell from './Cell'

const Board = (props) => (
    <div id="board">
        {Array(3)
            .fill()
            .map((_, x) =>
                Array(3)
                    .fill()
                    .map((_, y) =>
                        (<Cell
                            key={x.toString() + y.toString()}
                            getValue={() => props.getCellValue(x, y)}
                            onClick={() => props.onCellClick(x, y)} />
                        )
                    )
            )
        }
    </div>
);

export default Board;
