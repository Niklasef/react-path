import React, { useState } from 'react';
import Board from './Board'
import './App.css';

const App = () => {
  const [playerTurnState, setPlayerTurnState] = useState('X');
  const [boardState, setBoardState] = useState(Array(9).fill(''));

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
  const updateCell = (cellIndex, player) => {
    const board = boardState.map((_, i) => cellIndex === i && _ === '' ? player : _);
    setBoardState(board);
    return board;
  };
  const wasBoardUpdated = (previousBoard, updateBoard) => 
    !previousBoard.every((value, index) => value === updateBoard()[index]);
  const makeMove = (
    wasBoardUpdated,
    switchPlayerTurn
  ) => {
    if(!wasBoardUpdated()) {
      return;
    }
    switchPlayerTurn();  
  };  
  const onCellClick = cellIndex =>{
    if(!gameEnded(boardState)) {
      makeMove(
        () => wasBoardUpdated(
          boardState,
          () => updateCell(cellIndex, playerTurnState)),
        switchPlayerTurn)
    }}

  return (
    <div className="App">
      <div>
        <span style={{display: gameEnded(boardState) ? 'none' : 'block'}}>{playerTurnState} turn</span>
        <span style={{display: gameTied(boardState) ? 'block' : 'none'}}>Tied</span>
        <span style={{display: gameWon(boardState) ? 'block' : 'none'}}>{gameWonBy(boardState, 'X') ? 'X' : 'O'} won</span>
      </div>
      <Board
        getCellValue={cellIndex => boardState[cellIndex]}
        onCellClick={onCellClick}
      />
    </div>
  );
}

export default App;
