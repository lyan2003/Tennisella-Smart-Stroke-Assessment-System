import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function Coach() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Squad Overview");

  // قائمة اللاعبين وبياناتهم
  const [players] = useState([
    { id: 1, name: "Lara Youssef", status: "Live Training", avgSpeed: "24.5", strokeQuality: "Optimal", gripForce: "18", pitch: "14", roll: "22" },
    { id: 2, name: "Omar Hassan", status: "Offline", avgSpeed: "22.1", strokeQuality: "Good", gripForce: "15", pitch: "10", roll: "18" },
    { id: 3, name: "Nour Ali", status: "Live Training", avgSpeed: "26.8", strokeQuality: "Excellent", gripForce: "21", pitch: "18", roll: "25" },
    { id: 4, name: "Youssef Ahmed", status: "Offline", avgSpeed: "19.4", strokeQuality: "Needs Work", gripForce: "12", pitch: "8", roll: "12" },
  ]);

  const [selectedPlayer, setSelectedPlayer] = useState(players[0]);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackList, setFeedbackList] = useState([
    { id: 1, player: "Lara Youssef", note: "Great topspin control in session #4. Keep grip force stable.", date: "Today, 4:30 PM" }
  ]);

  // قراءة بيانات المستخدم الحالي
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("tennisella_current_user"));
    const savedUser = JSON.parse(localStorage.getItem("tennisella_user"));
    setCurrentUser(user || savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tennisella_current_user");
    navigate("/login");
  };

  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    const newNote = {
      id: Date.now(),
      player: selectedPlayer.name,
      note: feedbackText,
      date: "Just now"
    };
    setFeedbackList([newNote, ...feedbackList]);
    setFeedbackText("");
    alert(`Feedback sent successfully to ${selectedPlayer.name}!`);
  };

  // إعدادات الرسم البياني لأداء الفريق
  const teamPerformanceChart = {
    labels: players.map((p) => p.name),
    datasets: [
      {
        label: "Avg Swing Speed (m/s)",
        data: players.map((p) => Number(p.avgSpeed)),
        backgroundColor: "rgba(13, 148, 136, 0.85)",
        borderRadius: 8,
      },
    ],
  };

  const weeklyProgressChart = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Team Accuracy Rate (%)",
        data: [72, 75, 78, 82, 80, 88, 91],
        borderColor: "#0284c7",
        backgroundColor: "rgba(2, 132, 199, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const displayName = currentUser?.fullName || currentUser?.username || "Head Coach";

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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
            <img src="/logo1.png" alt="Tennisella Logo" style={{ height: "32px" }} />
            <span style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#1f2937" }}>Tennisella</span>
          </div>

          <div style={{ height: "24px", width: "1px", backgroundColor: "#cbd5e1" }}></div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0d9488&color=ffffff`}
              alt="Coach Avatar"
              style={{ width: "38px", height: "38px", borderRadius: "50%", border: "2px solid #0d9488" }}
            />
            <div>
              <span style={{ fontWeight: "700", color: "#334155", fontSize: "0.95rem", display: "block" }}>
                {displayName}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#0d9488", fontWeight: "600" }}>Head Coach</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "#f1f5f9",
          padding: "4px 6px",
          borderRadius: "12px"
        }}>
          {["Squad Overview", "Analytics", "Live Racket Feed", "Send Feedback"].map((tab) => (
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
            Welcome back Coach, {displayName} 📋
          </h2>
          <p style={{ margin: 0, color: "#64748b", fontSize: "0.95rem" }}>
            Real-time squad telemetry, player grip diagnostics & performance management dashboard.
          </p>
        </div>

        {/* Summary KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "28px" }}>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Total Squad Players</span>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#0d9488", marginTop: "4px" }}>{players.length}</div>
          </div>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Active Live Sessions</span>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#16a34a", marginTop: "4px" }}>
              {players.filter(p => p.status === "Live Training").length}
            </div>
          </div>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Squad Avg Speed</span>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#0284c7", marginTop: "4px" }}>23.2 <span style={{ fontSize: "0.9rem", fontWeight: "normal" }}>m/s</span></div>
          </div>
          <div style={{ backgroundColor: "#ffffff", borderRadius: "14px", padding: "20px", border: "1px solid #e2e8f0", textAlign: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: "600" }}>Stroke Accuracy Rate</span>
            <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#8b5cf6", marginTop: "4px" }}>91%</div>
          </div>
        </div>

        {/* Dynamic Tab Views */}

        {/* TAB 1: Squad Overview */}
        {activeTab === "Squad Overview" && (
          <div>
            <h3 style={{ color: "#334155", marginBottom: "16px" }}>Player Roster & Status</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {players.map((player) => (
                <div key={player.id} style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.03)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#1f2937" }}>{player.name}</span>
                    <span style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      backgroundColor: player.status === "Live Training" ? "#f0fdf4" : "#f1f5f9",
                      color: player.status === "Live Training" ? "#166534" : "#64748b",
                      border: `1px solid ${player.status === "Live Training" ? "#bbf7d0" : "#cbd5e1"}`
                    }}>
                      {player.status}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "#475569", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <div>⚡ <strong>Avg Speed:</strong> {player.avgSpeed} m/s</div>
                    <div>🎯 <strong>Stroke Quality:</strong> {player.strokeQuality}</div>
                    <div>✊ <strong>Grip Force:</strong> {player.gripForce} N</div>
                  </div>
                  <button
                    onClick={() => { setSelectedPlayer(player); setActiveTab("Live Racket Feed"); }}
                    style={{
                      width: "100%",
                      marginTop: "16px",
                      padding: "10px",
                      backgroundColor: "#f0fdf4",
                      color: "#0d9488",
                      border: "1px solid #ccfbf1",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      fontSize: "0.85rem",
                      cursor: "pointer"
                    }}
                  >
                    Inspect Live Telemetry →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Analytics */}
        {activeTab === "Analytics" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "24px" }}>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
              <h4 style={{ margin: "0 0 16px 0", color: "#334155" }}>Squad Swing Speed Comparison (m/s)</h4>
              <div style={{ height: "260px" }}><Bar data={teamPerformanceChart} options={{ responsive: true, maintainAspectRatio: false }} /></div>
            </div>
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "20px", border: "1px solid #e2e8f0" }}>
              <h4 style={{ margin: "0 0 16px 0", color: "#334155" }}>Weekly Squad Accuracy Trend (%)</h4>
              <div style={{ height: "260px" }}><Line data={weeklyProgressChart} options={{ responsive: true, maintainAspectRatio: false }} /></div>
            </div>
          </div>
        )}

        {/* TAB 3: Live Racket Feed */}
        {activeTab === "Live Racket Feed" && (
          <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "28px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, color: "#1f2937" }}>Live Racket Telemetry Stream</h3>
              <div>
                <label style={{ fontSize: "0.85rem", fontWeight: "600", marginRight: "8px", color: "#475569" }}>Select Player:</label>
                <select
                  value={selectedPlayer.id}
                  onChange={(e) => setSelectedPlayer(players.find(p => p.id === Number(e.target.value)))}
                  style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                >
                  {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "18px" }}>
              <div style={{ padding: "16px", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Current Player</span>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#0d9488" }}>{selectedPlayer.name}</div>
              </div>
              <div style={{ padding: "16px", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Recorded Swing Speed</span>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#0284c7" }}>{selectedPlayer.avgSpeed} m/s</div>
              </div>
              <div style={{ padding: "16px", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Pitch / Roll Angles</span>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#f59e0b" }}>{selectedPlayer.pitch}° / {selectedPlayer.roll}°</div>
              </div>
              <div style={{ padding: "16px", backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Grip Force Sensor</span>
                <div style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#16a34a" }}>{selectedPlayer.gripForce} N</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Send Feedback */}
        {activeTab === "Send Feedback" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {/* Feedback Form */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ marginTop: 0, color: "#1f2937" }}>Send Tactical Feedback</h3>
              <form onSubmit={handleSendFeedback} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "0.85rem", fontWeight: "600" }}>Choose Player</label>
                  <select
                    value={selectedPlayer.id}
                    onChange={(e) => setSelectedPlayer(players.find(p => p.id === Number(e.target.value)))}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  >
                    {players.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "0.85rem", fontWeight: "600" }}>Coach Notes / Drills</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Enter technique corrections or recommended drills..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none" }}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  style={{ padding: "12px", backgroundColor: "#0d9488", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}
                >
                  Send Notes to Player
                </button>
              </form>
            </div>

            {/* Sent Feedback Log */}
            <div style={{ backgroundColor: "#ffffff", borderRadius: "16px", padding: "24px", border: "1px solid #e2e8f0" }}>
              <h3 style={{ marginTop: 0, color: "#1f2937" }}>Recent Sent Notes</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {feedbackList.map((item) => (
                  <div key={item.id} style={{ padding: "12px 16px", backgroundColor: "#f8fafc", borderRadius: "10px", borderLeft: "4px solid #0d9488" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <strong style={{ color: "#334155" }}>{item.player}</strong>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{item.date}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.88rem", color: "#475569" }}>{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
