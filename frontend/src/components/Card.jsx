function Card({ title, value, subtitle, icon: Icon, accent = "cyan" }) {
  const accentStyles = {
    cyan: "from-cyan-400/20 to-cyan-500/5 text-cyan-300",
    emerald: "from-emerald-400/20 to-emerald-500/5 text-emerald-300",
    violet: "from-violet-400/20 to-violet-500/5 text-violet-300",
    amber: "from-amber-400/20 to-amber-500/5 text-amber-300",
  };

  return (
    <div className="group rounded-3xl border border-gray-800 bg-gray-900/80 p-5 shadow-glow transition duration-300 hover:-translate-y-1 hover:border-gray-700 hover:bg-gray-800/90">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">{value}</h3>
        </div>
        {Icon ? (
          <div className={`rounded-2xl bg-gradient-to-br p-3 ${accentStyles[accent]}`}>
            <Icon size={20} />
          </div>
        ) : null}
      </div>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}

export default Card;
