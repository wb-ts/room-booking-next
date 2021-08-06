import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { available: false, status: null, error: null };

export const getBookingSlot = createAsyncThunk(
  "bookingSlot/getBookingSlot",
  async ({ roomId, checkInDate, checkOutDate }, { rejectWithValue }) => {
    try {
      let link = `/api/v1/booking/check?roomId=${roomId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;
      const { data } = await axios.get(link);
      return data.isAvailable;
    } catch (err) {
      let error = { ...err };
      const { data } = error.response;
      if (!data) throw error;
      return rejectWithValue(data.message);
    }
  }
);
export const bookingSlotSlice = createSlice({
  name: "bookingSlot",
  initialState,
  reducers: {
    clearBookingSlot: (state) => {
      state.status = null;
      state.error = null;
      state.available = false;
    },
  },
  extraReducers: {
    [getBookingSlot.pending]: (state) => {
      state.status = "loading";
    },
    [getBookingSlot.fulfilled]: (state, { payload }) => {
      state.available = payload;
      state.status = "success";
    },
    [getBookingSlot.pending]: (state, { payload }) => {
      state.error = payload;
      state.status = "rejected";
    },
  },
});

export const checkBookingSlot = () => (state) => state.bookingSlot;
export const { clearBookingSlot } = bookingSlotSlice.actions;
export default bookingSlotSlice.reducer;
