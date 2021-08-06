import axios from "axios";
import absoluteUrl from "next-absolute-url";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = { bookings: [], status: null, error: null };

export const getMyBooking = createAsyncThunk(
  "myBooking/getMyBooking",
  async ({ cookie, req }, { rejectWithValue }) => {
    try {
      const { origin } = absoluteUrl(req);
      const config = { headers: { cookie } };
      const { bookings } = await (
        await axios.get(`${origin}/api/v1/booking/my_bookings`, config)
      ).data;
      return bookings;
    } catch (err) {
      let error = { ...err };
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);

const myBookingSlice = createSlice({
  name: "myBooking",
  initialState,
  reducers: {
    clearMyBooking: (state) => {
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: {
    [getMyBooking.pending]: (state) => {
      state.status = "loading";
    },
    [getMyBooking.fulfilled]: (state, { payload }) => {
      state.bookings = payload;
      state.status = "success";
    },
    [getMyBooking.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const myBookingSelector = () => (state) => state.myBooking;
export const { clearMyBooking } = myBookingSlice.actions;
export default myBookingSlice.reducer;
