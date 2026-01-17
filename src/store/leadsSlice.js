import { createSlice } from "@reduxjs/toolkit";
import { fetchAnalytics, fetchLeads } from "./leadsThunks.js";

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    items: [],
    total: 0,
    page: 1,
    totalPages: 0,
    analytics: null,
    loading: false,
    error: null
  },
  reducers: {
    setLeads(state, action) {
      state.items = action.payload.items || [];
      state.total = action.payload.total || 0;
      state.page = action.payload.page || 1;
      state.totalPages = action.payload.totalPages || 0;
    },
    setAnalytics(state, action) {
      state.analytics = action.payload || null;
    },
    setLoading(state, action) {
      state.loading = Boolean(action.payload);
    },
    setError(state, action) {
      state.error = action.payload || null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.data || [];
        state.total = action.payload?.total || 0;
        state.page = action.payload?.page || 1;
        state.totalPages = action.payload?.totalPages || 0;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Request failed";
      })
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Request failed";
      });
  }
});

export const { setLeads, setAnalytics, setLoading, setError } = leadsSlice.actions;

export default leadsSlice.reducer;
