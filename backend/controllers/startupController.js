const { validationResult } = require("express-validator");
const Startup = require("../models/Startup");
const { buildPrediction } = require("../utils/prediction");

const saveStartup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  try {
    const { name, industry, funding, revenue, burnRate, teamSize, yearsActive } = req.body;
    const { profit } = buildPrediction({ funding, revenue, burnRate });

    const startup = await Startup.create({
      name,
      industry,
      funding,
      revenue,
      burnRate,
      teamSize,
      yearsActive,
      profit,
    });

    res.status(201).json(startup);
  } catch (error) {
    next(error);
  }
};

const getStartups = async (req, res, next) => {
  try {
    const startups = await Startup.find().sort({ createdAt: -1 });
    res.json(startups);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  saveStartup,
  getStartups,
};
