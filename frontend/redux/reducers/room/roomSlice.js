import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

const initialState = { room: {}, status: null, error: null };

export const getRoom = createAsyncThunk(
  "room/getRoom",
  async ({ req, id }, { rejectWithValue }) => {
    try {
      const { origin } = absoluteUrl(req);
      const { data } = await axios.get(`${origin}/api/v1/rooms/${id}`);
      return data;
    } catch (err) {
      let error = { ...err };
      if (!error.response) throw error;
      return rejectWithValue(error.response.data);
    }
  }
);

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clearRoomError: (state, action) => {
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: {
    [getRoom.pending]: (state, action) => {
      state.status = "loading";
    },
    [getRoom.fulfilled]: (state, { payload }) => {
      state.room = payload.room;
      state.status = "success";
    },
    [getRoom.rejected]: (state, { payload }) => {
      state.error = payload.message;
      state.status = "failed";
    },
  },
});

export const roomSelector = () => (state) => state?.room;
export default roomSlice.reducer;
