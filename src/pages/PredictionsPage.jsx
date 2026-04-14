import { Brain, ChevronDown } from "lucide-react";

function PredictionsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow">
        <h2 className="text-3xl font-semibold text-white">Predictions</h2>
        <p className="mt-2 text-gray-400">
          Enter startup fundamentals to simulate survival and profitability outcomes.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow xl:col-span-3">
          <div className="grid gap-5 md:grid-cols-2">
            <InputField label="Startup Name" placeholder="Nova Metrics" />
            <SelectField label="Industry" defaultValue="AI & ML" />
            <InputField label="Total Funding" placeholder="$5,000,000" />
            <InputField label="Team Size" placeholder="24" />
            <InputField label="Years Active" placeholder="3" />
            <InputField label="Monthly Revenue" placeholder="$120,000" />
            <InputField label="Monthly Burn" placeholder="$85,000" />
          </div>

          <button
            type="button"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-gray-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            Run Prediction Model
          </button>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow xl:col-span-2">
          <div className="flex h-full min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-700 bg-gray-950/70 px-6 text-center">
            <div className="rounded-3xl bg-cyan-500/10 p-4 text-cyan-300">
              <Brain size={28} />
            </div>
            <h3 className="mt-5 text-2xl font-semibold text-white">Awaiting Data</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
              Complete the startup profile and run the model to see projected profitability, survival likelihood, and risk indicators.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function InputField({ label, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-300">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
      />
    </label>
  );
}

function SelectField({ label, defaultValue }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-300">{label}</span>
      <div className="relative">
        <select
          defaultValue={defaultValue}
          className="w-full appearance-none rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 pr-12 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
        >
          <option>AI & ML</option>
          <option>Fintech</option>
          <option>HealthTech</option>
          <option>SaaS</option>
          <option>ClimateTech</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
      </div>
    </label>
  );
}

export default PredictionsPage;
