# Startup Profit & Survival Analysis System

A full-stack analytics dashboard for studying startup health, profitability, and survival risk using a modern web stack.

---

## 1. Project Overview

The **Startup Profit & Survival Analysis System** is a full-stack web application that helps users:

- store startup business data
- visualize financial performance
- analyze profitability
- estimate startup survival risk
- explore insights through charts and dashboards

In simple terms, this project allows a user to enter startup details such as funding, revenue, burn rate, team size, and years active, and then see:

- how the startup is performing
- whether the company looks profitable
- whether the company is likely to be low, medium, or high risk

This project is both:

- a **full-stack application** because it includes frontend, backend, and database
- a **data science style analytics dashboard** because it transforms business data into charts, insights, and prediction results

It is a strong project for:

- GitHub portfolio
- resume projects section
- learning MERN-style architecture
- understanding dashboard-based analytics systems

---

## 2. Tech Stack

### Frontend

- **React (Vite)**
- **Tailwind CSS**
- **Axios**
- **Recharts**

### Backend

- **Node.js**
- **Express**

### Database

- **MongoDB**
- **Mongoose**

### Why these technologies were used

#### React (Vite)

- React is used to build interactive user interfaces using reusable components.
- It makes the UI easier to organize into cards, pages, sidebars, and charts.
- Vite is used because it is fast, simple, and excellent for modern React development.
- It improves development speed with quick startup and hot reload.

#### Tailwind CSS

- Tailwind CSS is used for fast and consistent styling.
- It helps create a modern dark-themed SaaS dashboard without writing separate custom CSS files.
- It keeps styling close to the component, which is easier for beginners to follow.

#### Axios

- Axios is used to send HTTP requests from the frontend to the backend.
- It makes API calls simpler and cleaner than using low-level networking code.
- It helps the frontend fetch startup data and send prediction requests.

#### Recharts

- Recharts is used for data visualization.
- It makes it easy to create professional charts like line charts, pie charts, and bar charts.
- It fits very well with React because charts are built as React components.

#### Node.js

- Node.js allows JavaScript to run on the server side.
- This means the project can use JavaScript for both frontend and backend, which is beginner-friendly.

#### Express

- Express is used to build the backend API.
- It provides a clean way to create routes like:
  - `GET /api/startups`
  - `POST /api/startup`
  - `POST /api/predict`
- It is lightweight, widely used, and perfect for REST APIs.

#### MongoDB

- MongoDB is used to store startup records in a flexible JSON-like format.
- Startup data fits well in MongoDB because each record contains related business metrics in one document.

#### Mongoose

- Mongoose is used to define schemas and interact with MongoDB more safely.
- It helps enforce data structure, validation, and clean database operations.

---

## 3. Folder Structure

```text
Startup Profit & Survival Analysis System/
│
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/
│       │   ├── Sidebar.jsx
│       │   ├── Card.jsx
│       │   ├── Charts.jsx
│       │   └── Loader.jsx
│       ├── pages/
│       │   ├── DashboardPage.jsx
│       │   ├── UploadDataPage.jsx
│       │   ├── InsightsPage.jsx
│       │   └── PredictionsPage.jsx
│       ├── services/
│       │   └── api.js
│       └── utils/
│           └── formatters.js
│
├── backend/
│   ├── package.json
│   ├── .env.example
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Startup.js
│   ├── controllers/
│   │   ├── startupController.js
│   │   └── predictionController.js
│   ├── routes/
│   │   ├── startupRoutes.js
│   │   └── predictionRoutes.js
│   └── utils/
│       └── prediction.js
│
├── .gitignore
└── README.md
```

### Folder-by-folder explanation

#### `frontend/`

- This folder contains the complete client-side application.
- It is responsible for everything the user sees and interacts with.
- It exists so the UI can be developed independently from the backend.

#### `backend/`

- This folder contains the server-side application.
- It handles API requests, prediction logic, and database communication.
- It exists to separate business logic and data management from the UI.

#### `frontend/src/`

- This is the main source folder for the React app.
- It contains components, pages, services, utilities, and app startup files.
- It is used to keep code organized and maintainable.

#### `frontend/src/components/`

- This folder contains reusable UI parts.
- Examples:
  - sidebar
  - statistic cards
  - charts
  - loading spinner
- It is used so the same UI logic can be reused in different places instead of rewriting code.

#### `frontend/src/pages/`

- This folder contains full screen-level views.
- Examples:
  - Dashboard
  - Upload Data
  - Insights
  - Predictions
- It is used to separate large screens from small reusable components.

#### `frontend/src/services/`

- This folder contains API communication logic.
- `api.js` handles Axios calls to the backend.
- It is used so HTTP logic stays separate from UI code.

#### `frontend/src/utils/`

- This folder contains helper functions.
- `formatters.js` formats values such as currency.
- It is used to keep common utility logic reusable and clean.

#### `backend/config/`

- This folder contains configuration files.
- `db.js` is used to connect the application to MongoDB.
- It is used so environment setup stays separate from route and business logic.

#### `backend/models/`

- This folder contains database schemas.
- `Startup.js` defines how startup data is stored in MongoDB.
- It is used to control the structure of the saved data.

#### `backend/controllers/`

- This folder contains business logic for each API route.
- Controllers receive requests, process data, and return responses.
- It is used to keep route definitions clean and focused.

#### `backend/routes/`

- This folder contains API endpoint definitions.
- It maps URLs to controller functions.
- It is used so endpoint structure is easy to read and expand.

#### `backend/utils/`

- This folder contains helper logic used by the backend.
- `prediction.js` holds the startup risk calculation logic.
- It is used so prediction rules stay reusable and separate from route code.

---

## 4. Frontend Explanation

The frontend is built with **React + Vite + Tailwind CSS**.

### Why React is used

- React helps break the UI into reusable components.
- It makes the application easier to grow as more pages and features are added.
- It handles dynamic updates very well, such as loading data from the API and showing prediction results instantly.

### Important frontend files

#### `frontend/src/App.jsx`

- This is the main UI controller for the frontend.
- It manages page switching between Dashboard, Upload Data, Insights, and Predictions.
- It also handles:
  - startup data fetching
  - prediction request handling
  - loading states
  - error messages
- This file is important because it acts like the central brain of the frontend.

#### `frontend/src/main.jsx`

- This is the frontend starting point.
- It loads the React app into the browser by rendering `App.jsx`.
- It is required because React needs one entry file to mount the application.

#### `frontend/src/index.css`

- This file includes Tailwind CSS directives.
- It also contains base styling rules for the whole app.
- It is used so the dark theme and global styles are applied consistently.

#### `frontend/src/components/Sidebar.jsx`

- This file creates the left navigation sidebar.
- It contains the app logo and navigation menu.
- It is separated into its own file because the sidebar is a reusable layout piece.

#### `frontend/src/components/Card.jsx`

- This file creates reusable dashboard metric cards.
- It is used for revenue, active users, survival rate, and top industry.
- It exists so cards share the same design and behavior.

#### `frontend/src/components/Charts.jsx`

- This file contains the Recharts chart components.
- It renders:
  - revenue growth line chart
  - startup stage pie chart
  - funding by industry bar chart
- It is separated so chart logic stays organized and reusable.

#### `frontend/src/components/Loader.jsx`

- This file creates a loading spinner component.
- It is used during API calls to improve user experience.
- It exists so loading feedback stays consistent across pages.

#### `frontend/src/pages/DashboardPage.jsx`

- This file defines the main dashboard screen.
- It displays cards, charts, loading state, and summary metrics.
- It is used because page-level layout should stay separate from small UI components.

#### `frontend/src/pages/UploadDataPage.jsx`

- This file contains the startup data submission form.
- It sends data to the backend and also lists saved startup records.
- It is used to separate data-entry functionality from the dashboard view.

#### `frontend/src/pages/InsightsPage.jsx`

- This file displays insight-oriented analytics.
- It shows survival rate, risk level, profitability score, and recommendations.
- It exists to present interpretation, not just raw data.

#### `frontend/src/pages/PredictionsPage.jsx`

- This file contains the risk prediction form.
- It sends input data to the backend and shows the prediction response on the right panel.
- It is used so prediction workflow has its own dedicated screen.

#### `frontend/src/services/api.js`

- This file stores Axios API request functions.
- It handles communication with backend endpoints.
- It is used because separating networking logic keeps components cleaner.

#### `frontend/src/utils/formatters.js`

- This file contains helper functions like currency formatting.
- It exists to avoid repeating formatting logic across the UI.

---

## 5. Backend Explanation

The backend is built with **Node.js + Express + MongoDB + Mongoose**.

### Why Express is used

- Express is simple and great for building REST APIs.
- It helps organize backend routes clearly.
- It supports middleware, JSON parsing, validation, and clean request/response handling.
- It is beginner-friendly and widely used in professional applications.

### Important backend files

#### `backend/server.js`

- This is the main server file.
- It starts the Express app.
- It connects middleware, routes, and database initialization.
- It is important because every backend request starts here.

#### `backend/config/db.js`

- This file connects the backend to MongoDB.
- It keeps database connection logic outside `server.js`.
- It is used so configuration stays modular and easier to manage.

#### `backend/models/Startup.js`

- This file defines the MongoDB schema for startup data.
- It includes:
  - name
  - industry
  - funding
  - revenue
  - burnRate
  - teamSize
  - yearsActive
  - profit
- It is used so all stored data follows a clear and valid structure.

#### `backend/routes/startupRoutes.js`

- This file defines startup data routes.
- It includes:
  - `GET /api/startups`
  - `POST /api/startup`
- It is used to map URLs to controller actions.

#### `backend/routes/predictionRoutes.js`

- This file defines the prediction route:
  - `POST /api/predict`
- It is used to keep prediction endpoints separated from data storage endpoints.

#### `backend/controllers/startupController.js`

- This file contains the logic for saving and fetching startup records.
- It validates request data, calculates profit, and interacts with MongoDB.
- It is used so route files stay simple and readable.

#### `backend/controllers/predictionController.js`

- This file handles the startup prediction process.
- It validates input and returns the risk result.
- It is used to separate prediction logic handling from route definitions.

#### `backend/utils/prediction.js`

- This file contains the prediction rules.
- It calculates profit and assigns risk level, score, and message.
- It is used because business rules should be reusable and separate from controller code.

### About middleware

This project currently uses Express middleware directly inside `server.js`, such as:

- `cors()` for cross-origin requests
- `express.json()` for reading JSON request bodies

Why middleware is used:

- Middleware processes requests before they reach the route logic.
- It helps handle parsing, security, logging, validation, and common behaviors.
- In larger projects, middleware often gets its own `middleware/` folder.

Even if this project does not yet have a separate `middleware/` folder, the middleware concept is still an important part of the backend architecture.

---

## 6. Data Flow

This is the most important system flow in the project:

**User → Frontend → API → Backend → Database → Response → UI**

### Step-by-step explanation

1. **User enters data**
   - The user fills in a form on the frontend.
   - Example: startup name, funding, revenue, burn rate.

2. **Frontend collects the data**
   - React stores the form values.
   - When the user clicks submit, Axios sends the data to the backend.

3. **API request is sent**
   - Axios sends a request such as:
   ```http
   POST /api/startup
   ```
   or
   ```http
   POST /api/predict
   ```

4. **Backend receives the request**
   - Express route matches the endpoint.
   - The request is passed to the correct controller.

5. **Controller processes the data**
   - The controller validates the input.
   - For saved startup records, it calculates profit.
   - For predictions, it calculates risk level, score, and message.

6. **Database stores data**
   - If the request is for saving startup data, Mongoose stores the record in MongoDB.

7. **Backend sends response**
   - The backend returns JSON data to the frontend.

8. **Frontend updates the UI**
   - React receives the response.
   - The dashboard refreshes.
   - Prediction results appear instantly in the UI.

This flow is a core full-stack concept and is one of the most valuable things to learn from this project.

---

## 7. Prediction Logic

This project uses a simple rule-based prediction system for startup survival risk.

### Step 1: Profit Calculation

Profit is calculated as:

```text
profit = revenue - burnRate
```

### Step 2: Risk Classification

The risk level is determined using simple business rules:

- If `profit > 0` and `funding > 50000`
  - Risk = `LOW`
- If profit is close to zero
  - Risk = `MEDIUM`
- If `profit < 0`
  - Risk = `HIGH`

### Example output

```json
{
  "risk": "LOW",
  "score": 82,
  "message": "Healthy profile - revenue exceeds burn and funding support is strong."
}
```

### Why this logic is useful

- It is easy for beginners to understand.
- It simulates how startup health can be estimated using financial signals.
- It creates a strong base for future machine learning upgrades.

---

## 8. Installation Steps

### Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed
- MongoDB installed locally or a MongoDB Atlas connection string

### 1. Clone the project

```bash
git clone <your-repository-url>
cd "Startup Profit & Survival Analysis System"
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Create backend environment file

```bash
copy .env.example .env
```

Update `.env` if needed:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/startup_analytics
```

### 4. Start backend server

```bash
node server.js
```

Or in development mode:

```bash
npm run dev
```

### 5. Install frontend dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 6. Start frontend app

```bash
npm run dev
```

### 7. Open in browser

The frontend usually runs at:

```text
http://localhost:5173
```

The backend usually runs at:

```text
http://localhost:5000
```

---

## 9. Deployment

This project can be deployed using a modern production stack:

### Frontend deployment: Vercel

- Vercel is ideal for React + Vite apps.
- It is simple, fast, and built for frontend hosting.
- You can connect your GitHub repo and deploy automatically.

### Backend deployment: Render

- Render is a good choice for Express APIs.
- It supports Node.js services and environment variables.
- It is easy for beginners to deploy backend servers there.

### Database deployment: MongoDB Atlas

- MongoDB Atlas is the cloud-hosted version of MongoDB.
- It removes the need to manage a database server manually.
- It works well with Express and Mongoose.

### Deployment flow

- Frontend on **Vercel**
- Backend on **Render**
- Database on **MongoDB Atlas**

### Important deployment note

When deploying:

- update frontend API base URL to your live backend URL
- add environment variables in Render
- allow your frontend domain in backend CORS configuration if needed

---

## 10. Features

### Dashboard

- dark-themed modern analytics layout
- sidebar navigation
- summary KPI cards
- responsive design

### Charts

- revenue growth line chart
- startup stage pie chart
- funding by industry bar chart

### Prediction System

- user input form for startup business metrics
- backend risk scoring logic
- prediction result with risk level, score, and message

### Data Analysis

- save startup data into MongoDB
- fetch and display startup records
- calculate profitability from revenue and burn rate
- generate insight-style portfolio summaries

### UX Improvements

- loading spinner
- input validation
- error handling
- reusable components

---

## 11. Future Improvements

This project is designed to be extendable. Future upgrades can include:

- **Machine Learning model**
  - replace rule-based predictions with a trained ML model
  - improve survival and profitability forecasting accuracy

- **Real-time data**
  - use WebSockets or polling for live startup metrics
  - show updates instantly without refreshing

- **Authentication**
  - add login and signup
  - create role-based access for admins, analysts, and investors

- **Advanced analytics**
  - startup comparison view
  - trend forecasting
  - industry benchmarking

- **File upload support**
  - import CSV or Excel startup data

- **Report generation**
  - export insights as PDF or presentation summary

---

## 12. Conclusion

This project teaches a lot of practical software engineering and analytics concepts in one place.

By building or studying this system, a learner understands:

- how a full-stack project is structured
- how React frontend and Express backend communicate
- how MongoDB stores structured business data
- how dashboards visualize startup metrics
- how business rules can be used to build an early prediction engine
- how reusable components and clear architecture improve maintainability

This makes the project strong for:

- beginners learning full-stack development
- students building data analytics portfolios
- developers wanting a resume-worthy dashboard project
- GitHub portfolios that need a complete real-world application

---

## Resume / Portfolio Value

This project demonstrates:

- full-stack development
- REST API design
- MongoDB schema design
- React component architecture
- chart-based analytics UI
- prediction logic implementation
- responsive dashboard design
- clean separation of frontend and backend responsibilities

If you want to showcase one project that combines **web development + analytics + business logic**, this is a very strong example.
