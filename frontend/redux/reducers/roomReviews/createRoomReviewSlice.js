import { reduxError } from "@helpers/helpersIndex";
import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const initialState = { isCreated: null, status: null, error: null };

export const newReview = createAsyncThunk(
  "createRoomReview/newReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/rooms/room_reviews`,
        reviewData,
        config
      );
      return data.message;
    } catch (error) {
      const { message } = reduxError(error);
      rejectWithValue(message);
    }
  }
);

export const createRoomReviewSlice = createSlice({
  name: "createRoomReview",
  initialState,
  reducers: {
    clearCreateReview: (state) => {
      state.status = null;
      state.error = null;
      state.review = null;
    },
  },
  extraReducers: {
    [newReview.pending]: (state) => {
      state.status = "loading";
    },
    [newReview.fulfilled]: (state, { payload }) => {
      state.isCreated = payload;
      state.status = "success";
    },
    [newReview.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const createReviewSelector = () => (state) => state.createRoomReview;
export const { clearCreateReview } = createRoomReviewSlice.actions;
export default createRoomReviewSlice.reducer;
