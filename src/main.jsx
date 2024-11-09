import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GameProvider } from "./GameProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Game from "./Game";
import WelcomePage from "./WelcomePage";
import Rules from "./Rules";
const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  { path: "/game/:difficulty", element: <Game /> },
  { path: "/rules", element: <Rules /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GameProvider>
      <RouterProvider router={router} />
    </GameProvider>
  </StrictMode>
);
