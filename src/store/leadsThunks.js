import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const buildUrl = (path, params = {}) => {
  const url = new URL(path, API_BASE_URL);
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  const queryString = searchParams.toString();
  if (queryString) {
    url.search = queryString;
  }

  return url.toString();
};

const fetchJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    let message = "Request failed";
    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  return response.json();
};

export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async ({ search, stage, page, limit } = {}) => {
    const url = buildUrl("/api/leads", { search, stage, page, limit });
    return fetchJson(url);
  }
);

export const fetchLeadById = createAsyncThunk(
  "leads/fetchLeadById",
  async (id) => {
    const url = buildUrl(`/api/leads/${id}`);
    return fetchJson(url);
  }
);

export const fetchAnalytics = createAsyncThunk(
  "leads/fetchAnalytics",
  async () => {
    const url = buildUrl("/api/leads/analytics");
    return fetchJson(url);
  }
);
