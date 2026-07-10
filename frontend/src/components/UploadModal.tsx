"use client";

import Papa from "papaparse";
import { useState } from "react";
import { FileText, X, UploadCloud } from "lucide-react";

interface UploadModalProps {
  onClose: () => void;
  setLeads: React.Dispatch<React.SetStateAction<any[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UploadModal({ onClose, setLeads, setLoading }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);

    Papa.parse<Record<string, unknown>>(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: (result: Papa.ParseResult<Record<string, unknown>>) => {
        setPreview(result.data.slice(0, 5));
      },
    });
  };

  const uploadFile = () => {
    if (!file) return;

    setLoading(true);

    setTimeout(() => {
      Papa.parse<Record<string, unknown>>(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: Papa.ParseResult<Record<string, unknown>>) => {
          setLeads(result.data);
          setLoading(false);
          onClose();
        },
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-[36px] border border-white/10 bg-[#0c1321]/95 shadow-[0_32px_100px_-40px_rgba(0,0,0,0.75)]">
        <div className="border-b border-white/10 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Import Leads via CSV</h2>
              <p className="text-slate-400 mt-1">
                Preview your data and load it into the lead table.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <X />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!file ? (
            <label className="group flex h-72 cursor-pointer flex-col items-center justify-center gap-3 rounded-[32px] border-2 border-dashed border-white/10 bg-[#111827] px-6 text-center transition duration-200 hover:border-emerald-400/60 hover:bg-[#152433]">
              <UploadCloud className="text-emerald-400" size={46} />
              <div>
                <p className="text-lg font-semibold">Drag & drop your CSV file</p>
                <p className="mt-1 text-sm text-slate-400">or click to browse documents</p>
              </div>
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) handleFile(selected);
                }}
              />
            </label>
          ) : (
            <div>
              <div className="mb-4 rounded-[28px] border border-white/10 bg-[#111827] p-4 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium text-slate-100">{file.name}</p>
                    <p className="text-sm text-slate-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <span className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
                    {preview.length ? `${preview.length} preview rows` : "No preview available"}
                  </span>
                </div>
              </div>

              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0f172a]">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-[#111827] text-slate-300">
                      <tr>
                        {Object.keys(preview[0] || {}).map((key) => (
                          <th
                            key={key}
                            className="whitespace-nowrap px-4 py-3 text-left uppercase tracking-[0.08em] text-xs font-semibold text-slate-400"
                          >
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((row, i) => (
                        <tr key={i} className="border-t border-white/10 even:bg-white/5/5">
                          {Object.values(row).map((value: any, j) => (
                            <td key={j} className="whitespace-nowrap px-4 py-3 text-slate-200">
                              {value ?? "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              disabled={!file}
              onClick={uploadFile}
              className="rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition duration-200 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Upload File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
