import { Activity, DollarSign, Sparkles, Users } from "lucide-react";
import Card from "../components/Card";
import Charts from "../components/Charts";

function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-gray-800 bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 p-6 shadow-glow">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Startup Profit & Survival Analysis Dashboard</p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Portfolio health at a glance</h2>
            <p className="mt-3 max-w-2xl text-gray-400">
              Track revenue momentum, benchmark industry performance, and monitor startup resilience with a modern investor-grade analytics view.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-200">
            Updated for Q2 performance snapshot
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card
          title="Total Revenue"
          value="$84,500"
          subtitle="+12.4% vs last period"
          icon={DollarSign}
          accent="cyan"
        />
        <Card
          title="Active Users"
          value="342"
          subtitle="+12.4% month-over-month"
          icon={Users}
          accent="emerald"
        />
        <Card
          title="Avg Survival Rate"
          value="68%"
          subtitle="+2.1% predictive lift"
          icon={Activity}
          accent="violet"
        />
        <Card
          title="Top Industry"
          value="AI & ML"
          subtitle="Highest funding momentum"
          icon={Sparkles}
          accent="amber"
        />
      </section>

      <Charts />
    </div>
  );
}

export default DashboardPage;
