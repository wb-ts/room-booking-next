import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: false,
  error: null,
  status: null,
};

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "/api/v1/user/register",
        userData,
        config
      );
      return data.success;
    } catch (err) {
      let error = { ...err };
      if (!error.response) throw error;
      return rejectWithValue(error.response);
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearRegisterUser: (state, action) => {
      state.status = null;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: {
    [registerUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.success = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.status = "failed";
    },
  },
});

export const selectRegisterUser = () => (state) => state?.registerUser;
export const { clearRegisterUser } = registerSlice.actions;
export default registerSlice.reducer;
