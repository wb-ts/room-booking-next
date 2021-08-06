import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = { success: false, status: null, error: null };

export const updateUserProfile = createAsyncThunk(
  "adminUser/updateUserProfile",
  async ({ userData, id }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/admin/users/${id}`,
        userData,
        config
      );

      return data.success;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "adminUser/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/users/${id}`);
      return data.success;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUser",
  initialState,
  reducers: {
    clearAdminUser: (state) => {
      state.status = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    // Update Room
    [updateUserProfile.pending]: (state) => {
      state.status = "loading";
    },
    [updateUserProfile.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.success = payload;
    },
    [updateUserProfile.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },

    // Delete User
    [deleteUser.pending]: (state) => {
      state.status = "loading";
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.success = payload;
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const selectAdminUser = () => (state) => state.adminUser;
export const { clearAdminUser } = adminUserSlice.actions;
export default adminUserSlice.reducer;
