# Tennisella: IoT-Enabled Smart Tennis Stroke Assessment and Injury Prevention System

An advanced assistive technology framework engineered to evaluate tennis stroke mechanics, optimize player performance, and mitigate the risk of overuse injuries such as lateral epicondylitis (Tennis Elbow). The system integrates wearable hardware architecture (Arduino Nano 33 IoT, Inertial Measurement Units, and Force Sensitive Resistors) with a centralized Node.js processing gateway and an asynchronous React dashboard to provide real-time haptic feedback and downstream analytical metrics.

---

### Project Recognition and Development Lifecycle

> **Global Award Achievement:** Formally recognized as the **3rd Place Worldwide Winner** at the prestigious **IEEE CASS Student Design Competition 2026**.
> 
> **Timeline Framework:** Complete research, hardware-software co-design, and end-to-end implementation were systematically executed within the operational window from **October 14, 2025**, to **December 1, 2025**.

---

## Architecture and Data Flow Overview

The platform utilizes a multi-tiered pipeline that ingests continuous physical streams, runs deterministic rule-based algorithms, and broadcasts telemetry to client interfaces.

```text
+-------------------+       +--------------------+       +-------------------+
|  HARDWARE LAYER   |       |   GATEWAY LAYER    |       | APPLICATION LAYER |
| Arduino Nano 33   | ----> | Node.js Server     | ----> | React Frontend    |
| IMU & FSR Sensors |       | (Data Aggregation) |       | (Vite & Tailwind) |
+-------------------+       +--------------------+       +-------------------+
         ^                                                         |
         |__________________ Haptic Vibration Feedback ____________|

```

---

## Core System Capabilities

### 1. Embedded Sensor Fusion and Acquisition

* **Dynamic Motion Tracking:** Leverages a 6-axis Inertial Measurement Unit (IMU) integrating an accelerometer and a gyroscope to capture instantaneous linear acceleration vectors and rotational angular velocities during execution.
* **Biomechanical Grip Monitoring:** Utilizes a localized Force Sensitive Resistor (FSR) positioned at the racket handle to evaluate grip force variance, ensuring stress thresholds on tendon structures are quantified.
* **Immediate Haptic Intervention:** Triggers a synchronized core vibration assembly directly on the racket chassis when mechanical error limits are breached, offering immediate physical adjustment cues.

### 2. Backend Stream Processing (backend/)

* **Deterministic Event Extraction:** Implements real-time parsing thresholds on incoming telemetry to differentiate active stroke periods from baseline background racquet motion.
* **Binary Stroke Classification:** Executes axis-specific gyroscopic tracking routines where vector sign configuration determines whether a gesture corresponds to a Forehand or a Backhand stroke execution.
* **Asynchronous Web Interfaces:** Facilitates data aggregation and state broadcasting to consumer nodes via scalable architectural design models.

### 3. Analytics Dashboard Studio (frontend/)

* **Vite-Optimized Interface Infrastructure:** Built on a decoupled React engine styled via Tailwind CSS, providing low-latency render loops during continuous state updates.
* **Cloud-Ready Configuration:** Pre-configured with structural routing architecture for automated deployment to the Vercel infrastructure engine.

---

## Analytical and Rule-Based Formulations

The embedded processing stack runs a sequence of mathematical constraints to classify events and evaluate execution profiles.

### 1. Dynamic Grip Calibration

Upon initialization, the processing framework accumulates $100$ continuous discrete samples to construct an empirical resting reference state:


$$F_{\text{baseline}} = \frac{1}{100} \sum_{i=1}^{100} F_i$$

### 2. Stroke Event Detection Constraints

A localized stroke sequence is isolated programmatically if the absolute derivative of the acceleration or angular velocity vectors violates configured boundary parameters:


$$\Delta a > T_a \quad \lor \quad \Delta \omega > T_\omega$$

### 3. Quantitative Grip Quality Index

Grip efficiency is mapped as a proportional scaling factor against the baseline state during peak stroke intervals:


$$R_g = \frac{F_{\text{peak}}}{F_{\text{baseline}}}$$

Where operational status is classified according to the following safety constraints:

* **Optimal Safety Range:** $1.2 \le R_g \le 1.6$
* **Over-Grip Injury Warning:** $R_g > 1.6$

### 4. Swing Velocity Uniformity Score

Velocity parameters are validated by checking current values against maximum historical velocity bounds:


$$R_s = \frac{v_{\text{swing}}}{v_{\text{max}}}$$

Mechanical balance and delivery execution accuracy are verified when $0.6 \le R_s \le 0.7$.

---

## Repository Tree Structure

```text
Tennisella-Smart-Stroke-Assessment-System/
├── backend/                       # Centralized processing service layer
│   ├── node_modules/              # Automated server environment containers
│   ├── package.json               # Backend dependency manifest
│   ├── package-lock.json          # Strict package locking mapping
│   └── server.js                  # Main Express processing script
└── frontend/                      # Client graphical interface application
    ├── .idea/                     # local editor configuration properties
    ├── node_modules/              # Local web interface environments
    ├── public/                    # Static asset storage repository
    ├── src/                       # Application components and views
    ├── .gitignore                 # Specific frontend file tracking overrides
    ├── eslint.config.js           # Static architectural linting metrics
    ├── index.html                 # Primary structural web landing viewport
    ├── package.json               # Interface dependency matrix specification
    ├── package-lock.json          # Node resolution tracking architecture
    ├── postcss.config.js          # Industrial CSS compiler variables
    ├── README.md                  # Component documentation layout
    ├── tailwind.config.js         # Modular user interface styling setup
    ├── vercel.json                # Direct production cloud hosting flags
    └── vite.config.js             # High-speed compilation asset manager

```

---

## Installation and Deployment Manual

### 1. Environment Setup & Dependency Isolation

Initialize system packages by avoiding local module conflicts.

#### Backend Infrastructure Bootstrapping:

```bash
cd backend
npm install

```

#### Frontend Client Bootstrapping:

```bash
cd ../frontend
npm install

```

### 2. Local Execution Processes

Run execution layers concurrently to test internal system loops.

#### Run Processing Server:

```bash
cd backend
node server.js

```

#### Run Web Interface Client:

```bash
cd frontend
npm run dev

```

---

## System Boundaries and Future Work

* **IMU Sensor Drift Mitigation:** Current iterations encounter minor gyroscopic drift parameters, requiring baseline threshold filtering algorithms to reduce cumulative integration errors.
* **Positional Dependency Constraints:** Execution accuracy depends on uniform physical alignment on the racquet grip, which is addressed through startup initialization protocols.
* **Future Machine Learning Integration:** Future updates aim to replace deterministic rule-based classifications with tinyML pipelines for comprehensive swing trajectory recognition.
