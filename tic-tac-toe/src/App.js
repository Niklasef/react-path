import React, { useState } from 'react';
import Board from './Board'
import './App.css';

const App = () => {
  const [currentPlayerState, setCurrentPlayerState] = useState('X');
  const [boardState, setBoardState] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);

  const onCellClick = (x, y) => {
    if (!gameEnded(boardState)) {
      makeMove(
        () => wasBoardUpdated(
          boardState,
          () => updateCell(x, y, currentPlayerState, boardState, setBoardState)),
        () => switchPlayerTurn(setCurrentPlayerState, currentPlayerState))
    }
  }

  return (
    <div className="App">
      <div className="Status">
        <span style={{ display: gameEnded(boardState) ? 'none' : 'block' }}>{currentPlayerState} turn</span>
        <span style={{ display: gameTied(boardState) ? 'block' : 'none' }}>Tied</span>
        <span style={{ display: gameWon(boardState) ? 'block' : 'none' }}>{gameWonBy(boardState, 'X') ? 'X' : 'O'} won</span>
      </div>
      <Board
        getCellValue={(x, y) => boardState[x][y]}
        onCellClick={onCellClick} />
    </div>
  );
}

export default App;

const gameTied = board =>
  boardFull(board) && !gameWon(board);

const boardFull = board =>
  board.filter(row =>
    row.filter(cell => cell === '').length !== 0).length === 0;

const gameWonBy = (board, player) =>
  (board[0][0] === board[0][1] && board[0][0] === board[0][2] && board[0][0] === player)
  || (board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] === player)
  || (board[2][0] === board[2][1] && board[2][0] === board[2][2] && board[2][0] === player)
  || (board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] === player)
  || (board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] === player)
  || (board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] === player)
  || (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === player)
  || (board[2][2] === board[1][1] && board[2][2] === board[0][2] && board[2][2] === player);

const gameWon = board =>
  gameWonBy(board, 'X')
  || gameWonBy(board, 'O');

const gameEnded = board =>
  gameTied(board)
  || gameWon(board);

const makeMove = (
  wasBoardUpdated,
  switchPlayerTurn
) => {
  if (!wasBoardUpdated()) {
    return;
  }
  switchPlayerTurn();
};

const switchPlayerTurn = (setCurrentPlayerState, currentPlayer) => setCurrentPlayerState(currentPlayer === 'X' ? 'O' : 'X');

const wasBoardUpdated = (previousBoard, updateBoard) =>
  !previousBoard
    .every((row, y) => row.every((cellValue, x) => cellValue === updateBoard()[x][y]));

const updateCell = (x, y, currentPlayer, currentBoard, setBoardState) => {
  let board = currentBoard.map(row => row.map(cell => cell));
  board[x][y] =
    board[x][y] === ''
      ? currentPlayer
      : board[x][y];
  setBoardState(board);
  return board;
};
