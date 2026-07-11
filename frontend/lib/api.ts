const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";


// =========================
// Upload CSV
// =========================

export const uploadCSV = async (file: File) => {
  const formData = new FormData();

  formData.append("csv", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return response.json();
};


// =========================
// Get Uploaded CSV Files
// =========================

export const getUploadedCSVFiles = async () => {
  const response = await fetch(
    `${API_BASE_URL}/uploads`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch uploaded CSV files");
  }

  return response.json();
};


// =========================
// Preview Uploaded CSV
// =========================

export const previewUploadedCSV = async (
  fileName: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/uploads/${encodeURIComponent(fileName)}`
  );

  if (!response.ok) {
    throw new Error("Failed to preview CSV");
  }

  return response.json();
};


// =========================
// Process CSV -> CRM
// =========================

export const parseCSVToCRM = async (
  fileName: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/parse`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to process CSV");
  }

  return response.json();
};

// Get CRM Files


export const getCRMFiles = async () => {
  const response = await fetch(
    `${API_BASE_URL}/crm`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch CRM files");
  }

  return response.json();
};


// =========================
// Preview CRM File
// =========================

export const previewCRMFile = async (
  fileName: string
) => {
  const response = await fetch(
    `${API_BASE_URL}/crm/${encodeURIComponent(fileName)}`
  );

  if (!response.ok) {
    throw new Error("Failed to preview CRM file");
  }

  return response.json();
};
