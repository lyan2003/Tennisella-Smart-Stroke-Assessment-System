import { useState } from "react";
import "./Player.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);


export default function Player() {
  const [connected, setConnected] = useState(false);

  const [swingSpeed, setSwingSpeed] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);
  const [strokeType, setStrokeType] = useState("-");
  const [swingQuality, setSwingQuality] = useState("-");
  const [gripForce, setGripForce] = useState(0);
  const [gripQuality, setGripQuality] = useState("-");
  const [speedData, setSpeedData] = useState([]);
const [pitchData, setPitchData] = useState([]);
const [rollData, setRollData] = useState([]);
const [labels, setLabels] = useState([]);
const [strokeSpeed, setStrokeSpeed] = useState([]);
const [strokePitch, setStrokePitch] = useState([]);
const [strokeRoll, setStrokeRoll] = useState([]);


  async function connectBLE() {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ name: "TennisRacket" }],
      optionalServices: [
        "12345678-1234-1234-1234-1234567890ab"
      ],
    });

    const server = await device.gatt.connect();

    const service = await server.getPrimaryService(
      "12345678-1234-1234-1234-1234567890ab"
    );

    const characteristic = await service.getCharacteristic(
      "abcd1234-1234-1234-1234-abcdef123456"
    );

    await characteristic.startNotifications();

    characteristic.addEventListener(
      "characteristicvaluechanged",
      handleData
    );

    setConnected(true);
    console.log("✅ BLE Connected");
  } catch (err) {
    console.error(err);
    alert("Bluetooth connection failed");
  }
}

function handleData(event) {
  const value = event.target.value;
  const decoder = new TextDecoder("utf-8");
  const raw = decoder.decode(value);

  console.log("RAW BLE:", raw);

  if (!raw.startsWith("<TRAJ")) return;

  const clean = raw.replace("<TRAJ|", "").replace(">", "");
  const [meta, traj] = clean.split("|");

  /* ---------- META DATA ---------- */
  const [stroke, sQuality, gQuality, gForce] = meta.split(",");

  setStrokeType(stroke);
  setSwingQuality(sQuality);
  setGripQuality(gQuality);
  setGripForce(Number(gForce));

  /* ---------- RESET CHARTS (new stroke) ---------- */
  setStrokeSpeed([]);
  setStrokePitch([]);
  setStrokeRoll([]);

  /* ---------- TRAJECTORY ---------- */
  const points = traj.split(";").filter(Boolean);

  points.forEach((p, i) => {
    const [speed, pitch, roll] = p.split(":").map(Number);

    setStrokeSpeed((prev) => [...prev, speed]);
    setStrokePitch((prev) => [...prev, pitch]);
    setStrokeRoll((prev) => [...prev, roll]);

    // last sample → show live values
    if (i === points.length - 1) {
      setSwingSpeed(speed);
      setPitch(pitch);
      setRoll(roll);
    }
  });
}



const speedChart = {
  labels: strokeSpeed.map((_, i) => i),
  datasets: [{
    label: "Swing Speed Trajectory",
    data: strokeSpeed,
    tension: 0.4,
  }],
};



const orientationChart = {
  labels: strokePitch.map((_, i) => i),
  datasets: [
    {
      label: "Pitch",
      data: strokePitch,
      borderColor: "#6EC6C4",
      tension: 0.4,
    },
    {
      label: "Roll",
      data: strokeRoll,
      borderColor: "#0F5C5F",
      tension: 0.4,
    },
  ],
};



  return (
    <div className="player-page">
      {/* Header */}
      <header className="player-header">
        <div className="player-info">
          <img src="/player.jpeg" alt="Player" />
          <span>Lara Youssef</span>
        </div>

        <nav className="player-nav">
          <button className="active">Live Training</button>
          <button>Sessions</button>
          <button>Feedback</button>
        </nav>

        <button className="ble-btn" onClick={connectBLE}>
          {connected ? "Connected" : "Connect Racket"}
        </button>
      </header>

      {/* Live Training */}
      <section className="live-training">
        {/* BIG CHARTS ROW */}
        <div className="charts-row">
          <div className="metric-card big">
            <h4>Swing Speed</h4>
            <div className="metric-value">{swingSpeed} m/s</div>
            <div className="chart-box">
              <Line data={speedChart} />
            </div>

          </div>

          <div className="metric-card big">
            <h4>Orientation Angle</h4>
            <div className="orientation-values">
              <span>Pitch: {pitch}°</span>
              <span>Roll: {roll}°</span>
            </div>
            <div className="chart-box">
              <Line data={orientationChart} />
            </div>

          </div>
        </div>

        {/* SMALL CARDS GRID */}
        <div className="metrics-grid">
          <div className="metric-card">
            <h4>Stroke Type</h4>
            <div className="metric-text">{strokeType}</div>
          </div>

          <div className="metric-card">
            <h4>Swing Quality</h4>
            <div className="metric-text">{swingQuality}</div>
          </div>

          <div className="metric-card">
            <h4>Grip Force</h4>
            <div className="metric-value">{gripForce}</div>
          </div>

          <div className="metric-card">
            <h4>Grip Quality</h4>
            <div className="metric-text">{gripQuality}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
