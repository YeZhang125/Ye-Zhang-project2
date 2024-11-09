import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./WelcomePage.css";
export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="outer-container">
      <div className="welcome-container">
        <h1 className="game-title">Minesweeper</h1>

        <p className="game-tagline">
          Test your skills and clear the minefield!
        </p>

        <Link to="/game/easy" className="play-link">
          Play Minesweeper
        </Link>
      </div>
    </div>
  );
}
