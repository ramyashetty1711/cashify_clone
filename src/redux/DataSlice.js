import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ActiveFilter: "",
  isRegisterModalOpen: false,
};

const DataSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    ActiveFilterUpdate: (state, action) => {
      state.ActiveFilter = action.payload;
    },
    openRegisterModal: (state) => {
      state.isRegisterModalOpen = true;
    },
    closeRegisterModal: (state) => {
      state.isRegisterModalOpen = false;
    },
  },
});

export const { ActiveFilterUpdate,openRegisterModal, closeRegisterModal } = DataSlice.actions;

export default DataSlice.reducer;
