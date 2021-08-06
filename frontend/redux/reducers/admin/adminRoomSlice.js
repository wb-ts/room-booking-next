import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = { success: false, status: null, error: null };

export const createNewRoom = createAsyncThunk(
  "adminRoom/createNewRoom",
  async (roomData, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(`/api/v1/rooms`, roomData, config);
      return data.success;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);

export const updateRoom = createAsyncThunk(
  "adminRoom/updateRoom",
  async ({ roomData, id }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(`/api/v1/rooms/${id}`, roomData, config);

      return data.success;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);

export const deleteRoom = createAsyncThunk(
  "adminRoom/deleteRoom",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/rooms/${id}`);
      return data.success;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);

const adminRoomSlice = createSlice({
  name: "adminRoom",
  initialState,
  reducers: {
    clearAdminRoom: (state) => {
      state.status = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: {
    // Create Room
    [createNewRoom.pending]: (state) => {
      state.status = "loading";
    },
    [createNewRoom.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.success = payload;
    },
    [createNewRoom.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },

    // Update Room
    [updateRoom.pending]: (state) => {
      state.status = "loading";
    },
    [updateRoom.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.success = payload;
    },
    [updateRoom.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },

    // Delete Room
    [deleteRoom.pending]: (state) => {
      state.status = "loading";
    },
    [deleteRoom.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.success = payload;
    },
    [deleteRoom.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const selectAdminRoom = () => (state) => state.adminRoom;
export const { clearAdminRoom } = adminRoomSlice.actions;
export default adminRoomSlice.reducer;
