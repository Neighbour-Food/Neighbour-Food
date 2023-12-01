import { createSlice } from "@reduxjs/toolkit";


interface accordionState {
  isActive: boolean,
}

const initialState: accordionState = {
  isActive: false,
};

const accordionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsActive: (state) => {
      state.isActive = !state.isActive;
    },
  },
});

export const { setIsActive } = accordionSlice.actions;

export default accordionSlice.reducer;