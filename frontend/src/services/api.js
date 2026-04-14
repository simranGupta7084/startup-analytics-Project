import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export const getStartups = async () => {
  const { data } = await api.get("/startups");
  return data;
};

export const saveStartup = async (payload) => {
  const { data } = await api.post("/startup", payload);
  return data;
};

export const runPrediction = async (payload) => {
  const { data } = await api.post("/predict", payload);
  return data;
};

export default api;
