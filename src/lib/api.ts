// API Configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  SEND_EMAIL: "/api/send-email",
  GENERATE_DOCS: "/api/generate-docs",
  DOWNLOAD_DOCS: "/api/download-docs",
  AUTH: "/auth",
  HEALTH: "/health",
} as const;

// API Helper function
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(
      `API call failed: ${response.status} ${response.statusText}`
    );
  }

  return response;
};
