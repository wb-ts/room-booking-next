import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

const initialState = {
  roomsCount: 0,
  resPerPage: 0,
  filteredRoomsCounts: 0,
  rooms: [],
  status: null,
  error: null,
};

export const getAllRooms = createAsyncThunk(
  "allRooms/getAllRooms",
  async ({ req, page, location }, { rejectWithValue }) => {
    try {
      const { origin } = absoluteUrl(req);
      let url = `${origin}/api/v1/rooms?page=${page}`;

      if (location)
        url = `${origin}/api/v1/rooms?page=${page}&location=${location}`;

      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      let error = { ...err };
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

export const allRoomsSlice = createSlice({
  name: "allRooms",
  initialState,
  reducers: {
    clearAllRoomsError: (state, action) => {
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: {
    [getAllRooms.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllRooms.fulfilled]: (state, { payload }) => {
      state.roomsCount = payload.roomsCount;
      state.resPerPage = payload.resPerPage;
      state.filteredRoomsCounts = payload.filteredRoomsCounts;
      state.rooms = payload.rooms;
      state.status = "success";
    },
    [getAllRooms.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.status = "failed";
    },
  },
});

export const selectAllRooms = () => (state) => state?.allRooms;
export const { clearAllRoomsError } = allRoomsSlice.actions;
export default allRoomsSlice.reducer;
