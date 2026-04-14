import { Rocket } from "lucide-react";

function Sidebar({ items, activePage, onNavigate }) {
  return (
    <aside className="w-full border-b border-gray-800 bg-gray-900/90 backdrop-blur lg:min-h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-gray-950 shadow-lg shadow-cyan-500/20">
          <Rocket size={22} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-400">Analytics Suite</p>
          <h1 className="text-lg font-semibold text-white">Startup Analytics</h1>
        </div>
      </div>

      <nav className="px-4 pb-6">
        <div className="grid gap-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-white shadow-glow"
                    : "text-gray-400 hover:bg-gray-800/70 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                    isActive
                      ? "bg-cyan-400/15 text-cyan-300"
                      : "bg-gray-800 text-gray-400 group-hover:bg-gray-700 group-hover:text-cyan-300"
                  }`}
                >
                  <Icon size={18} />
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
