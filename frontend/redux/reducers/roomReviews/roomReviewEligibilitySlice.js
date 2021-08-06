import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { isEligible: false, status: null, error: null };

export const checkRoomReviewEligibility = createAsyncThunk(
  "roomReviewEligibility/checkRoomReviewEligibility",
  async ({ roomId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/v1/rooms/room_reviews/check_review_eligibility?roomId=${roomId}`
      );
      return data.isEligible;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);

const roomReviewEligibilitySlice = createSlice({
  name: "roomReviewEligibility",
  initialState,
  reducers: {
    clearRoomReviewEligibility: (state) => {
      state.status = null;
      state.error = null;
      state.isEligible = false;
    },
  },
  extraReducers: {
    [checkRoomReviewEligibility.pending]: (state) => {
      state.status = "loading";
    },
    [checkRoomReviewEligibility.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.isEligible = payload;
    },
    [checkRoomReviewEligibility.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    },
  },
});

export const selectRoomReviewEligibility = () => (state) =>
  state.roomReviewEligibility;
export const { clearRoomReviewEligibility } =
  roomReviewEligibilitySlice.actions;
export default roomReviewEligibilitySlice.reducer;
