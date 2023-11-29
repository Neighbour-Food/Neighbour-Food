import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


interface UserState {
  isSignedIn: boolean,
  category: string,
  // formData: {
  // name: string,
  // paswword: string
  // }, // H E L P
  formData: any
}

const initialState: UserState = {
  isSignedIn: false,
  category: 'NON-PROFIT',
  formData: {
    // name: '',
    // paswword: ''
  }
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


