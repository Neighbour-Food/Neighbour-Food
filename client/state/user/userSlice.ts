import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";


interface UserState {
  isSignedIn: boolean,
  category: string,
  orgName: string,
  // formData: {
  // name: string,
  // paswword: string
  // }, // H E L P
  formData: any
}

const initialState: UserState = {
  isSignedIn: false,
  category: 'NON-PROFIT',
  orgName: "Very Good Org",
  formData: {
    name: '',
    paswword: ''
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
    setOrgName: (state, action: any) => {
      state.orgName = action.payload;
    }
  },
});

export const { changeIsSignedIn, setCategory, setFormData, setOrgName } = userSlice.actions;

export default userSlice.reducer;


