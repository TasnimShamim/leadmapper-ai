"use client";

import { FileText } from "lucide-react";

interface FileSelectorProps {
  title: string;
  subtitle: string;
  files: string[];
  selectedFile: string | null;
  onSelect: (file: string) => void;
}

export default function FileSelector({
  title,
  subtitle,
  files,
  selectedFile,
  onSelect,
}: FileSelectorProps) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#0f172a] p-6">

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 mb-6 text-sm text-slate-400">
        {subtitle}
      </p>

      {files.length === 0 ? (
        <div className="flex h-56 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#111827]">
          <div className="text-center">

            <FileText
              size={42}
              className="mx-auto mb-4 text-slate-500"
            />

            <h3 className="text-lg font-semibold text-white">
              No CSV Files Found
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Upload a CSV file to continue.
            </p>

          </div>
        </div>
      ) : (
        <div className="space-y-3 max-h-[520px] overflow-y-auto">

          {files.map((file) => (
            <button
              key={file}
              onClick={() => onSelect(file)}
              className={`flex w-full items-center gap-4 rounded-2xl border p-4 transition-all duration-200 ${
                selectedFile === file
                  ? "border-emerald-400 bg-emerald-500/10"
                  : "border-white/10 bg-[#111827] hover:border-emerald-400/50 hover:bg-[#172033]"
              }`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15">
                <FileText
                  size={22}
                  className="text-emerald-400"
                />
              </div>

              <div className="flex-1 text-left">

                <p className="font-medium text-white truncate">
                  {file}
                </p>

                <p className="text-xs text-slate-500">
                  CSV File
                </p>

              </div>

              {selectedFile === file && (
                <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300">
                  Selected
                </span>
              )}
            </button>
          ))}

        </div>
      )}
    </div>
  );
}
