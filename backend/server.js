const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const startupRoutes = require("./routes/startupRoutes");
const predictionRoutes = require("./routes/predictionRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Startup Profit & Survival Analysis API is running." });
});

app.use("/api", startupRoutes);
app.use("/api", predictionRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: err.message || "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
