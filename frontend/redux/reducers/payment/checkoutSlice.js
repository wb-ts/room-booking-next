import { reduxError } from "@helpers/helpersIndex";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { status: null, error: null, sessionId: null };

export const getCheckout = createAsyncThunk(
  "checkout/getCheckout",
  async (
    { id, checkInDate, checkOutDate, daysOfStay, amount },
    { rejectWithValue }
  ) => {
    try {
      const link = `/api/v1/payment/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`;
      const { session } = await (
        await axios(link, { params: { amount } })
      ).data;

      return session.id;
    } catch (error) {
      const { message } = reduxError(error).response.data;
      rejectWithValue(message);
    }
  }
);

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,

  reducers: {
    clearCheckOut: (state) => {
      state.status = null;
      state.error = null;
      state.sessionId = null;
    },
  },

  extraReducers: {
    [getCheckout.pending]: (state) => {
      state.status = "loading";
    },
    [getCheckout.fulfilled]: (state, { payload }) => {
      state.sessionId = payload;
      state.status = "success";
    },
    [getCheckout.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const checkoutSelector = () => (state) => state.checkout;
export const { clearCheckOut } = checkoutSlice.actions;
export default checkoutSlice.reducer;
