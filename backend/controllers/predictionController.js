const { validationResult } = require("express-validator");
const { buildPrediction } = require("../utils/prediction");

const predictStartup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  try {
    const result = buildPrediction(req.body);
    res.json({
      risk: result.risk,
      score: result.score,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  predictStartup,
};
