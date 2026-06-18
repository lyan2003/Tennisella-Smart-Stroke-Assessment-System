import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("player");

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Sign Up</h2>

        <input type="text" placeholder="Account" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />

        <div className="roles">
          <label>
            <input
              type="radio"
              checked={role === "player"}
              onChange={() => setRole("player")}
            />
            Player
          </label>

          <label>
            <input
              type="radio"
              checked={role === "coach"}
              onChange={() => setRole("coach")}
            />
            Coach
          </label>
        </div>


        <button
          className="primary"
          onClick={() => navigate(role === "player" ? "/player" : "/coach")}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}
