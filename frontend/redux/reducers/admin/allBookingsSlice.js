import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

const initialState = { bookings: [], status: null, error: null };

export const getAllBookings = createAsyncThunk(
  "allBookings/getAllBookings",
  async ({ cookie, req }, { rejectWithValue }) => {
    try {
      const { origin } = absoluteUrl(req);
      const config = { headers: { cookie } };
      const { data } = await axios.get(
        `${origin}/api/v1/admin/bookings`,
        config
      );
      return data.bookings;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);
const allBookingsSlice = createSlice({
  name: "allBookings",
  initialState,
  reducers: {
    clearAllBookings: (state) => {
      state.status = null;
      state.error = null;
      state.bookings.length = 0;
    },
  },
  extraReducers: {
    [getAllBookings.pending]: (state) => {
      state.status = "loading";
    },
    [getAllBookings.fulfilled]: (state, { payload }) => {
      state.bookings = payload;
      state.status = "success";
    },
    [getAllBookings.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const selectAllBookings = () => (state) => state.allBookings;
export const { clearAllBookings } = allBookingsSlice.actions;
export default allBookingsSlice.reducer;
