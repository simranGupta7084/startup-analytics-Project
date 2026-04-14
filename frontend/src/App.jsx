import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import UploadDataPage from "./pages/UploadDataPage";
import InsightsPage from "./pages/InsightsPage";
import PredictionsPage from "./pages/PredictionsPage";
import { getStartups, runPrediction, saveStartup } from "./services/api";

const fallbackRevenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 16000 },
  { month: "Mar", revenue: 21000 },
  { month: "Apr", revenue: 24000 },
  { month: "May", revenue: 30000 },
  { month: "Jun", revenue: 34500 },
];

const fallbackStageData = [
  { name: "Seed", value: 30 },
  { name: "Series A", value: 25 },
  { name: "Series B", value: 20 },
  { name: "Growth", value: 15 },
  { name: "Late Stage", value: 10 },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [startups, setStartups] = useState([]);
  const [loadingStartups, setLoadingStartups] = useState(false);
  const [savingStartup, setSavingStartup] = useState(false);
  const [predictionLoading, setPredictionLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [startupError, setStartupError] = useState("");
  const [predictionError, setPredictionError] = useState("");

  const fetchStartups = async () => {
    setLoadingStartups(true);
    setStartupError("");

    try {
      const data = await getStartups();
      setStartups(Array.isArray(data) ? data : []);
    } catch (error) {
      setStartupError(error.response?.data?.message || "Unable to load startup data.");
    } finally {
      setLoadingStartups(false);
    }
  };

  useEffect(() => {
    fetchStartups();
  }, []);

  const handleSaveStartup = async (payload) => {
    setSavingStartup(true);
    setStartupError("");

    try {
      await saveStartup(payload);
      await fetchStartups();
    } catch (error) {
      const message = error.response?.data?.message || "Unable to save startup data.";
      setStartupError(message);
      throw new Error(message);
    } finally {
      setSavingStartup(false);
    }
  };

  const handlePredict = async (payload) => {
    setPredictionLoading(true);
    setPredictionError("");
    setPredictionResult(null);

    try {
      const result = await runPrediction(payload);
      setPredictionResult(result);
    } catch (error) {
      setPredictionError(error.response?.data?.message || "Unable to generate prediction.");
    } finally {
      setPredictionLoading(false);
    }
  };

  const metrics = useMemo(() => {
    const totalRevenue = startups.reduce((sum, startup) => sum + Number(startup.revenue || 0), 0) || 84500;
    const activeUsers = startups.length || 342;
    const profitableCount = startups.filter((startup) => Number(startup.profit) > 0).length;
    const survivalRate = startups.length ? Math.round((profitableCount / startups.length) * 100) : 68;

    const industryCounts = startups.reduce((accumulator, startup) => {
      const key = startup.industry || "AI & ML";
      accumulator[key] = (accumulator[key] || 0) + 1;
      return accumulator;
    }, {});

    const topIndustry =
      Object.entries(industryCounts).sort((left, right) => right[1] - left[1])[0]?.[0] || "AI & ML";

    return {
      totalRevenue,
      activeUsers,
      survivalRate,
      topIndustry,
    };
  }, [startups]);

  const chartData = useMemo(() => {
    const revenueGrowth = startups.length
      ? fallbackRevenueData.map((entry, index) => ({
          ...entry,
          revenue: Math.max(
            4000,
            Math.round((metrics.totalRevenue / fallbackRevenueData.length) * (0.55 + index * 0.14))
          ),
        }))
      : fallbackRevenueData;

    const industryTotals = startups.reduce((accumulator, startup) => {
      accumulator[startup.industry] = (accumulator[startup.industry] || 0) + Number(startup.funding || 0);
      return accumulator;
    }, {});

    const fundingByIndustry = Object.keys(industryTotals).length
      ? Object.entries(industryTotals).map(([industry, funding]) => ({
          industry,
          funding,
        }))
      : [
          { industry: "AI & ML", funding: 320000 },
          { industry: "Fintech", funding: 240000 },
          { industry: "HealthTech", funding: 180000 },
          { industry: "SaaS", funding: 270000 },
          { industry: "ClimateTech", funding: 140000 },
        ];

    return {
      revenueGrowth,
      stageDistribution: fallbackStageData,
      fundingByIndustry,
    };
  }, [metrics.totalRevenue, startups]);

  const insight = useMemo(() => {
    const avgProfit =
      startups.length > 0
        ? startups.reduce((sum, startup) => sum + Number(startup.profit || 0), 0) / startups.length
        : 12500;

    const riskLevel = avgProfit > 10000 ? "LOW" : avgProfit >= 0 ? "MEDIUM" : "HIGH";
    const riskScore = avgProfit > 10000 ? 28 : avgProfit >= 0 ? 42 : 78;
    const profitabilityScore = avgProfit > 10000 ? 81 : avgProfit >= 0 ? 72 : 38;
    const message =
      avgProfit > 10000
        ? "Strong outlook - startup portfolio is generating healthy profits with stable burn."
        : avgProfit >= 0
          ? "Positive outlook - growing revenue with manageable burn rate."
          : "Caution advised - burn rate is outpacing revenue and funding resilience is limited.";

    return { riskLevel, riskScore, profitabilityScore, message };
  }, [startups]);

  const renderPage = () => {
    switch (activePage) {
      case "upload":
        return (
          <UploadDataPage
            onSaveStartup={handleSaveStartup}
            loading={savingStartup || loadingStartups}
            startups={startups}
            error={startupError}
          />
        );
      case "insights":
        return <InsightsPage insight={insight} />;
      case "predictions":
        return (
          <PredictionsPage
            onPredict={handlePredict}
            loading={predictionLoading}
            prediction={predictionResult}
            error={predictionError}
          />
        );
      case "dashboard":
      default:
        return (
          <DashboardPage
            metrics={metrics}
            chartData={chartData}
            loading={loadingStartups}
            error={startupError}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <main className="flex-1 bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950">
          <div className="min-h-screen p-4 sm:p-6 lg:p-8">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
}

export default App;
