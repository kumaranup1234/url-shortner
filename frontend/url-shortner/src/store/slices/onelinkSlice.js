
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../shared/utils/axiosInstance';
import { toast } from 'sonner';

// Async Thunks
export const fetchOneLink = createAsyncThunk(
    'onelink/fetchOneLink',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/api/onelink/my-page');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch OneLink');
        }
    }
);

export const createOneLink = createAsyncThunk(
    'onelink/createOneLink',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/onelink/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success("OneLink page created successfully!");
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create OneLink");
            return rejectWithValue(error.response?.data?.message || 'Failed to create OneLink');
        }
    }
);

export const updateOneLink = createAsyncThunk(
    'onelink/updateOneLink',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/api/onelink/update', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success("OneLink page updated successfully!");
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update OneLink");
            return rejectWithValue(error.response?.data?.message || 'Failed to update OneLink');
        }
    }
);

const initialState = {
    oneLinkData: null,
    loading: false,
    error: null,
    success: false, // detailed success state for effects
};

const onelinkSlice = createSlice({
    name: 'onelink',
    initialState,
    reducers: {
        clearOneLinkError: (state) => {
            state.error = null;
        },
        resetOneLinkSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch
            .addCase(fetchOneLink.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOneLink.fulfilled, (state, action) => {
                state.loading = false;
                state.oneLinkData = action.payload.data;
            })
            .addCase(fetchOneLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create
            .addCase(createOneLink.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createOneLink.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.oneLinkData = action.payload.data;
            })
            .addCase(createOneLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            // Update
            .addCase(updateOneLink.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateOneLink.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.oneLinkData = action.payload.data;
            })
            .addCase(updateOneLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { clearOneLinkError, resetOneLinkSuccess } = onelinkSlice.actions;
export default onelinkSlice.reducer;
