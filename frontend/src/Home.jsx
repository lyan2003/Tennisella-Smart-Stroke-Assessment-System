import { useNavigate } from "react-router-dom";
import "./App.css";

export default function Home() {
  const navigate = useNavigate();

  // بيانات أعضاء الفريق الـ 5 بمسارات public المباشرة وروابط LinkedIn
  const teamMembers = [
    {
      name: "Lyan Ahmed Mohsen",
      role: "Biomedical Engineering Student",
      university: "Cairo University",
      image: "/team/lyan.jpeg",
      linkedin: "https://www.linkedin.com/in/lyan-ahmed-62016b259"
    },
    {
      name: "Olivia Morkos Saleh",
      role: "Biomedical Engineering Student",
      university: "Cairo University",
      image: "/team/olivia.jpeg",
      linkedin: "https://www.linkedin.com/in/olivia-morkos-b97229287"
    },
    {
      name: "Basma Mohamed Abd Elaty",
      role: "Biomedical Engineering Student",
      university: "Cairo University",
      image: "/team/basma.jpeg",
      linkedin: "https://www.linkedin.com/in/basma-mohamad-982408291"
    },
    {
      name: "Rehab Marzouk Salama",
      role: "Biomedical Engineering Student",
      university: "Cairo University",
      image: "/team/rehab.jpeg",
      linkedin: "https://www.linkedin.com/in/rehab-marzouk"
    },
    {
      name: "Suhila Tharwat Elmasry",
      role: "Biomedical Engineering Student",
      university: "Cairo University",
      image: "/team/suhila.jpg",
      linkedin: "https://www.linkedin.com/in/suhila-elmasry-7b7283305"
    },
  ];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <img src="/logo1.png" alt="Tennisella Logo" />
          <span>Tennisella</span>
        </div>

        <nav>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/player")}>Player</button>
          <button onClick={() => navigate("/coach")}>Coach</button>
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

      {/* ================= MEET OUR TEAM SECTION (ALL 5 SIDE-BY-SIDE) ================= */}
      <section className="team-section" style={{ padding: "70px 20px", backgroundColor: "#ffffff", textAlign: "center" }}>
        <div style={{ maxWidth: "1350px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.4rem", color: "#0d9488", marginBottom: "8px", fontWeight: "700" }}>
            Meet The Team Behind Tennisella
          </h2>
          <p style={{ color: "#4b5563", fontSize: "1.1rem", marginBottom: "48px" }}>
            Biomedical Engineering Senior Students - Cairo University
          </p>

          {/* 🌟 Team Row: 5 Members Side by Side */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "16px",
            justifyContent: "center",
            overflowX: "auto",
            paddingBottom: "10px"
          }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                padding: "24px 12px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 8px 16px -4px rgba(0, 0, 0, 0.06)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}>
                {/* صورة الفرد */}
                <img
                  src={member.image}
                  alt={member.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=ccfbf1&color=0d9488&size=120`;
                  }}
                  style={{
                    width: "105px",
                    height: "105px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginBottom: "16px",
                    border: "3px solid #0d9488",
                    boxShadow: "0 4px 10px rgba(13, 148, 136, 0.2)"
                  }}
                />

                <h3 style={{ margin: "0 0 6px 0", color: "#1f2937", fontSize: "1.02rem", fontWeight: "700", lineHeight: "1.3" }}>
                  {member.name}
                </h3>
                <p style={{ margin: "0 0 4px 0", color: "#0d9488", fontSize: "0.82rem", fontWeight: "600" }}>
                  {member.role}
                </p>
                <p style={{ margin: "0 0 16px 0", color: "#6b7280", fontSize: "0.78rem" }}>
                  {member.university}
                </p>

                {/* زر LinkedIn */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: "auto",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    backgroundColor: "#0a66c2",
                    color: "#ffffff",
                    borderRadius: "18px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    textDecoration: "none",
                    boxShadow: "0 3px 6px rgba(10, 102, 194, 0.2)"
                  }}
                >
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT US SECTION ================= */}
      <section className="contact-section" style={{ padding: "60px 20px", backgroundColor: "#f8fafc" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "2.2rem", color: "#1f2937", marginBottom: "8px", fontWeight: "700" }}>
              Get In Touch
            </h2>
            <p style={{ color: "#64748b", fontSize: "1.05rem" }}>
              Ready to elevate your game or have questions? Send us a message or reach out directly!
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px", alignItems: "start" }}>

            {/* Contact Form */}
            <form style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }} onSubmit={(e) => e.preventDefault()}>
              <h3 style={{ margin: "0 0 20px 0", color: "#0d9488", fontSize: "1.3rem" }}>Send a Message</h3>

              <div style={{ marginBottom: "16px", textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", color: "#334155", fontWeight: "600" }}>Your Name</label>
                <input type="text" placeholder="John Doe" style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.95rem" }} />
              </div>

              <div style={{ marginBottom: "16px", textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", color: "#334155", fontWeight: "600" }}>Email Address</label>
                <input type="email" placeholder="name@example.com" style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.95rem" }} />
              </div>

              <div style={{ marginBottom: "20px", textAlign: "left" }}>
                <label style={{ display: "block", marginBottom: "6px", fontSize: "0.9rem", color: "#334155", fontWeight: "600" }}>Message</label>
                <textarea rows="4" placeholder="How can we help you?" style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.95rem", resize: "vertical" }}></textarea>
              </div>

              <button type="submit" style={{ width: "100%", padding: "12px", backgroundColor: "#0d9488", color: "#ffffff", border: "none", borderRadius: "8px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer" }}>
                Send Message
              </button>
            </form>

            {/* Direct Action & Info Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                <h3 style={{ margin: "0 0 16px 0", color: "#1f2937", fontSize: "1.2rem" }}>Direct Contact</h3>
                <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "20px" }}>
                  Need quick answers? Reach out via WhatsApp or direct phone line.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {/* WhatsApp Button */}
                  <a
                    href="https://wa.me/201012345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "12px 20px",
                      backgroundColor: "#25D366",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px"
                    }}
                  >
                    Connect via WhatsApp
                  </a>

                  {/* Phone Button */}
                  <a
                    href="tel:+201095770492"
                    style={{
                      padding: "12px 20px",
                      backgroundColor: "#0d9488",
                      color: "white",
                      textDecoration: "none",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px"
                    }}
                  >
                    Contact Us via Phone
                  </a>
                </div>
              </div>

              {/* Location Info Card */}
              <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", textAlign: "left" }}>
                <h4 style={{ margin: "0 0 8px 0", color: "#1f2937", fontSize: "1.05rem" }}>Location & Department</h4>
                <p style={{ margin: 0, color: "#64748b", fontSize: "0.9rem", lineHeight: "1.5" }}>
                  Biomedical Engineering Department<br />
                  Faculty of Engineering, Cairo University<br />
                  Giza, Egypt
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MODERN FOOTER ================= */}
      <footer style={{ backgroundColor: "#0f172a", color: "#94a3b8", padding: "50px 20px 20px 20px", textAlign: "left" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "40px", marginBottom: "40px" }}>

          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <img src="/logo1.png" alt="Tennisella Logo" style={{ height: "32px" }} />
              <span style={{ color: "#ffffff", fontSize: "1.4rem", fontWeight: "bold" }}>Tennisella</span>
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6", color: "#94a3b8" }}>
              Smart Tennis Stroke Assessment & Injury Prevention System. Living Strong Through Sport.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "16px" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              <li><button onClick={() => window.scrollTo(0, 0)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Home</button></li>
              <li><button onClick={() => navigate("/player")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Player</button></li>
              <li><button onClick={() => navigate("/coach")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Coach</button></li>
              <li><button onClick={() => navigate("/login")} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: 0 }}>Login</button></li>
            </ul>
          </div>

          {/* Department Info */}
          <div>
            <h4 style={{ color: "#ffffff", fontSize: "1.1rem", marginBottom: "16px" }}>Affiliation</h4>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              Cairo University<br />
              Faculty of Engineering<br />
              Biomedical Engineering Senior Project
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid #1e293b", paddingTop: "20px", textAlign: "center", fontSize: "0.85rem", color: "#64748b" }}>
          © 2026 Tennisella. All Rights Reserved.
        </div>
      </footer>

    </div>
  );
}
