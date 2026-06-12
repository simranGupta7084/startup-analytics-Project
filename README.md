# 📊 Startup Profit & Survival Analysis System

> A full-stack analytics dashboard that turns raw startup metrics into visual insights and survival risk predictions.

![Stack](https://img.shields.io/badge/Stack-MERN-blue) ![Status](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-lightgrey)

---

## 🚀 What It Does

Input a startup's financials → get back charts, profitability analysis, and a risk prediction (Low / Medium / High) — all in a dark-themed SaaS dashboard.

**Core capabilities:**
- Store startup data (funding, revenue, burn rate, team size)
- Visualize performance with live charts
- Predict survival risk using rule-based financial scoring
- Explore analytics across industries and growth stages

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React (Vite) + Tailwind CSS + Recharts |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| HTTP | Axios |

---

## 📁 Project Structure

```
├── frontend/
│   ├── src/
│   │   ├── components/     # Sidebar, Cards, Charts, Loader
│   │   ├── pages/          # Dashboard, Upload, Insights, Predictions
│   │   ├── services/       # Axios API calls
│   │   └── utils/          # Formatters
│
├── backend/
│   ├── config/             # MongoDB connection
│   ├── models/             # Startup schema
│   ├── controllers/        # Business logic
│   ├── routes/             # API endpoints
│   └── utils/              # Prediction engine
```

---

## ⚙️ Quick Start

```bash
# Clone
git clone <repo-url>

# Backend
cd backend && npm install
cp .env.example .env
node server.js          # runs on :5000

# Frontend (new terminal)
cd frontend && npm install
npm run dev             # runs on :5173
```

`.env` defaults:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/startup_analytics
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/startups` | Fetch all startup records |
| `POST` | `/api/startup` | Save new startup data |
| `POST` | `/api/predict` | Get survival risk prediction |

---

## 🧠 Prediction Logic

```
profit = revenue - burnRate

profit > 0 AND funding > 50,000  →  LOW risk   ✅
profit ≈ 0                        →  MEDIUM risk ⚠️
profit < 0                        →  HIGH risk   ❌
```

**Sample response:**
```json
{
  "risk": "LOW",
  "score": 82,
  "message": "Healthy profile — revenue exceeds burn and funding support is strong."
}
```

---

## 📈 Dashboard Features

- **KPI Cards** — Revenue, Active Users, Survival Rate, Top Industry
- **Line Chart** — Revenue growth over time
- **Pie Chart** — Startup stage distribution
- **Bar Chart** — Funding by industry
- **Predictions Panel** — Real-time risk scoring with input form

---

## ☁️ Deployment

| Service | Purpose |
|---------|---------|
| Vercel | Frontend hosting |
| Render | Backend API |
| MongoDB Atlas | Cloud database |

> Before deploying: update the frontend API base URL to your live Render backend URL.

---

## 🔮 Roadmap

- [ ] Replace rule-based logic with a trained ML model
- [ ] Add authentication (JWT)
- [ ] CSV import for bulk startup data
- [ ] Startup comparison view + industry benchmarking
- [ ] PDF report export

---
**Skills demonstrated:** REST API design · MongoDB schema design · React component architecture · Chart-based analytics UI · Modular backend structure · Responsive dashboard design
