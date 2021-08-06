import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = { success: false, status: null, error: null };

export const deleteBooking = createAsyncThunk(
  "adminBooking/deleteBooking",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/bookings/${id}`);
      return data.success;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);

const adminBookingSlice = createSlice({
  name: "adminBooking",
  initialState,
  reducers: {
    clearAdminBooking: (state) => {
      state.status = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    // Delete Booking
    [deleteBooking.pending]: (state) => {
      state.status = "loading";
    },
    [deleteBooking.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.success = payload;
    },
    [deleteBooking.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const selectAdminBooking = () => (state) => state.adminBooking;
export const { clearAdminBooking } = adminBookingSlice.actions;
export default adminBookingSlice.reducer;
