import { useState } from "react";
import { Brain } from "lucide-react";
import Loader from "../components/Loader";

const initialState = {
  name: "",
  industry: "AI & ML",
  funding: "",
  revenue: "",
  burnRate: "",
  teamSize: "",
  yearsActive: "",
};

function PredictionsPage({ onPredict, loading, prediction, error }) {
  const [form, setForm] = useState(initialState);
  const [validationError, setValidationError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationError("");

    if (!form.name.trim()) {
      setValidationError("Startup name is required.");
      return;
    }

    const numericFields = ["funding", "revenue", "burnRate", "teamSize", "yearsActive"];
    for (const field of numericFields) {
      if (form[field] === "" || Number(form[field]) < 0 || Number.isNaN(Number(form[field]))) {
        setValidationError(`Please provide a valid ${field}.`);
        return;
      }
    }

    await onPredict({
      ...form,
      funding: Number(form.funding),
      revenue: Number(form.revenue),
      burnRate: Number(form.burnRate),
      teamSize: Number(form.teamSize),
      yearsActive: Number(form.yearsActive),
    });
  };

  const riskStyles = {
    LOW: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    MEDIUM: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    HIGH: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow">
        <h2 className="text-3xl font-semibold text-white">Predictions</h2>
        <p className="mt-2 text-gray-400">Estimate startup survival and profitability risk from key operating inputs.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow xl:col-span-3">
          <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
            <InputField label="Startup Name" name="name" value={form.name} onChange={handleChange} placeholder="Nova Metrics" />
            <SelectField label="Industry" name="industry" value={form.industry} onChange={handleChange} />
            <InputField label="Funding" name="funding" value={form.funding} onChange={handleChange} placeholder="85000" />
            <InputField label="Revenue" name="revenue" value={form.revenue} onChange={handleChange} placeholder="84500" />
            <InputField label="Burn Rate" name="burnRate" value={form.burnRate} onChange={handleChange} placeholder="31000" />
            <InputField label="Team Size" name="teamSize" value={form.teamSize} onChange={handleChange} placeholder="24" />
            <InputField label="Years Active" name="yearsActive" value={form.yearsActive} onChange={handleChange} placeholder="3" />

            <div className="md:col-span-2">
              {validationError ? <p className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{validationError}</p> : null}
              {error ? <p className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-gray-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Running..." : "Run Prediction"}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow xl:col-span-2">
          <div className="flex h-full min-h-80 flex-col justify-center rounded-3xl border border-dashed border-gray-700 bg-gray-950/70 p-6">
            {loading ? (
              <Loader label="Calculating risk profile..." />
            ) : prediction ? (
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-3xl bg-cyan-500/10 p-4 text-cyan-300">
                    <Brain size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Prediction Result</h3>
                    <p className="text-sm text-gray-400">Startup risk evaluation</p>
                  </div>
                </div>
                <div className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${riskStyles[prediction.risk] || riskStyles.MEDIUM}`}>
                  Risk Level: {prediction.risk}
                </div>
                <div className="rounded-2xl border border-gray-800 bg-gray-900/80 p-4">
                  <p className="text-sm text-gray-400">Score</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{prediction.score}/100</p>
                </div>
                <p className="rounded-2xl border border-gray-800 bg-gray-900/80 p-4 text-sm leading-6 text-gray-300">{prediction.message}</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto w-fit rounded-3xl bg-cyan-500/10 p-4 text-cyan-300">
                  <Brain size={28} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white">Awaiting Data</h3>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Complete the form and run the prediction engine to see risk level, score, and the profitability outlook.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-300">{label}</span>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
      />
    </label>
  );
}

function SelectField({ label, name, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-300">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
      >
        <option>AI & ML</option>
        <option>Fintech</option>
        <option>HealthTech</option>
        <option>SaaS</option>
        <option>ClimateTech</option>
        <option>E-commerce</option>
      </select>
    </label>
  );
}

export default PredictionsPage;
