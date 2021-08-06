import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { isUpdated: null, error: null, status: null };

export const updateProfile = createAsyncThunk(
  "userProfile/updateProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(`/api/v1/me/update`, userData, config);
      return data;
    } catch (err) {
      let error = { ...err };
      const { response } = error;
      if (!response) throw error;
      return rejectWithValue(response);
    }
  }
);

export const profileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    resetProfile: (state, action) => {
      state.isUpdated = null;
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: {
    [updateProfile.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateProfile.fulfilled]: (state, { payload }) => {
      state.isUpdated = payload.success;
      state.status = "success";
    },
    [updateProfile.rejected]: (state, { payload }) => {
      state.error = payload.data.message;
      state.status = "failed";
    },
  },
});

export const updateUser = () => (state) => state?.userProfile;
export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
