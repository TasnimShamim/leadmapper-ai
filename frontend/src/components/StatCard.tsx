export default function StatCard({ title, value, icon }: any) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-[#111827]/80 p-5 shadow-sm shadow-black/10 backdrop-blur-sm transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-slate-400 text-sm">{title}</p>
          <h3 className="text-3xl font-semibold mt-3">{value}</h3>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500/15 text-emerald-300">
          {icon}
        </div>
      </div>
    </div>
  );
}