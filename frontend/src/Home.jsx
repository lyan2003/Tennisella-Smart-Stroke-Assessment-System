import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src="/logo1.png" alt="Tennisella Logo" />
          <span>Tennisella</span>
        </div>

        <nav>
          <button>Home</button>
          <button>Player</button>
          <button>Coach</button>
        </nav>

        <button className="login" onClick={() => navigate("/login")}>
          Login
        </button>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h1>Living Strong Through Sport</h1>
        </div>
      </section>

      {/* Intro */}
      <section className="intro">
        <h2>Master Your Game, Elevate Your Play</h2>
        <p>
          Train smarter, play stronger, and refine your skills in a pro-level environment for all players.
        </p>
      </section>

      {/* Content */}
      <section className="content">
        <img src="/training5.jpeg" alt="Tennis training" />
        <div className="content-text">
          <h3>Elevate Your Tennis Journey</h3>
          <p>
            Step onto the court where passion meets precision and every swing defines your progress. Whether you’re learning your first serve or competing at an elite level, our club provides the ultimate environment to refine your skills. With expert coaching, cutting-edge training programs, and a strong tennis community, we ensure that every player reaches their full potential.
          </p>
          <p>
            From intensive training sessions to thrilling tournaments, we create opportunities for players to push their limits and embrace the spirit of the game. Our facilities are designed to enhance your performance, and our community thrives on dedication and sportsmanship. Join us and take your place in a legacy built on excellence, determination, and love for tennis.
          </p>
        </div>
      </section>

      {/* الفوتر وقسم التواصل الجديد اللي ضفناه */}
      <footer className="footer" style={{ padding: "40px 20px", backgroundColor: "#f8f9fa", textAlign: "center", marginTop: "40px" }}>
        <h2>Contact Us - تواصل معنا</h2>
        <p style={{ marginBottom: "20px", color: "#666" }}>
          Ready to elevate your game? Get in touch with us today!
        </p>

        <div className="contact-buttons" style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          {/* زرار الواتساب */}
          <a
            href="https://wa.me/201012345678"
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: "12px 24px", backgroundColor: "#25D366", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}
          >
            Connect via WhatsApp
          </a>

          {/* زرار الاتصال الهاتفي */}
          <a
            href="tel:+201095770492"
            style={{ padding: "12px 24px", backgroundColor: "#007bff", color: "white", textDecoration: "none", borderRadius: "8px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "8px" }}
          >
            Contact Us via Phone
          </a>
        </div>
      </footer>

    </div>
  );
}