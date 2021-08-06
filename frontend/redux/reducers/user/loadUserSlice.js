import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  status: null,
};

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/me`);
      return data;
    } catch (err) {
      let error = { ...err };
      if (!error.response) throw error;
      return rejectWithValue(error.response);
    }
  }
);

export const loadUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearLoadUser: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: {
    [loadUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.isAuthenticated = true;
      state.user = payload.user;
    },

    [loadUser.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.status = "failed";
    },
  },
});

export const getUser = () => (state) => state?.user;
export const { clearLoadUser } = loadUserSlice.actions;
export default loadUserSlice.reducer;
