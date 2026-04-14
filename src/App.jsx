import { useState } from "react";
import { BarChart3, BrainCircuit, LayoutDashboard, UploadCloud } from "lucide-react";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import InsightsPage from "./pages/InsightsPage";
import PredictionsPage from "./pages/PredictionsPage";
import UploadDataPage from "./pages/UploadDataPage";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "upload", label: "Upload Data", icon: UploadCloud },
  { id: "insights", label: "Insights", icon: BarChart3 },
  { id: "predictions", label: "Predictions", icon: BrainCircuit },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "upload":
        return <UploadDataPage />;
      case "insights":
        return <InsightsPage />;
      case "predictions":
        return <PredictionsPage />;
      case "dashboard":
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar items={navItems} activePage={activePage} onNavigate={setActivePage} />
        <main className="flex-1 bg-gradient-to-br from-gray-950 via-gray-900 to-slate-950">
          <div className="min-h-screen p-4 sm:p-6 lg:p-8">{renderPage()}</div>
        </main>
      </div>
    </div>
  );
}

export default App;
