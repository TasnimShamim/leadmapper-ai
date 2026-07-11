"use client";

import { useEffect, useState } from "react";
import { Upload } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import UploadModal from "../../components/UploadModal";
import UploadedCSVList from "../../components/UploadedCSVList";
import CSVPreviewTable from "../../components/CSVPreviewTable";

import {
  getUploadedCSVFiles,
  previewUploadedCSV,
} from "../../../lib/api";

export default function ImportPage() {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<string[]>([]);

  const [selectedFile, setSelectedFile] =
    useState<string | null>(null);

  const [rows, setRows] = useState<any[]>([]);

  const loadUploadedFiles = async () => {
    try {
      const response = await getUploadedCSVFiles();

      setFiles(response.data);

      if (
        response.data.length > 0 &&
        !selectedFile
      ) {
        previewFile(response.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const previewFile = async (fileName: string) => {
    try {
      setSelectedFile(fileName);

      const response =
        await previewUploadedCSV(fileName);

      setRows(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUploadedFiles();
  }, []);
  console.log("open =", open);
    return (
    <main className="min-h-screen bg-[#020617] text-white flex">
      <Sidebar />

      <section className="flex-1 overflow-y-auto p-8">

        {/* Header */}

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
                Import CSV
              </p>

              <h1 className="mt-2 text-4xl font-semibold">
                Upload Lead CSV Files
              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                Upload CSV files to the server. Uploaded files will be
                available later for AI Mapping.
              </p>

            </div>

            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400"
            >
              <Upload size={18} />
              Import CSV
            </button>

          </div>

        </div>

        {/* Content */}

        <div className="mt-8 grid grid-cols-12 gap-6">

          {/* Uploaded Files */}

          <div className="col-span-4 rounded-[30px] border border-white/10 bg-[#0f172a] p-6">

            <h2 className="text-xl font-semibold">
              Uploaded CSV Files
            </h2>

            <p className="mt-2 mb-6 text-sm text-slate-400">
              Click any uploaded CSV to preview it.
            </p>

            <UploadedCSVList
              files={files}
              selectedFile={selectedFile}
              onSelect={previewFile}
            />

          </div>

          {/* Preview */}

          <div className="col-span-8 rounded-[30px] border border-white/10 bg-[#0f172a] p-6">

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-semibold">
                  CSV Preview
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  {selectedFile
                    ? selectedFile
                    : "No file selected"}
                </p>

              </div>

            </div>

            <CSVPreviewTable rows={rows} />

          </div>

        </div>
        </section>

      {open && (
        <UploadModal
          onClose={() => setOpen(false)}
          onUploadSuccess={loadUploadedFiles}
          setLoading={setLoading}
        />
      )}

    </main>
  );
}
