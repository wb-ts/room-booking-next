import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = { success: false, status: null, error: null };

export const deleteReview = createAsyncThunk(
  "adminReview/deleteReview",
  async ({ id, roomId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/v1/admin/reviews/?id=${id}&roomId=${roomId}`
      );
      return data.success;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);

const adminReviewSlice = createSlice({
  name: "adminReview",
  initialState,
  reducers: {
    clearAdminReview: (state) => {
      state.status = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    // Delete Review
    [deleteReview.pending]: (state) => {
      state.status = "loading";
    },
    [deleteReview.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.success = payload;
    },
    [deleteReview.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const selectAdminReview = () => (state) => state.adminReview;
export const { clearAdminReview } = adminReviewSlice.actions;
export default adminReviewSlice.reducer;
