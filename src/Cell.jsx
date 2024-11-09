import React, { useState, useContext } from "react";
import GameContext from "./GameContext";
import "./Cell.css";
export default function Cell(props) {
  const cell = props.cell;

  const { revealCell, flagCell } = useContext(GameContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleOnClick = (event) => {
    event.preventDefault();
    revealCell(cell.row, cell.column);
  };
  const handleOnContextMenu = (event) => {
    event.preventDefault();
    flagCell(cell.row, cell.column);
  };
  const getCellStyle = () => {
    if (isHovered) {
      return {
        backgroundColor: "#bbb", // Color when hovered
        cursor: "pointer",
      };
    }

    return {
      backgroundColor: cell.isRevealed ? "#ddd" : "#aaa",
      cursor: "pointer",
    };
  };
  const cellStyle = {
    width: "30px",
    height: "30px",
    border: "1px solid gray",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...getCellStyle(),
  };

  return (
    <div
      style={cellStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={(e) => handleOnContextMenu(e)}
      onClick={(e) => handleOnClick(e)}
      className="cell"
    >
      {cell.isRevealed ? (cell.isMine ? "💣" : cell.adjacentMines || "") : ""}
      {cell.isFlagged && !cell.isRevealed ? "🚩" : ""}
    </div>
  );
}
