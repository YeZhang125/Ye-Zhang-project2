import React, { useState, useEffect } from "react";
import GameContext from "./GameContext";

// Provider component
export const GameProvider = (props) => {
  const [difficulty, setDifficulty] = useState(null);
  const [boardSize, setBoardSize] = useState(null);
  const [mineCount, setMineCount] = useState(null);
  const [gameStatus, setGameStatus] = useState(null);
  const [minesLeft, setMinesLeft] = useState(null);
  const [firstClick, setFirstClick] = useState(true);
  const [board, setBoard] = useState(null);

  const [gameOverState, setGameOverState] = useState(false);

  const boardConfig = {
    easy: { rows: 8, columns: 8, mines: 10 },
    medium: { rows: 16, columns: 16, mines: 40 },
    hard: { rows: 16, columns: 30, mines: 99 },
  };

  //initial board
  const generateBoard = (difficulty) => {
    const { rows, columns, mines } = boardConfig[difficulty];

    const baseCell = {
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    };

    const newBoard = Array.from({ length: rows }, (_, row) =>
      Array.from({ length: columns }, (_, column) => ({
        row,
        column,
        ...baseCell,
      }))
    );

    setBoard(newBoard);
    setDifficulty(difficulty);
    setBoardSize({
      rows,
      columns,
    });
    setMineCount(mines);
    setMinesLeft(mines);
    setGameStatus("playing");
  };

  // place mines
  const placeMines = (currentBoard, excludeRow, excludeCol) => {
    let placedMines = 0;
    while (placedMines < boardConfig[difficulty].mines) {
      const row = Math.floor(Math.random() * boardConfig[difficulty].rows);
      const col = Math.floor(Math.random() * boardConfig[difficulty].columns);

      // Ensure the first-clicked cell and its neighbors are safe
      if (
        !currentBoard[row][col].isMine &&
        !(row === excludeRow && col === excludeCol)
      ) {
        currentBoard[row][col].isMine = true;
        placedMines++;
      }
    }

    // Update adjacent mine counts after mines are placed
    for (let row = 0; row < boardConfig[difficulty].rows; row++) {
      for (let col = 0; col < boardConfig[difficulty].columns; col++) {
        if (!currentBoard[row][col].isMine) {
          currentBoard[row][col].adjacentMines = countAdjacentMines(
            currentBoard,
            row,
            col
          );
        }
      }
    }
  };

  const countAdjacentMines = (currentBoard, row, col) => {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    let mineCount = 0;
    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 &&
        newRow < boardConfig[difficulty].rows &&
        newCol >= 0 &&
        newCol < boardConfig[difficulty].columns
      ) {
        if (currentBoard[newRow][newCol].isMine) {
          mineCount++;
        }
      }
    });
    return mineCount;
  };

  const flagCell = (rowIndex, colIndex) => {
    if (gameStatus !== "playing" || board[rowIndex][colIndex].isRevealed)
      return;

    const newBoard = [...board];

    newBoard[rowIndex][colIndex].isFlagged =
      !newBoard[rowIndex][colIndex].isFlagged;

    setMinesLeft(
      (prevMinesLeft) =>
        prevMinesLeft + (board[rowIndex][colIndex].isFlagged ? -1 : 0)
    );

    setBoard(newBoard);
  };

  const revealCell = (rowIndex, colIndex) => {
    if (gameStatus !== "playing" || board[rowIndex][colIndex].isRevealed)
      return;

    const newBoard = [...board];

    if (newBoard[rowIndex][colIndex].isMine) {
      setGameOverState(true);
      setGameStatus("lost");
    }

    if (firstClick) {
      setFirstClick(false);
      placeMines(newBoard, rowIndex, colIndex); // Place mines after the first click
    }

    // Reveal the clicked cell
    newBoard[rowIndex][colIndex].isRevealed = true;

    // If the cell has no adjacent mines, reveal its neighbors recursively
    if (board[rowIndex][colIndex].adjacentMines === 0) {
      revealAdjacentSafeCells(newBoard, rowIndex, colIndex);
    }

    checkForWin(newBoard);

    setBoard(newBoard);
  };

  const checkForWin = (currentBoard) => {
    const nonMineCell = currentBoard.reduce(
      (acc, row) =>
        acc + row.filter((cell) => !cell.isMine && !cell.isRevealed).length,
      0
    );
    if (nonMineCell === 0) {
      setGameStatus("won");
    }
  };

  const revealAdjacentSafeCells = (board, rowIndex, colIndex) => {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    directions.forEach(([dx, dy]) => {
      const newRow = rowIndex + dx;
      const newCol = colIndex + dy;
      if (
        newRow >= 0 &&
        newRow < boardConfig[difficulty].rows &&
        newCol >= 0 &&
        newCol < boardConfig[difficulty].columns &&
        !board[newRow][newCol].isRevealed &&
        !board[newRow][newCol].isMine
      ) {
        board[newRow][newCol].isRevealed = true;
        if (board[newRow][newCol].adjacentMines === 0) {
          revealAdjacentSafeCells(board, newRow, newCol); // Recursive reveal
        }
      }
    });
  };

  const resetGameKey = () => {
    setGameStatus("playing");
    setFirstClick(true);
    setGameOverState(false);
    setMinesLeft(mineCount);
    generateBoard(difficulty);
  };

  const globalProps = {
    board,
    generateBoard,
    resetGameKey,
    revealCell,
    flagCell,
    boardSize,
    gameStatus,
    minesLeft,
    mineCount,
  };

  return (
    <GameContext.Provider value={globalProps}>
      {props.children}
    </GameContext.Provider>
  );
};
