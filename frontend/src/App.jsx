import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Player from "./Player";
import Coach from "./Coach";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/player" element={<Player />} />
      <Route path="/coach" element={<Coach />} />
    </Routes>
  );
}
