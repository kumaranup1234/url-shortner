import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../shared/utils/axiosInstance';

export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchData',
  async (endpoint, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(endpoint);
      return { endpoint, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch analytics');
    }
  }
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    data: {},
    loading: {},
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      const { endpoint, loading } = action.payload;
      state.loading[endpoint] = loading;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state, action) => {
        const endpoint = action.meta.arg;
        state.loading[endpoint] = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        const { endpoint, data } = action.payload;
        state.loading[endpoint] = false;
        state.data[endpoint] = data;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        const endpoint = action.meta.arg;
        state.loading[endpoint] = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setLoading } = analyticsSlice.actions;
export default analyticsSlice.reducer;