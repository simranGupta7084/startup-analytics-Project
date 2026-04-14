import { Activity, DollarSign, Sparkles, Users } from "lucide-react";
import Card from "../components/Card";
import Charts from "../components/Charts";
import Loader from "../components/Loader";
import { formatCurrency } from "../utils/formatters";

function DashboardPage({ metrics, chartData, loading, error }) {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-gray-800 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 p-6 shadow-glow">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Startup Profit & Survival Analysis System</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Portfolio health at a glance</h2>
            <p className="mt-3 max-w-2xl text-gray-400">
              A dark-themed analytics workspace for tracking startup performance, survival signals, and funding patterns.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
            Live operational dashboard
          </div>
        </div>
      </section>

      {loading ? <Loader label="Loading startup metrics..." /> : null}
      {error ? <p className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">{error}</p> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Total Revenue" value={formatCurrency(metrics.totalRevenue)} subtitle="Combined monthly revenue" icon={DollarSign} accent="cyan" />
        <Card title="Active Users" value={metrics.activeUsers} subtitle="Tracked startup records" icon={Users} accent="emerald" />
        <Card title="Survival Rate" value={`${metrics.survivalRate}%`} subtitle="Estimated portfolio resilience" icon={Activity} accent="violet" />
        <Card title="Top Industry" value={metrics.topIndustry} subtitle="Highest funding concentration" icon={Sparkles} accent="amber" />
      </section>

      <Charts revenueData={chartData.revenueGrowth} stageData={chartData.stageDistribution} fundingData={chartData.fundingByIndustry} />
    </div>
  );
}

export default DashboardPage;
