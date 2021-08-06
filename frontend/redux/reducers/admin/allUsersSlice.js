import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

const initialState = { users: [], status: null, error: null };

export const getAdminUsers = createAsyncThunk(
  "allUsers/getAdminUsers",
  async ({ cookie, req }, { rejectWithValue }) => {
    try {
      const { origin } = absoluteUrl(req);
      const config = { headers: { cookie } };
      const { data } = await axios.get(`${origin}/api/v1/admin/users`, config);
      return data.users;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);
const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    clearAllUsers: (state) => {
      state.status = null;
      state.error = null;
      state.users.length = 0;
    },
  },
  extraReducers: {
    [getAdminUsers.pending]: (state) => {
      state.status = "loading";
    },
    [getAdminUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
      state.status = "success";
    },
    [getAdminUsers.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const selectAllUsers = () => (state) => state.allUsers;
export const { clearAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;
