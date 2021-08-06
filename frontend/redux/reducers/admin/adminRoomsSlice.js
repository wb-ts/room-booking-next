import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

const initialState = { rooms: [], status: null, error: null };

export const getAdminRooms = createAsyncThunk(
  "adminRoomsSlice/getAdminRooms",
  async ({ cookie, req }, { rejectWithValue }) => {
    try {
      const { origin } = absoluteUrl(req);
      const config = { headers: { cookie } };
      const { data } = await axios.get(`${origin}/api/v1/admin/rooms`, config);
      return data.rooms;
    } catch (error) {
      const { message } = error.response.data;
      if (!message) throw error;
      return rejectWithValue(message);
    }
  }
);
const adminRoomsSlice = createSlice({
  name: "adminRooms",
  initialState,
  reducers: {
    clearAdminRooms: (state) => {
      state.status = null;
      state.error = null;
      state.rooms.length = 0;
    },
  },
  extraReducers: {
    [getAdminRooms.pending]: (state) => {
      state.status = "loading";
    },
    [getAdminRooms.fulfilled]: (state, { payload }) => {
      state.rooms = payload;
      state.status = "success";
    },
    [getAdminRooms.rejected]: (state, { payload }) => {
      state.error = payload;
      state.status = "failed";
    },
  },
});

export const selectAdminRooms = () => (state) => state.adminRooms;
export const { clearAdminRooms } = adminRoomsSlice.actions;
export default adminRoomsSlice.reducer;
