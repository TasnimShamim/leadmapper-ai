"use client";

interface CSVPreviewTableProps {
  rows: Record<string, any>[];
}

export default function CSVPreviewTable({
  rows,
}: CSVPreviewTableProps) {

  if (!rows || rows.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-[28px] border border-white/10 bg-[#111827]">
        <p className="text-slate-400">
          No CSV selected. Select a file to preview.
        </p>
      </div>
    );
  }


  const columns = Object.keys(rows[0]);


  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0f172a]">

      <div className="max-h-[500px] overflow-auto">

        <table className="min-w-full text-sm">

          <thead className="sticky top-0 bg-[#111827]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="whitespace-nowrap border-b border-white/10 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>


          <tbody>

            {rows.map((row, index) => (

              <tr
                key={index}
                className="border-b border-white/10 hover:bg-white/5"
              >

                {columns.map((column) => (

                  <td
                    key={column}
                    className="max-w-[250px] truncate whitespace-nowrap px-4 py-3 text-slate-200"
                  >
                    {row[column] ?? "-"}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      <div className="border-t border-white/10 px-4 py-3 text-sm text-slate-400">
        Showing {rows.length} rows
      </div>

    </div>
  );
}
