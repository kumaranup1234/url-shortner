import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../shared/utils/axiosInstance';

export const fetchUrls = createAsyncThunk(
  'urls/fetchUrls',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/urls/manage/user-urls');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch URLs');
    }
  }
);

export const createUrl = createAsyncThunk(
  'urls/createUrl',
  async (urlData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/urls/manage/shorten', urlData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create URL');
    }
  }
);

export const deleteUrl = createAsyncThunk(
  'urls/deleteUrl',
  async (urlId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/api/urls/manage/delete/${urlId}`);
      return urlId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to delete URL');
    }
  }
);

export const shortenPublicUrl = createAsyncThunk(
  'urls/shortenPublicUrl',
  async ({ url, route }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(route, { originalUrl: url });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.response?.data?.message || 'Failed to shorten URL');
    }
  }
);

const urlSlice = createSlice({
  name: 'urls',
  initialState: {
    urls: [],
    loading: false,
    error: null,
    totalClicks: 0,
    shortenedUrl: null, // to store the result for public shortening
  },
  reducers: {
    clearShortenedUrl: (state) => {
      state.shortenedUrl = null;
    },
    clearUrlError: (state) => {
      state.error = null;
    },
    updateUrlClicks: (state, action) => {
      const { urlId, clicks } = action.payload;
      const url = state.urls.find(u => u._id === urlId);
      if (url) {
        url.clicks = clicks;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload.userUrls || [];
        state.totalClicks = 0; // getUserUrls usage does not return totalClicks
      })
      .addCase(fetchUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUrl.fulfilled, (state, action) => {
        state.urls.unshift(action.payload);
      })
      .addCase(createUrl.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.urls = state.urls.filter(url => url._id !== action.payload);
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(shortenPublicUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.shortenedUrl = null;
      })
      .addCase(shortenPublicUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.shortenedUrl = action.payload;
      })
      .addCase(shortenPublicUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUrlError, updateUrlClicks, clearShortenedUrl } = urlSlice.actions;
export default urlSlice.reducer;