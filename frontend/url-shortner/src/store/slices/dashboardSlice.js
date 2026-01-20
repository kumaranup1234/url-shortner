import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../shared/utils/axiosInstance';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/users/getAll');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch dashboard data');
    }
  }
);

export const fetchAnalyticsData = createAsyncThunk(
  'dashboard/fetchAnalytics',
  async (endpoint, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return { endpoint, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch analytics');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    totalUrls: 0,
    totalClicks: 0,
    topUrl: null,
    analytics: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAnalyticsData: (state, action) => {
      const { endpoint, data } = action.payload;
      state.analytics[endpoint] = data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.totalUrls = action.payload.totalUrls;
        state.totalClicks = action.payload.totalClicksSum;
        state.topUrl = action.payload.topUrl;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        const { endpoint, data } = action.payload;
        state.analytics[endpoint] = data;
      });
  },
});

export const { clearError, setAnalyticsData } = dashboardSlice.actions;
export default dashboardSlice.reducer;