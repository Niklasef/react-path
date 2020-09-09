import React, { useState } from 'react';
import './App.css';

const Cell = () => {
  const [value, setValueState] = useState('');
  return (
    <div className="cell" onClick={() => makeMove(setValueState)}>{value}</div>
  );
}

const makeMove = (setCellValueState) => {
  setCellValueState('X');
}

const App = () => {
  return (
    <div className="App">
      <div id="board">
        {Array(9)
          .fill()
          .map((_, i) => (
            <Cell key={i}/>
          ))}
      </div>
    </div>
  );
}

export default App;
