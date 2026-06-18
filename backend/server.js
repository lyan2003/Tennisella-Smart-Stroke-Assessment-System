const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Arduino بيبعت هنا
app.post("/data", (req, res) => {
  const data = req.body;

  console.log("📡 Incoming Data:", data);

  // ابعت الداتا لايف للويب
  io.emit("liveData", data);

  res.sendStatus(200);
});

server.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
