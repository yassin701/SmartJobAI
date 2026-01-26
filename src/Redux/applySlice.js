import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendCondidature } from "../services/axios";

export const sendApplication = createAsyncThunk(
  "apply/sendApplication",
  async (formData, { rejectWithValue }) => {
    try {
      return await sendCondidature(formData);
    } catch (err) {
      return rejectWithValue(err.response?.data || "Network error");
    }
  }
);

const applySlice = createSlice({
  name: "apply",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetApplyState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendApplication.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendApplication.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetApplyState } = applySlice.actions;
export default applySlice.reducer;
