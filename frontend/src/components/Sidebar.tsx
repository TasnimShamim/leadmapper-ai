import {
  LayoutDashboard,
  Upload,
  Users,
  Settings,
  Bot,
  Database,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Import Leads", icon: Upload },
  { name: "Manage Leads", icon: Users },
  { name: "AI Mapping", icon: Bot },
  { name: "CRM Fields", icon: Database },
  { name: "Settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-80 flex-col gap-8 bg-[#0f172a]/95 border-r border-white/10 p-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80 mb-3">
          Welcome back
        </p>
        <h1 className="text-3xl font-semibold">
          LeadMapper<span className="text-emerald-400">AI</span>
        </h1>
      </div>

      <nav className="space-y-2">
        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition duration-200 ${
                index === 1
                  ? "bg-emerald-500/15 text-emerald-300 shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/5 text-emerald-400">
                  <Icon size={18} />
                </div>
                <span>{item.name}</span>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-[28px] border border-white/10 bg-[#111827]/90 p-5 shadow-inner shadow-black/20">
        <p className="text-sm font-medium text-slate-100">CSV Importer</p>
        <p className="mt-2 text-sm text-slate-400">
          Use AI to standardize leads and reduce manual work.
        </p>
      </div>
    </aside>
  );
}