"use client";

interface UploadedCSVListProps {
  files: string[];
  selectedFile: string | null;
  onSelect: (file: string) => void;
}

export default function UploadedCSVList({
  files,
  selectedFile,
  onSelect,
}: UploadedCSVListProps) {
  if (!files.length) {
    return (
      <div className="flex h-56 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#111827]">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-white">
            No CSV files uploaded
          </h3>

          <p className="mt-2 text-slate-400">
            Upload your first CSV using the Import CSV button.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {files.map((file) => (
        <button
          key={file}
          onClick={() => onSelect(file)}
          className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
            selectedFile === file
              ? "border-emerald-400 bg-emerald-500/10"
              : "border-white/10 bg-[#111827] hover:border-emerald-400/40"
          }`}
        >
          <p className="font-medium text-white">{file}</p>
        </button>
      ))}
    </div>
  );
}
