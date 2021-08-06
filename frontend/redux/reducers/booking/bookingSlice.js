import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { bookingInfo: {}, status: null, error: null };

export const newBooking = createAsyncThunk(
  "booking/newBooking",
  async (bookingInfo, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`/api/v1/booking`, bookingInfo, config);

      return data;
    } catch (err) {
      let error = { ...err };
      const { data } = error.response;
      if (!data) throw error;
      return rejectWithValue(data);
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    clearBooking: (state) => {
      state.status = null;
      state.error = null;
      state.bookingInfo = {};
    },
  },

  extraReducers: {
    [newBooking.pending]: (state) => {
      state.status = "loading";
    },
    [newBooking.fulfilled]: (state, { payload }) => {
      state.bookingInfo = payload.booking;
      state.status = "success";
    },
    [newBooking.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.status = "failed";
    },
  },
});

export const getBooking = () => (state) => state.booking;
export const { clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
