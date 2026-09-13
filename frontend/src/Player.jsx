import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Live Training");

  // حالة الاتصال والبيانات
  const [connected, setConnected] = useState(false);
  const [swingSpeed, setSwingSpeed] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);
  const [strokeType, setStrokeType] = useState("-");
  const [swingQuality, setSwingQuality] = useState("-");
  const [gripForce, setGripForce] = useState(0);
  const [gripQuality, setGripQuality] = useState("-");

  // بيانات رسم المنحنيات
  const [strokeSpeed, setStrokeSpeed] = useState([]);
  const [strokePitch, setStrokePitch] = useState([]);
  const [strokeRoll, setStrokeRoll] = useState([]);

  // 1. قراءة بيانات المستخدم الحالي المسجل في localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("tennisella_current_user"));
    const savedUser = JSON.parse(localStorage.getItem("tennisella_user"));
    setCurrentUser(user || savedUser);
  }, []);

  // دالة تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("tennisella_current_user");
    navigate("/login");
  };

  // 2. الاتصال بـ Bluetooth BLE
  async function connectBLE() {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ name: "TennisRacket" }],
        optionalServices: ["12345678-1234-1234-1234-1234567890ab"],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("12345678-1234-1234-1234-1234567890ab");
      const characteristic = await service.getCharacteristic("abcd1234-1234-1234-1234-abcdef123456");

      await characteristic.startNotifications();
      characteristic.addEventListener("characteristicvaluechanged", handleData);

      setConnected(true);
      console.log("✅ BLE Connected");
    } catch (err) {
      console.error(err);
      alert("Bluetooth connection failed or canceled.");
    }
  }

  // 3. معالجة البيانات القادمة من مضرب التنس
  function handleData(event) {
    const value = event.target.value;
    const decoder = new TextDecoder("utf-8");
    const raw = decoder.decode(value);

    console.log("RAW BLE:", raw);

    if (!raw.startsWith("<TRAJ")) return;

    const clean = raw.replace("<TRAJ|", "").replace(">", "");
    const [meta, traj] = clean.split("|");

    /* META DATA */
    const [stroke, sQuality, gQuality, gForce] = meta.split(",");
    setStrokeType(stroke || "-");
    setSwingQuality(sQuality || "-");
    setGripQuality(gQuality || "-");
    setGripForce(Number(gForce) || 0);

    /* TRAJECTORY DATA */
    const points = traj.split(";").filter(Boolean);
    const newSpeeds = [];
    const newPitches = [];
    const newRolls = [];

    points.forEach((p) => {
      const [speedVal, pitchVal, rollVal] = p.split(":").map(Number);
      newSpeeds.push(speedVal);
      newPitches.push(pitchVal);
      newRolls.push(rollVal);
    });

    setStrokeSpeed(newSpeeds);
    setStrokePitch(newPitches);
    setStrokeRoll(newRolls);

    if (newSpeeds.length > 0) {
      setSwingSpeed(newSpeeds[newSpeeds.length - 1]);
      setPitch(newPitches[newPitches.length - 1]);
      setRoll(newRolls[newRolls.length - 1]);
    }
  }

  /* إعدادات الرسم البياني للسرعة */
  const speedChart = {
    labels: strokeSpeed.map((_, i) => `${i + 1}`),
    datasets: [
      {
        label: "Swing Speed (m/s)",
        data: strokeSpeed,
        borderColor: "#0d9488",
        backgroundColor: "rgba(13, 148, 136, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  /* إعدادات الرسم البياني لزوايا الاتجاه */
  const orientationChart = {
    labels: strokePitch.map((_, i) => `${i + 1}`),
    datasets: [
      {
        label: "Pitch (°)",
        data: strokePitch,
        borderColor: "#0284c7",
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: "Roll (°)",
        data: strokeRoll,
        borderColor: "#f59e0b",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  // تحديد اسم العرض: إما اسم التسجيل، أو الاسم الافتراضي Lara Youssef
  const displayName = currentUser?.fullName || currentUser?.username || "Lara Youssef";

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      {/* Modern Header */}
      <header style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "14px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        {/* Brand & Dynamic User Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <img src="/logo1.png" alt="Tennisella Logo" style={{ height: "32px" }} />
            <span style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#1f2937" }}>Tennisella</span>
          </div>

          <div style={{ height: "24px", width: "1px", backgroundColor: "#cbd5e1" }}></div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src="/player.jpeg"
              alt="Player Avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=ccfbf1&color=0d9488`;
              }}
              style={{ width: "38px", height: "38px", borderRadius: "50%", objectFit: "cover", border: "2px solid #0d9488" }}
            />
            <span style={{ fontWeight: "600", color: "#334155", fontSize: "0.95rem" }}>
              {displayName}
            </span>
          </div>
        </div>

        {/* 🌟 Navigation Tabs: Live Training, Sessions, Feedback */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "#f1f5f9",
          padding: "4px 6px",
          borderRadius: "12px"
        }}>
          {["Live Training", "Sessions", "Feedback"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 18px",
                borderRadius: "8px",
                border: "none",
                fontWeight: "600",
                fontSize: "0.9rem",
                cursor: "pointer",
                transition: "all 0.2s",
                backgroundColor: activeTab === tab ? "#ffffff" : "transparent",
                color: activeTab === tab ? "#0d9488" : "#64748b",
                boxShadow: activeTab === tab ? "0 2px 4px rgba(0,0,0,0.06)" : "none"
              }}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Header Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* BLE Status Indicator */}
          <button
            onClick={connectBLE}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: connected ? "#f0fdf4" : "#fef2f2",
              color: connected ? "#166534" : "#991b1b",
              border: `1px solid ${connected ? "#bbf7d0" : "#fecaca"}`,
              borderRadius: "20px",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            <span style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: connected ? "#22c55e" : "#ef4444"
            }}></span>
            {connected ? "Racket Connected" : "Connect Racket"}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#ffffff",
              color: "#64748b",
              border: "1px solid #cbd5e1",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "0.85rem",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px" }}>

        {/* Welcome Banner */}
        <div style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "24px 32px",
          marginBottom: "28px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)"
        }}>
          <h2 style={{ margin: "0 0 6px 0", color: "#1f2937", fontSize: "1.6rem", fontWeight: "700" }}>
            Welcome back, {displayName} 👋
          </h2>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.95rem" }}>
            Live stroke telemetry & racket sensor analytics dashboard
          </p>
        </div>

        {/* Charts Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "24px", marginBottom: "28px" }}>

          {/* Swing Speed Chart */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h4 style={{ margin: 0, color: "#334155", fontSize: "1.05rem" }}>Swing Speed Trajectory</h4>
              <span style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#0d9488" }}>{swingSpeed} m/s</span>
            </div>
            <div style={{ height: "240px" }}>
              <Line data={speedChart} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Orientation Chart */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h4 style={{ margin: 0, color: "#334155", fontSize: "1.05rem" }}>Orientation Angles</h4>
              <div style={{ fontSize: "0.85rem", fontWeight: "600", display: "flex", gap: "12px" }}>
                <span style={{ color: "#0284c7" }}>Pitch: {pitch}°</span>
                <span style={{ color: "#f59e0b" }}>Roll: {roll}°</span>
              </div>
            </div>
            <div style={{ height: "240px" }}>
              <Line data={orientationChart} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

        </div>

        {/* Metrics Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Stroke Type</span>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#0d9488", marginTop: "8px" }}>
              {strokeType}
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Swing Quality</span>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#0284c7", marginTop: "8px" }}>
              {swingQuality}
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Grip Force</span>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#16a34a", marginTop: "8px" }}>
              {gripForce} <span style={{ fontSize: "0.85rem", fontWeight: "normal", color: "#64748b" }}>N</span>
            </div>
          </div>

          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Grip Quality</span>
            <div style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#8b5cf6", marginTop: "8px" }}>
              {gripQuality}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
