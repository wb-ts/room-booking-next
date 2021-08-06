import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = { dates: [], status: null, error: null };

export const getBookedDates = createAsyncThunk(
  "bookedDates/getBookedDates",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `/api/v1/booking/booked_dates?roomId=${id}`
      );
      return data.bookedDates;
    } catch (err) {
      let error = { ...err };

      const { data } = error.response;
      if (!data) throw error;
      return rejectWithValue(data.message);
    }
  }
);

export const bookedDatesSlice = createSlice({
  name: "bookedDates",
  initialState,
  reducers: {
    clearBookedDates: (state) => {
      state.status = null;
      state.error = null;
      state.dates.length = 0;
    },
  },

  extraReducers: {
    [getBookedDates.pending]: (state) => {
      state.status = "loading";
    },
    [getBookedDates.fulfilled]: (state, { payload }) => {
      state.dates = payload;
      state.status = "success";
    },
    [getBookedDates.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const bookedDatesSelector = () => (state) => state.bookedDates;
export const { clearBookedDates } = bookedDatesSlice.actions;
export default bookedDatesSlice.reducer;
