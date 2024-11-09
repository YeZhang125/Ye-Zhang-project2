import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cell from "./Cell";
import GameContext from "./GameContext";
import "./Game.css";

function Game() {
  const globalProps = useContext(GameContext);

  const navigate = useNavigate();
  const { difficulty } = useParams();

  const rowComponents = [];

  useEffect(() => {
    globalProps.generateBoard(difficulty);
  }, [difficulty]);

  if (globalProps.board) {
    const board = globalProps.board;

    for (let row = 0; row < board.length; row++) {
      const singleRowComponent = [];
      for (let column = 0; column < board[row].length; column++) {
        const key = row + "-" + column;
        //   console.log(board[row][column]);
        const cell = board[row][column];
        const cellEl = <Cell key={key} cell={cell} />;
        singleRowComponent.push(cellEl);
      }
      const styledRowComponent = (
        <div key={row} className="row">
          {singleRowComponent}
        </div>
      );

      rowComponents.push(styledRowComponent);
    }
  }

  return (
    <div>
      <div className="button-group">
        <button
          onClick={() => globalProps.resetGameKey()}
          className="reset-button"
        >
          Reset
        </button>
        <button
          onClick={() => navigate("/game/easy")}
          className="difficulty-button"
        >
          Play Easy!
        </button>
        <button
          onClick={() => navigate("/game/medium")}
          className="difficulty-button"
        >
          Play Medium!
        </button>
        <button
          onClick={() => navigate("/game/hard")}
          className="difficulty-button"
        >
          Play Hard!
        </button>
      </div>

      <h1>Game: {difficulty.toUpperCase()}</h1>
      <p>
        Board size:
        {` ${globalProps.boardSize?.rows || "--"} x ${
          globalProps.boardSize?.columns || "--"
        } `}
      </p>
      <p>Mines: {globalProps.mineCount || "--"}</p>
      <div className="game-info">
        <p>Status: {globalProps.gameStatus || "--"}</p>
        <p>Mines Left: {globalProps.minesLeft || "--"}</p>
      </div>
      {rowComponents}

      {globalProps.gameStatus === "lost" && (
        <div className="game-status">
          <p>Game Over! You lost!</p>
          <button onClick={() => globalProps.resetGameKey()}>Try Again</button>
        </div>
      )}

      {globalProps.gameStatus === "won" && (
        <div className="game-status">
          <p>Game Over! You win!</p>
          <button onClick={() => globalProps.resetGameKey()}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default Game;
