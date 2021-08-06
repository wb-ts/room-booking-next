import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { message: null, status: null, error: null };

export const forgotPassword = createAsyncThunk(
  "password/forgotPassword",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `/api/v1/password/forgot`,
        userData,
        config
      );
      return data;
    } catch (err) {
      let error = { ...err };
      const { response } = error;
      if (!response) throw error;
      return rejectWithValue(response);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "password/resetPassword",
  async ({ token, passwords }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        passwords,
        config
      );
      return data;
    } catch (err) {
      let error = { ...err };
      const { response } = error;
      if (!response) throw error;
      return rejectWithValue(response);
    }
  }
);

export const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {
    clearPassword: (state, action) => {
      state.status = null;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: {
    [forgotPassword.pending]: (state, action) => {
      state.status = "loading";
    },
    [forgotPassword.fulfilled]: (state, { payload }) => {
      state.message = payload.message;
      state.status = "success";
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      state.error = payload.data.message;
      state.status = "failed";
    },

    [resetPassword.pending]: (state, action) => {
      state.status = "loading";
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.message = payload.message;
      state.status = "success";
    },
    [resetPassword.rejected]: (state, { payload }) => {
      console.log(payload);
      state.error = payload.data.message;
      state.status = "failed";
    },
  },
});

export const getPassword = () => (state) => state?.password;
export const { clearPassword } = passwordSlice.actions;
export default passwordSlice.reducer;
