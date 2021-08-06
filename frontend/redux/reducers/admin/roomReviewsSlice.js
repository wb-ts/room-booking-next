import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

const initialState = { reviews: [], status: null, error: null };

export const fetchRoomReviews = createAsyncThunk(
  "roomReviews/fetchRoomReviews",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/reviews/?id=${id}`);
      return data.reviews;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);
const roomReviewsSlice = createSlice({
  name: "roomReviews",
  initialState,
  reducers: {
    clearRoomReviews: (state) => {
      state.status = null;
      state.error = null;
      state.reviews.length = 0;
    },
  },
  extraReducers: {
    [fetchRoomReviews.pending]: (state) => {
      state.status = "loading";
    },
    [fetchRoomReviews.fulfilled]: (state, { payload }) => {
      state.reviews = payload;
      state.status = "success";
    },
    [fetchRoomReviews.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const selectRoomReviews = () => (state) => state.roomReviews;
export const { clearRoomReviews } = roomReviewsSlice.actions;
export default roomReviewsSlice.reducer;
