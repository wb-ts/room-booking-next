import { reduxError } from "@helpers/helpersIndex";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

const initialState = { bookingInfo: {}, status: null, error: null };

export const fetchBookingInfo = createAsyncThunk(
  "bookingInfo/fetchBookingInfo",
  async ({ cookie, req, id }, { rejectWithValue }) => {
    try {
      const { origin } = absoluteUrl(req);
      const config = { headers: { cookie } };
      const { bookingInfo } = await (
        await axios.get(`${origin}/api/v1/booking/${id}`, config)
      ).data;
      return bookingInfo;
    } catch (error) {
      const { message } = reduxError(error).response.data;
      rejectWithValue(message);
    }
  }
);

export const bookingInfoSlice = createSlice({
  name: "bookingInfo",
  initialState,
  reducers: {
    clearBookingInfo: (state) => {
      state.status = null;
      state.error = null;
      state.bookingInfo = {};
    },
  },
  extraReducers: {
    [fetchBookingInfo.pending]: (state) => {
      state.status = "loading";
    },
    [fetchBookingInfo.fulfilled]: (state, { payload }) => {
      state.bookingInfo = payload;
      state.status = "success";
    },
    [fetchBookingInfo.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const bookingInfoSelector = () => (state) => state.bookingInfo;
export const { clearBookingInfo } = bookingInfoSlice.actions;
export default bookingInfoSlice.reducer;
