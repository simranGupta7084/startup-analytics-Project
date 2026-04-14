import { useMemo, useState } from "react";
import { Database, FileUp } from "lucide-react";
import Loader from "../components/Loader";
import { formatCurrency } from "../utils/formatters";

const initialState = {
  name: "",
  industry: "AI & ML",
  funding: "",
  revenue: "",
  burnRate: "",
  teamSize: "",
  yearsActive: "",
};

function UploadDataPage({ onSaveStartup, loading, startups, error }) {
  const [form, setForm] = useState(initialState);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const startupCount = useMemo(() => startups.length, [startups]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Startup name is required.";
    if (!form.industry.trim()) return "Industry is required.";

    const numericFields = ["funding", "revenue", "burnRate", "teamSize", "yearsActive"];
    for (const field of numericFields) {
      if (form[field] === "" || Number(form[field]) < 0 || Number.isNaN(Number(form[field]))) {
        return `Please provide a valid ${field}.`;
      }
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    const validationMessage = validate();
    if (validationMessage) {
      setSubmitError(validationMessage);
      return;
    }

    try {
      await onSaveStartup({
        ...form,
        funding: Number(form.funding),
        revenue: Number(form.revenue),
        burnRate: Number(form.burnRate),
        teamSize: Number(form.teamSize),
        yearsActive: Number(form.yearsActive),
      });
      setSubmitSuccess("Startup data saved successfully.");
      setForm(initialState);
    } catch (requestError) {
      setSubmitError(requestError.message || "Unable to save startup data.");
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow">
        <h2 className="text-3xl font-semibold text-white">Upload Data</h2>
        <p className="mt-2 text-gray-400">Save startup operating metrics into MongoDB for dashboard analysis and predictions.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-5">
        <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow xl:col-span-3">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
              <FileUp size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Startup Data Entry</h3>
              <p className="text-sm text-gray-400">Add a startup profile for analysis</p>
            </div>
          </div>

          <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
            <InputField label="Startup Name" name="name" value={form.name} onChange={handleChange} placeholder="Nova Metrics" />
            <SelectField label="Industry" name="industry" value={form.industry} onChange={handleChange} />
            <InputField label="Funding" name="funding" value={form.funding} onChange={handleChange} placeholder="85000" />
            <InputField label="Revenue" name="revenue" value={form.revenue} onChange={handleChange} placeholder="84500" />
            <InputField label="Burn Rate" name="burnRate" value={form.burnRate} onChange={handleChange} placeholder="31000" />
            <InputField label="Team Size" name="teamSize" value={form.teamSize} onChange={handleChange} placeholder="24" />
            <InputField label="Years Active" name="yearsActive" value={form.yearsActive} onChange={handleChange} placeholder="3" />

            <div className="md:col-span-2">
              {submitError ? <p className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{submitError}</p> : null}
              {submitSuccess ? <p className="mb-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-200">{submitSuccess}</p> : null}
              {error ? <p className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 font-semibold text-gray-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Saving..." : "Save Startup Data"}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow xl:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-300">
              <Database size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Saved Startups</h3>
              <p className="text-sm text-gray-400">{startupCount} records available</p>
            </div>
          </div>

          {loading ? <Loader label="Refreshing startup records..." /> : null}

          <div className="grid max-h-[28rem] gap-3 overflow-auto pr-1">
            {startups.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-950/70 p-5 text-sm text-gray-400">
                No startup data yet. Add your first startup profile from the form.
              </div>
            ) : (
              startups.map((startup) => (
                <div key={startup._id} className="rounded-2xl border border-gray-800 bg-gray-950/80 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-white">{startup.name}</h4>
                      <p className="text-sm text-gray-400">{startup.industry}</p>
                    </div>
                    <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                      Profit {formatCurrency(startup.profit)}
                    </span>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-400">
                    <p>Funding: {formatCurrency(startup.funding)}</p>
                    <p>Revenue: {formatCurrency(startup.revenue)}</p>
                    <p>Burn: {formatCurrency(startup.burnRate)}</p>
                    <p>Team: {startup.teamSize}</p>
                  </div>
                </div>
              ))
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

export default UploadDataPage;
