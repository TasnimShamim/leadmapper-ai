export default function LeadTable({ leads, loading }: any) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-12 bg-white/5 rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!leads.length) {
    return (
      <div className="h-72 flex flex-col items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-[#111827] text-center px-5 text-slate-400">
        <p className="text-lg font-medium text-slate-100">No leads uploaded yet.</p>
        <p className="mt-2 text-sm">Import a CSV to populate the lead table and get started.</p>
      </div>
    );
  }

  const headers = Object.keys(leads[0]);

  return (
    <div className="overflow-auto max-h-[520px] rounded-[32px] border border-white/10 bg-[#0c1321] shadow-sm">
      <table className="w-full min-w-[900px] text-sm">
        <thead className="sticky top-0 bg-[#111827] text-slate-300">
          <tr>
            {headers.map((header) => (
              <th key={header} className="border-b border-white/10 px-4 py-4 text-left font-medium uppercase tracking-[0.08em] text-[11px] text-slate-400">
                {header}
              </th>
            ))}
            <th className="border-b border-white/10 px-4 py-4 text-left font-medium uppercase tracking-[0.08em] text-[11px] text-slate-400">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead: any, index: number) => (
            <tr key={index} className="border-b border-white/10 transition hover:bg-white/5">
              {headers.map((header) => (
                <td key={header} className="px-4 py-4 text-slate-200 whitespace-nowrap max-w-[220px] overflow-hidden truncate">
                  {lead[header] || "-"}
                </td>
              ))}

              <td className="px-4 py-4">
                <span className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                  Imported
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}