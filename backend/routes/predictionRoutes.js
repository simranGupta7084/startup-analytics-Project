const express = require("express");
const { body } = require("express-validator");
const { predictStartup } = require("../controllers/predictionController");

const router = express.Router();

const predictionValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("industry").trim().notEmpty().withMessage("Industry is required"),
  body("funding").isFloat({ min: 0 }).withMessage("Funding must be a positive number"),
  body("revenue").isFloat({ min: 0 }).withMessage("Revenue must be a positive number"),
  body("burnRate").isFloat({ min: 0 }).withMessage("Burn rate must be a positive number"),
  body("teamSize").isInt({ min: 0 }).withMessage("Team size must be a non-negative integer"),
  body("yearsActive").isFloat({ min: 0 }).withMessage("Years active must be a non-negative number"),
];

router.post("/predict", predictionValidation, predictStartup);

module.exports = router;
