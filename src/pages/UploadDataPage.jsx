import { FileUp, ShieldCheck } from "lucide-react";

function UploadDataPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow">
        <h2 className="text-3xl font-semibold text-white">Upload Data</h2>
        <p className="mt-2 text-gray-400">
          Bring in startup financials, user metrics, and funding history to power deeper analysis.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow xl:col-span-2">
          <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-gray-700 bg-gray-950/70 px-6 text-center transition hover:border-cyan-500/30">
            <div className="rounded-3xl bg-cyan-500/10 p-4 text-cyan-300">
              <FileUp size={30} />
            </div>
            <h3 className="mt-5 text-2xl font-semibold text-white">Drag and drop startup datasets</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-400">
              Upload CSV or spreadsheet exports for revenue, burn rate, team size, and customer performance metrics.
            </p>
            <button
              type="button"
              className="mt-6 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 font-medium text-cyan-200 transition hover:bg-cyan-500/20"
            >
              Select Files
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-glow">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-300">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Upload Guidelines</h3>
              <p className="text-sm text-gray-400">Best format for clean analysis</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-gray-300">
            <div className="rounded-2xl border border-gray-800 bg-gray-950/80 p-4">Use one row per startup with consistent numeric formatting.</div>
            <div className="rounded-2xl border border-gray-800 bg-gray-950/80 p-4">Include funding, revenue, burn, team size, and years active fields.</div>
            <div className="rounded-2xl border border-gray-800 bg-gray-950/80 p-4">Prefer monthly snapshots for better prediction accuracy.</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default UploadDataPage;
