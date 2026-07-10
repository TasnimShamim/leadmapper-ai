const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const uploadCSV = async (file: File) => {
  const formData = new FormData();
  formData.append('csv', file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

export const parseCSV = async (file: File) => {
  const formData = new FormData();
  formData.append('csv', file);

  try {
    const response = await fetch(`${API_BASE_URL}/parse`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Parse failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Parse error:', error);
    throw error;
  }
};
