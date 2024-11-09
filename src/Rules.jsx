import React from "react";
import { Link } from "react-router-dom";

import "./Rules.css";
const Rules = () => {
  return (
    <div className="rules">
      <h1>Rules</h1>
      <hr></hr>

      <p>
        Minesweeper rules are very simple. The board is divided into cells, with
        mines randomly distributed. To win, you need to open all the cells. The
        number on a cell shows the number of mines adjacent to it. Using this
        information, you can determine cells that are safe, and cells that
        contain mines. Cells suspected of being mines can be marked with a flag
        using the right mouse button.
      </p>

      <Link to="/game/easy" className="play-link">
        Play Minesweeper
      </Link>
    </div>
  );
};

export default Rules;
