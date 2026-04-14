const buildPrediction = ({ funding, revenue, burnRate }) => {
  const profit = Number(revenue) - Number(burnRate);
  let risk = "MEDIUM";
  let score = 50;
  let message = "Balanced profile - monitor burn rate and improve revenue efficiency.";

  if (profit > 0 && Number(funding) > 50000) {
    risk = "LOW";
    score = 82;
    message = "Healthy profile - revenue exceeds burn and funding support is strong.";
  } else if (profit < 0) {
    risk = "HIGH";
    score = 28;
    message = "High risk - burn rate exceeds revenue and the startup needs stronger financial control.";
  } else if (Math.abs(profit) <= 5000) {
    risk = "MEDIUM";
    score = 52;
    message = "Moderate risk - profit is close to break-even and requires careful operating discipline.";
  }

  return { risk, score, message, profit };
};

module.exports = { buildPrediction };
