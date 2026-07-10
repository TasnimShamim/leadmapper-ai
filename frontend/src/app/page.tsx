"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import UploadModal from "../components/UploadModal";
import LeadTable from "../components/LeadTable";
import StatCard from "../components/StatCard";
import { Upload, Users, CheckCircle, Clock } from "lucide-react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-transparent text-white flex flex-col lg:flex-row">
      <Sidebar />

      <section className="flex-1 p-4 md:p-8 overflow-hidden">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400/80 mb-2">
                Lead Management Dashboard
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold">
                Manage your leads with intelligent CSV mapping.
              </h1>
              <p className="text-slate-400 mt-3 max-w-xl">
                Upload your CSV files, preview the results, and review all imported leads in one polished workspace.
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-emerald-400"
            >
              <Upload size={18} />
              Import CSV
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-8">
            <StatCard title="Total Leads" value={leads.length} icon={<Users />} />
            <StatCard title="Mapped Leads" value={leads.length} icon={<CheckCircle />} />
            <StatCard title="Pending Review" value="0" icon={<Clock />} />
            <StatCard title="Accuracy" value="98%" icon={<CheckCircle />} />
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-[#0f172a]/95 p-6 shadow-xl">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Your Leads</h2>
              <p className="text-slate-400 mt-1">
                Search, review, and manage imported leads in one place.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="search"
                placeholder="Search leads, email, or company"
                className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20 sm:w-80"
              />
              <span className="inline-flex items-center rounded-2xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {leads.length} records
              </span>
            </div>
          </div>

          <div className="mt-6">
            <LeadTable leads={leads} loading={loading} />
          </div>
        </div>
      </section>

      {open && (
        <UploadModal
          onClose={() => setOpen(false)}
          setLeads={setLeads}
          setLoading={setLoading}
        />
      )}
    </main>
  );
}