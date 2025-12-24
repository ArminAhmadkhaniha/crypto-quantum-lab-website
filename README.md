# ⚛️ Crypto-Quantum Lab Platform

![Status](https://img.shields.io/badge/Status-Active_Development-blue?style=for-the-badge&logo=github)
![Tech](https://img.shields.io/badge/Stack-Go_|_React_|_Hugo-00ADD8?style=for-the-badge&logo=go)
![Focus](https://img.shields.io/badge/Focus-Post_Quantum_Cryptography-7c3aed?style=for-the-badge&logo=molecule)

> **A comprehensive platform for Quantum Research dissemination and algorithmic testing.**

This repository hosts the complete ecosystem for the **Crypto-Quantum Lab**. It features a high-performance static hub for research publication, coupled with an interactive submission portal powered by a distributed Go backend.

---

## 🏗️ System Architecture

The project is organized as a monorepo containing three distinct components:

| Component | Technology | Description |
| :--- | :--- | :--- |
| **`/website`** | **Hugo** | The public-facing research hub. Features parallax design, 3D CSS animations, and publication filtering. |
| **`/submission-portal`** | **React.js** | Interactive dashboard for students to submit code artifacts and view analysis results. |
| **`/backend-api`** | **Go (Golang)** | High-concurrency REST/gRPC API handling submissions, queueing jobs, and data persistence. |

---

## 🚀 Key Features

### 1. Research Hub (Website)
* **Parallax & Glassmorphism:** Custom CSS engine creating an immersive "Lab" environment.
* **Dynamic Filtering:** JavaScript-based sorting for research papers (Isogeny, LWE, Quantum Money).
* **Performance:** Pre-rendered static HTML for <50ms load times.

### 2. Submission Portal (Frontend)
* **Real-time Feedback:** React hooks handling WebSocket connections for live status updates on code submissions.
* **Modern UI:** Tailwind CSS styling

### 3. Core Engine (Backend)
* **Concurrency:** Built on Go
* **Efficiency:** Minimal footprint API designed for low-latency communication with the frontend.

---

## 🛠️ Installation & Setup

To run the full stack locally, follow these steps for each service.

### 1. Launch the Website
```bash
cd LabSite
hugo server -D
# Runs at http://localhost:1313
```

### 2. Launch the backend-api
```bash
cd backend-api
go mod tidy
go run main.go
# Runs at http://localhost:8080 (default)
```

### 3. Launch the Submission Portal
```bash
cd submission-portal
npm install
npm run dev
# Runs at http://localhost:5173
```





