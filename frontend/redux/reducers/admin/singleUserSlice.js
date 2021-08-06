import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

const initialState = { user: null, status: null, error: null };

export const fetchSingleUser = createAsyncThunk(
  "singleUser/fetchSingleUser",
  async ({ cookie, req, id }, { rejectWithValue }) => {
    try {
      const { origin } = absoluteUrl(req);
      const config = { headers: { cookie } };
      const { data } = await axios.get(
        `${origin}/api/v1/admin/users/${id}`,
        config
      );
      return data.user;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);
const singleUserSlice = createSlice({
  name: "singleUser",
  initialState,
  reducers: {
    clearSingleUser: (state) => {
      state.status = null;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: {
    [fetchSingleUser.pending]: (state) => {
      state.status = "loading";
    },
    [fetchSingleUser.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.status = "success";
    },
    [fetchSingleUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const selectSingleUser = () => (state) => state.singleUser;
export const { clearSingleUser } = singleUserSlice.actions;
export default singleUserSlice.reducer;
