import { AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";

const recommendations = [
  "Prioritize customer retention campaigns for high-LTV segments.",
  "Increase runway by trimming low-performing acquisition spend.",
  "Double down on AI & ML partnerships to expand distribution.",
  "Model burn scenarios monthly to protect against funding delays.",
  "Add cohort-level profitability tracking for earlier warning signals.",
];

function InsightsPage() {
  const survivalRate = 68.5;
  const riskScore = 42;
  const profitabilityScore = 72;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow">
        <h2 className="text-3xl font-semibold text-white">Insights</h2>
        <p className="mt-2 text-gray-400">
          Predictive scoring and strategic guidance based on startup revenue, burn rate, and survival patterns.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow xl:col-span-1">
          <h3 className="text-lg font-semibold text-white">Survival Rate Prediction</h3>
          <div className="mt-8 flex justify-center">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-[conic-gradient(#22d3ee_0_68.5%,#1f2937_68.5%_100%)] p-4">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gray-950 text-center">
                <span className="text-5xl font-semibold text-white">{survivalRate}%</span>
                <span className="mt-2 text-sm text-gray-400">Predicted 24-month survival</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:col-span-2 md:grid-cols-2">
          <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-300">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Risk Analysis</h3>
                <p className="text-sm text-gray-400">Risk Level: Medium</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm text-gray-300">
                <span>Score</span>
                <span>{riskScore}/100</span>
              </div>
              <div className="h-3 rounded-full bg-gray-800">
                <div className="h-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" style={{ width: `${riskScore}%` }} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-300">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Profitability</h3>
                <p className="text-sm text-gray-400">Score: {profitabilityScore}</p>
              </div>
            </div>
            <p className="mt-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4 text-sm leading-6 text-emerald-100">
              Positive outlook - growing revenue with manageable burn rate
            </p>
          </div>

          <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
                <Lightbulb size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Strategic Recommendations</h3>
                <p className="text-sm text-gray-400">Five actions to improve resilience and profitability</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              {recommendations.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-gray-800 bg-gray-950/80 px-4 py-3 text-gray-300 transition hover:border-cyan-500/30 hover:bg-gray-950"
                >
                  <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-semibold text-cyan-300">
                    {index + 1}
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default InsightsPage;
