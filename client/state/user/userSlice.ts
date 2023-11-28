import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


interface UserState {
  isSignedIn: boolean,
  category: string,
  formData: any, // H E L P
}

const initialState: UserState = {
  isSignedIn: false,
  category: 'NON-PROFIT',
  formData: {}
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeIsSignedIn: (state) => {
      state.isSignedIn = !state.isSignedIn;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setFormData: (state, action: any) => {
      state.formData = action.payload;
    },
  },
});

export const { changeIsSignedIn, setCategory, setFormData } = userSlice.actions;

export default userSlice.reducer;


