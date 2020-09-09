import React, { useState } from 'react';
import './App.css';

const Cell = (props) => 
  <div 
    className="cell" 
    onClick={props.onClick}>{
      props.getCellValue()}
  </div>


const App = () => {
  const [playerTurnState, setPlayerTurnState] = useState('X');
  const [boardState, setBoardState] = useState(Array(9).fill(''));
  const getPlayerTurnState = () => playerTurnState;
  const switchPlayerTurn = () => setPlayerTurnState(playerTurnState === 'X' ? 'O' : 'X');
  const gameTied = board => 
    board.filter(cellValue => cellValue === '').length === 0
  const gameWonBy = (board, player) => 
    (board[0] === board[1] && board[0] === board[2] && board[0] === player)
    || (board[6] === board[7] && board[6] === board[8] && board[6] === player)
    || (board[3] === board[4] && board[3] === board[5] && board[3] === player)
    || (board[0] === board[3] && board[0] === board[6] && board[0] === player)
    || (board[1] === board[4] && board[1] === board[7] && board[1] === player)
    || (board[2] === board[5] && board[2] === board[8] && board[2] === player)
    || (board[0] === board[4] && board[0] === board[8] && board[0] === player)
    || (board[2] === board[4] && board[2] === board[6] && board[2] === player);
  const gameWon = board =>
    gameWonBy(board, 'X')
    || gameWonBy(board, 'O');
  const gameEnded = board => 
    gameTied(board)
    || gameWon(board);

  return (
    <div className="App">
      <div>
        <span style={{display: gameEnded(boardState) ? 'none' : 'block'}}>{playerTurnState} turn</span>
        <span style={{display: gameTied(boardState) ? 'block' : 'none'}}>Tied</span>
        <span style={{display: gameWon(boardState) ? 'block' : 'none'}}>{gameWonBy(boardState, 'X') ? 'X' : 'O'} won</span>
      </div>
      <div id="board">
        {Array(9)
          .fill()
          .map((_, i) => (
            <Cell 
              key={i}
              getCellValue={() => boardState[i]}
              onClick={() => 
                makeMove(
                  boardState,
                  value => {
                    const board = boardState.map((_, i2) => i === i2 && _ === '' ? value : _);
                    setBoardState(board);
                    return board;
                  },
                  getPlayerTurnState,
                  switchPlayerTurn,
                  gameEnded)} />
          ))}
      </div>
    </div>
  );
}

const makeMove = (
  previousBoard,
  updateBoard,
  getPlayerTurnState, 
  switchPlayerTurn,
  gameEnded
) => {
  if(gameEnded(previousBoard)) {
    return;
  }

  const updatedBoard = updateBoard(getPlayerTurnState());

  if(gameEnded(updatedBoard)) {
    console.log("end");
    return;
  }

  if(!previousBoard.every((value, index) => value === updatedBoard[index])) {
    console.log("swith player");
    switchPlayerTurn();  
  }
}

export default App;
