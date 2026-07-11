"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import FileSelector from "../../components/FileSelector";

import {
  getUploadedCSVFiles,
  parseCSVToCRM,
} from "../../../lib/api";

export default function MappingPage() {
  const [files, setFiles] = useState<string[]>([]);

  const [selectedFile, setSelectedFile] =
    useState<string | null>(null);

  const [processing, setProcessing] =
    useState(false);

  const [message, setMessage] =
    useState("Waiting to start AI Mapping.");

  const loadFiles = async () => {
    try {
      const response =
        await getUploadedCSVFiles();

      setFiles(response.data);

      if (
        response.data.length > 0 &&
        !selectedFile
      ) {
        setSelectedFile(response.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const startMapping = async () => {
    if (!selectedFile) return;

    try {
      setProcessing(true);

      setMessage(
        "AI is processing the selected CSV..."
      );

      const response =
        await parseCSVToCRM(selectedFile);

      console.log(response);

      setMessage(
        "CRM mapping completed successfully."
      );
    } catch (error) {
      console.error(error);

      setMessage(
        "Failed to process the CSV."
      );
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);
    return (
    <main className="min-h-screen bg-[#020617] text-white flex">
      <Sidebar />

      <section className="flex-1 overflow-y-auto p-8">

        {/* Header */}

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
            AI Mapping
          </p>

          <h1 className="mt-2 text-4xl font-semibold">
            Convert Uploaded CSV to CRM Format
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Choose one uploaded CSV file and let AI automatically map
            its columns into the CRM format.
          </p>

        </div>

        <div className="mt-8 grid grid-cols-12 gap-6">

          {/* File Selector */}

          <div className="col-span-4">

            <FileSelector
              title="Uploaded CSV Files"
              subtitle="Choose a CSV file for AI Mapping."
              files={files}
              selectedFile={selectedFile}
              onSelect={setSelectedFile}
            />

          </div>

          {/* Right Side */}

          <div className="col-span-8 space-y-6">

            {/* Selected File */}

            <div className="rounded-[30px] border border-white/10 bg-[#0f172a] p-6">

              <h2 className="text-xl font-semibold">
                Selected File
              </h2>

              <p className="mt-4 text-lg text-emerald-300">

                {selectedFile
                  ? selectedFile
                  : "No CSV Selected"}

              </p>

            </div>

            {/* Start Mapping */}

            <div className="rounded-[30px] border border-white/10 bg-[#0f172a] p-6">

              <h2 className="text-xl font-semibold">
                Start AI Mapping
              </h2>

              <p className="mt-2 text-slate-400">
                AI will analyze your uploaded CSV and generate a CRM
                compatible CSV.
              </p>

              <button
                disabled={!selectedFile || processing}
                onClick={startMapping}
                className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-emerald-500 px-6 py-3 font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Sparkles size={18} />

                {processing
                  ? "Processing..."
                  : "Start AI Mapping"}

              </button>

            </div>
                        {/* Status */}

            <div className="rounded-[30px] border border-white/10 bg-[#0f172a] p-6">

              <h2 className="text-xl font-semibold">
                Status
              </h2>

              <div className="mt-5 flex items-center gap-4">

                <div
                  className={`h-4 w-4 rounded-full ${
                    processing
                      ? "bg-yellow-400 animate-pulse"
                      : message.includes("successfully")
                      ? "bg-emerald-400"
                      : message.includes("Failed")
                      ? "bg-red-400"
                      : "bg-slate-500"
                  }`}
                />

                <p className="text-slate-300">
                  {message}
                </p>

              </div>

              {processing && (
                <div className="mt-6">

                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#1e293b]">

                    <div className="h-full w-1/3 animate-pulse rounded-full bg-emerald-400" />

                  </div>

                  <p className="mt-3 text-sm text-slate-500">
                    Please wait while AI processes your CSV...
                  </p>

                </div>
              )}

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
