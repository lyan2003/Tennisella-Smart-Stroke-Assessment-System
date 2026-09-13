import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. قراءة الحساب المحفوظ في متصفح الجهاز
    const savedUser = JSON.parse(localStorage.getItem("tennisella_user"));

    // 2. التحقق من وجود الحساب ومطابقة اسم المستخدم وكلمة السر
    if (
      savedUser &&
      savedUser.username.trim().toLowerCase() === formData.username.trim().toLowerCase() &&
      savedUser.password === formData.password
    ) {
      alert(`Welcome back, ${savedUser.fullName || savedUser.username}! 👋`);

      // التوجيه التلقائي حسب نوع الحساب المحفوظ (Player أو Coach)
      navigate(savedUser.role === "player" ? "/player" : "/coach");
    } else {
      alert("⚠️ Invalid username or password! Please sign up first if you don't have an account.");
    }
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
        maxWidth: "420px",
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

        <h2 style={{ fontSize: "1.6rem", color: "#0d9488", margin: "0 0 6px 0", fontWeight: "700" }}>Welcome Back</h2>
        <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "28px" }}>
          Log in to access your stroke analytics & training
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", marginBottom: "6px", fontSize: "0.85rem", fontWeight: "600", color: "#334155" }}>
              Username
            </label>
            <input
              type="text"
              required
              placeholder="Enter your username"
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
              marginTop: "8px",
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
            Log In
          </button>
        </form>

        {/* Footer Navigation */}
        <p style={{ marginTop: "24px", color: "#64748b", fontSize: "0.9rem" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#0d9488", fontWeight: "bold", cursor: "pointer", textDecoration: "underline" }}
          >
            Sign up
          </span>
        </p>

        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            color: "#94a3b8",
            fontSize: "0.85rem",
            marginTop: "12px",
            cursor: "pointer"
          }}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
