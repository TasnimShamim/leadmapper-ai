"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Upload, Bot, Database } from "lucide-react";

const menu = [
  {
    name: "Import CSV",
    href: "/import",
    icon: Upload,
  },
  {
    name: "AI Mapping",
    href: "/mapping",
    icon: Bot,
  },
  {
    name: "CRM Leads",
    href: "/crm",
    icon: Database,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-[#0f172a]/95 p-6">
      {/* Logo */}
      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-emerald-400">
          Lead Management
        </p>

        <h1 className="text-3xl font-bold text-white">
          LeadMapper
          <span className="text-emerald-400">AI</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="mt-10 space-y-3">
        {menu.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 rounded-2xl px-4 py-3 transition ${
                active
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  active
                    ? "bg-emerald-500/20"
                    : "bg-white/5"
                }`}
              >
                <Icon size={20} />
              </div>

              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto rounded-3xl border border-white/10 bg-[#111827] p-5">
        <h3 className="font-semibold text-white">
          AI CRM Mapper
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Upload CSV files, process them with AI, and review CRM-ready leads.
        </p>
      </div>
    </aside>
  );
}
