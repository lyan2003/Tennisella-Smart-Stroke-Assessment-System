import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState("player");
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. تجميع بيانات الحساب الجديد
    const newUser = {
      fullName: formData.fullName,
      username: formData.username,
      password: formData.password,
      role: role
    };

    // 2. حفظ البيانات داخل localStorage في متصفح المستخدم
    localStorage.setItem("tennisella_user", JSON.stringify(newUser));

    alert("🎉 Account created successfully! Redirecting to Login...");

    // 3. التوجيه المباشر لصفحة تسجيل الدخول ليعمل Login بنفس الحساب
    navigate("/login");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8fafc",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        padding: "40px 32px",
        maxWidth: "460px",
        width: "100%",
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
        border: "1px solid #e2e8f0",
        textAlign: "center"
      }}>
        {/* Logo & Header */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <img src="/logo1.png" alt="Tennisella Logo" style={{ height: "36px" }} />
          <span style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#1f2937" }}>Tennisella</span>
        </div>

        <h2 style={{ fontSize: "1.6rem", color: "#0d9488", margin: "0 0 6px 0", fontWeight: "700" }}>Create Account</h2>
        <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "24px" }}>
          Join Tennisella smart performance ecosystem
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Role Selector */}
          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>
              Select Account Type
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>

              <div
                onClick={() => setRole("player")}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: role === "player" ? "2px solid #0d9488" : "1px solid #cbd5e1",
                  backgroundColor: role === "player" ? "#f0fdf4" : "#ffffff",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s"
                }}
              >
                <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>🎾</div>
                <div style={{ fontWeight: "bold", fontSize: "0.95rem", color: role === "player" ? "#0d9488" : "#475569" }}>Player</div>
              </div>

              <div
                onClick={() => setRole("coach")}
                style={{
                  padding: "14px",
                  borderRadius: "12px",
                  border: role === "coach" ? "2px solid #0d9488" : "1px solid #cbd5e1",
                  backgroundColor: role === "coach" ? "#f0fdf4" : "#ffffff",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s"
                }}
              >
                <div style={{ fontSize: "1.2rem", marginBottom: "4px" }}>📋</div>
                <div style={{ fontWeight: "bold", fontSize: "0.95rem", color: role === "coach" ? "#0d9488" : "#475569" }}>Coach</div>
              </div>

            </div>
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>
              Username
            </label>
            <input
              type="text"
              required
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #cbd5e1",
                fontSize: "0.95rem",
                outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "14px",
              backgroundColor: "#0d9488",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(13, 148, 136, 0.2)"
            }}
          >
            Create Account as {role === "player" ? "Player" : "Coach"}
          </button>
        </form>

        {/* Footer Navigation */}
        <p style={{ marginTop: "20px", color: "#64748b", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#0d9488", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }}
          >
            Log in
          </span>
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            color: "#94a3b8",
            fontSize: "0.85rem",
            marginTop: "8px",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
