import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ActiveFilter: "",
};

const DataSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    ActiveFilterUpdate: (state, action) => {
      state.ActiveFilter = action.payload;
    },
  },
});

export const { ActiveFilterUpdate } = DataSlice.actions;

export default DataSlice.reducer;
